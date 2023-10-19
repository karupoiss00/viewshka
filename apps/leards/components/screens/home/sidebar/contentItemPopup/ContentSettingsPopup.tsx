import {DecksAPI} from '@leards/api/DecksAPI'
import {FoldersAPI} from '@leards/api/FoldersAPI'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAtom} from '@reatom/npm-react'
import {Button, Popup, PopupContext, TextField} from '@viewshka/uikit'
import React, {useCallback, useContext, useState} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {selectedFolderIdAtom} from '../../viewmodel/selectionAtom'
import {SELECTED_FOLDER_QUERY_KEY} from '../Sidebar'
import styles from './ContentSettingsPopup.module.css'

type ContentType = 'deck' | 'folder'

const CONTENT_NAME_MESSAGES = new Map<ContentType, string>([
	['deck', 'ContentSettingsPopup.Material.DeckName'],
	['folder', 'ContentSettingsPopup.Material.FolderName'],
])

type ContentSettingsPopupProps = {
	contentType: ContentType
	contentId: string
	contentName: string
}
function ContentSettingsPopup({contentType, contentId, contentName}: ContentSettingsPopupProps) {
	const {close} = useContext(PopupContext)
	const getMessage = useMessages()
	const [name, setName] = useState(contentName)
	const [nameValid, setNameValid] = useState(true)
	const isPublishable = contentType === 'deck'

	const {mutate: deleteMaterial} = useDeleteContentMutation(contentType, contentId)
	const {mutate: updateSettings} = useUpdateContentMutation(contentType, contentId)

	const onUpdate = useCallback((newName: string) => {
		if (!nameValid) {
			return
		}

		if (newName === contentName) {
			close()
			return
		}

		updateSettings(newName)
		close()
	}, [close, contentName, nameValid, updateSettings])

	return (
		<div className={styles.container}>
			<div className={styles.contentName}>
				<span>{getMessage(CONTENT_NAME_MESSAGES.get(contentType))}</span>
				<TextField
					onChange={setName}
					size={'small'}
					initialValue={contentName}
					invalidateOnChange={true}
					onValidate={v => {
						const valid = v.length > 0
						setNameValid(valid)
						return valid
					}}
				/>
			</div>
			<div className={styles.sharingArea}>
				<span>{getMessage('ContentSettingsPopup.Material.Share')}</span>
				<div className={styles.linkContainer}></div>
				<div className={styles.shareButtonContainer}>
					<Button
						className={styles.shareButton}
						type={'secondary'}
						size={'small'}
					>
						{getMessage('ContentSettingsPopup.Material.Button.Copy')}
					</Button>
				</div>
			</div>
			{isPublishable
				&& <div className={styles.publicContent}>
					<span>{getMessage('ContentSettingsPopup.Material.Checkbox.Public')}</span>
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
					onClick={() => onUpdate(name)}
				>
					{getMessage('ContentSettingsPopup.Material.Button.Save')}
				</Button>
			</div>
		</div>
	)
}

function useDeleteContentMutation(type: ContentType, contentId: string) {
	const queryClient = useQueryClient()
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)

	return useMutation(`remove:${type}:${contentId}`, async () => {
		if (type === 'deck') {
			await DecksAPI.get().deleteDeckById(selectedFolderId, contentId)
		}
		if (type === 'folder') {
			await FoldersAPI.get().deleteFolderById(contentId)
		}

		await queryClient.invalidateQueries({
			queryKey: [SELECTED_FOLDER_QUERY_KEY],
		})
	})
}

function useUpdateContentMutation(type: ContentType, contentId: string) {
	const queryClient = useQueryClient()
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)

	return useMutation(`update:${type}:${contentId}`, async (name: string, accessType = 'public') => {
		if (type === 'deck') {
			await DecksAPI.get().updateDeckById(selectedFolderId, contentId, {
				name,
				accessType,
			})
		}
		if (type === 'folder') {
			await FoldersAPI.get().updateFolderById(contentId, {
				name,
				accessType,
			})
		}

		await queryClient.invalidateQueries({
			queryKey: ['sidebar-folder'],
		})
	})
}


export {
	ContentSettingsPopup,
}