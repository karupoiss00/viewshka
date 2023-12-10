import {DecksAPI} from '@leards/api/DecksAPI'
import {FoldersAPI} from '@leards/api/FoldersAPI'
import {currentFolderActions} from '@leards/components/screens/home/viewmodel/currentFolderAtom'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAction, useAtom} from '@reatom/npm-react'
import {useEventListener} from '@viewshka/core'
import {Button, Checkbox, Popup, PopupContext, TextField} from '@viewshka/uikit'
import React, {useCallback, useContext, useRef, useState} from 'react'
import {useMutation} from 'react-query'
import {selectedFolderIdAtom} from '../../viewmodel/selectionAtom'
import styles from './ContentSettingsPopup.module.css'

const SHARE_URL_STUB = `http://localhost:3000/home?section=user-content&selectedDeck=dad3f688-1474-4fd1-a0bb-7248122d6011&selectedFolder=f5b3ad07-b5f6-4325-a3c1-8eccc6bd27c0`

type ContentType = 'deck' | 'folder'

const CONTENT_NAME_MESSAGES = new Map<ContentType, string>([
	['deck', 'ContentSettingsPopup.Material.DeckName'],
	['folder', 'ContentSettingsPopup.Material.FolderName'],
])

type ContentSettingsPopupProps = {
	contentType: string
	contentId: string
	contentName: string
}
function ContentSettingsPopup({contentType, contentId, contentName}: ContentSettingsPopupProps) {
	const {close} = useContext(PopupContext)
	const getMessage = useMessages()
	const [name, setName] = useState(contentName)
	const [nameValid, setNameValid] = useState(true)
	const [isPublic, setIsPublic] = useState(false)
	const isPublishable = contentType === 'deck'
	const linkContainerRef = useRef<HTMLInputElement>()
	const windowRef = useRef(window)
	const {mutate: deleteMaterial} = useDeleteContentMutation(contentType, contentId)
	const {mutate: updateName} = useUpdateContentMutation(contentType, contentId)

	const onUpdate = useCallback(() => {
		if (!nameValid) {
			return
		}

		updateName(name)
		close()
	}, [close, name, nameValid, updateName])

	const copyShareLink = () => {
		const {current: linkContainer} = linkContainerRef
		const link = linkContainer.value
		window.navigator.clipboard.writeText(link)
		linkContainer.select()
		linkContainer.setSelectionRange(0, link.length)
	}

	useEventListener('keydown', e => {
		if (e.key === 'Enter') {
			onUpdate()
		}
	}, windowRef)


	if (contentType !== 'deck' && contentType !== 'folder') {
		console.error(`Unknown content type: ${contentType}`)
		return null
	}

	return (
		<div className={styles.container}>
			<div className={styles.contentName}>
				<span>{getMessage(CONTENT_NAME_MESSAGES.get(contentType))}</span>
				<TextField
					onChange={setName}
					size={'small'}
					initialValue={contentName}
					invalidateOnChange={true}
					onValidate={value => {
						const valid = value.length > 0
						setNameValid(valid)
						return valid
					}}
				/>
			</div>
			<div className={styles.sharingArea}>
				<span>{getMessage('ContentSettingsPopup.Material.Share')}</span>
				<input
					className={styles.linkContainer}
					ref={linkContainerRef}
					value={SHARE_URL_STUB}
					readOnly={true}
				/>
				<div className={styles.shareButtonContainer}>
					<Button
						className={styles.shareButton}
						type={'secondary'}
						size={'small'}
						onClick={copyShareLink}
					>
						{getMessage('ContentSettingsPopup.Material.Button.Copy')}
					</Button>
				</div>
			</div>
			{isPublishable
				&& <div className={styles.publicContent}>
					<span>{getMessage('ContentSettingsPopup.Material.Checkbox.Public')}</span>
					<Checkbox initialState={isPublic} onChange={() => setIsPublic(value => !value)}/>
				</div>
			}
			<div className={styles.bottomPanel}>
				<Popup.Close onClick={deleteMaterial}>
					<Button
						className={styles.closeButton}
						type={'secondary'}
						size={'small'}
					>
						{getMessage('ContentSettingsPopup.Material.Button.Delete')}
					</Button>
				</Popup.Close>
				<Button
					type={'primary'}
					size={'small'}
					state={nameValid ? 'default' : 'disabled'}
					onClick={onUpdate}
				>
					{getMessage('ContentSettingsPopup.Material.Button.Save')}
				</Button>
			</div>
		</div>
	)
}

function useDeleteContentMutation(type: string, contentId: string) {
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)
	const handleDeleteContent = useAction(currentFolderActions.remove)

	return useMutation(`remove:${type}:${contentId}`, async () => {
		if (type === 'deck') {
			await DecksAPI.get().deleteDeckById(selectedFolderId, contentId)
		}
		if (type === 'folder') {
			await FoldersAPI.get().deleteFolderById(contentId)
		}

		handleDeleteContent({contentId})
	})
}

function useUpdateContentMutation(type: string, contentId: string) {
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)
	const handleUpdateMaterial = useAction(currentFolderActions.update)

	return useMutation(
		`update:${type}:${contentId}`,
		async (name: string) => {
			if (type === 'deck') {
				const response = await DecksAPI.get().updateDeckById(selectedFolderId, contentId, {
					name,
				})
				const deck = response.data.deck
				handleUpdateMaterial({
					material: {
						type,
						name: deck.name,
						id: deck.deckId,
					},
				})
			}
			if (type === 'folder') {
				const response = await FoldersAPI.get().updateFolderById(contentId, {
					name,
				})
				const folder = response.data.folder
				handleUpdateMaterial({
					material: {
						type,
						name: folder.name,
						id: folder.folderId,
					},
				})
			}
		},
	)
}

export {
	ContentSettingsPopup,
}