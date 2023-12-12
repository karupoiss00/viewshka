import {DecksAPI} from '@leards/api/DecksAPI'
import {
	MaterialNameEditor,
} from '@leards/components/screens/home/sidebar/contentItemPopup/common/materialNameEditor/MaterialNameEditor'
import {
	SharingSwitcher,
} from '@leards/components/screens/home/sidebar/contentItemPopup/common/sharingSwitcher/SharingSwitcher'
import {currentFolderActions} from '@leards/components/screens/home/viewmodel/currentFolderAtom'
import {selectedFolderIdAtom} from '@leards/components/screens/home/viewmodel/selectionAtom'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAction, useAtom} from '@reatom/npm-react'
import {useEventListener} from '@viewshka/core'
import {Button, Checkbox, Dropdown, Popup, PopupContext, TextField} from '@viewshka/uikit'
import classnames from 'classnames'
import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import {useMutation, useQuery} from 'react-query'
import {CopyLinkField} from '../common/copyLinkField/CopyLinkField'
import styles from './DeckSettingsPopup.module.css'

type AccessType = 'public' | 'shared' | 'private'

type DeckSettingsData = {
	name: string
	access: AccessType
}

const getLink = (id: string) => `https://leards.space/share/${id}`

type DeckSettingsPopupProps = {
	deckId: string
	deckName: string
}
function DeckSettingsPopup({deckId, deckName}: DeckSettingsPopupProps) {
	const getMessage = useMessages()
	const {close} = useContext(PopupContext)
	const windowRef = useRef(window)
	const [valid, setValid] = useState(false)
	const [deckSettings, setDeckSettings] = useState<DeckSettingsData>(null)
	const {data, status} = useDeckSettingsQuery(deckId, deckName)
	const sharingDisabled = deckSettings?.access === 'private'

	const {mutate: deleteDeck} = useDeleteDeckMutation(deckId)
	const {mutate: updateName} = useUpdateDeckMutation(deckId)

	const onSharingEnabledChange = useCallback((sharingEnabled: boolean) => {
		setDeckSettings({
			name: deckSettings.name,
			access: sharingEnabled ? 'shared' : 'private',
		})
	}, [deckSettings])

	const onNameChange = useCallback((name: string, valid: boolean) => {
		setValid(valid)
		setDeckSettings(current => ({
			...current,
			name,
		}))
	}, [])

	const onSave = useCallback(() => {
		if (!valid) {
			return
		}

		updateName(data.name)
		close()
	}, [close, data, updateName, valid])


	useEffect(() => {
		if (status === 'success') {
			setDeckSettings(data)
		}
	}, [data, status])

	useEventListener('keydown', e => {
		if (e.key === 'Enter') {
			onSave()
		}
	}, windowRef)

	if (!deckSettings) {
		return null
	}

	return (
		<div className={styles.container}>
			<div className={styles.contentName}>
				<MaterialNameEditor
					initialValue={deckName}
					onChange={onNameChange}
				/>
			</div>
			<SharingSwitcher
				className={styles.sharingSwitcher}
				initialValue={!sharingDisabled}
				onChange={onSharingEnabledChange}
			/>
			<CopyLinkField link={getLink(deckId)} disabled={sharingDisabled}/>
			<div className={styles.sharingContainer}>
				<span className={classnames(styles.sharingHeading, {
					[styles.sharingHeadingDisabled]: sharingDisabled,
				})}>
					{getMessage('ContentSettingsPopup.Material.Share.Level')}
				</span>
				<Dropdown
					disabled={sharingDisabled}
					className={styles.sharingDropdown}
					selectedItem={sharingDisabled ? 'shared' : deckSettings.access}
					onItemSelect={(access: AccessType) => {
						setDeckSettings(settings => ({
							...settings,
							access,
						}))
					}}
				>
					<Dropdown.Item id="shared" value={getMessage('ContentSettingsPopup.Material.Share.ByLink')}/>
					<Dropdown.Item id="public" value={getMessage('ContentSettingsPopup.Material.Share.Public')}/>
				</Dropdown>
			</div>
			<PopupFooter onSave={onSave} onDelete={deleteDeck} saveAvailable={valid}/>
		</div>
	)
}

type PopupFooterProps = {
	onDelete: () => void
	onSave: () => void
	saveAvailable: boolean
}
function PopupFooter({onDelete, onSave, saveAvailable}: PopupFooterProps) {
	const getMessage = useMessages()

	return (
		<div className={styles.bottomPanel}>
			<Popup.Close onClick={onDelete}>
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
				state={saveAvailable ? 'default' : 'disabled'}
				onClick={onSave}
			>
				{getMessage('ContentSettingsPopup.Material.Button.Save')}
			</Button>
		</div>
	)
}

function useDeleteDeckMutation(deckId: string) {
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)
	const handleDeleteContent = useAction(currentFolderActions.remove)

	return useMutation(['removeDeck', deckId], async () => {
		await DecksAPI.get().deleteDeckById(selectedFolderId, deckId)
		handleDeleteContent({contentId: deckId})
	})
}

function useUpdateDeckMutation(deckId: string) {
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)
	const handleUpdateMaterial = useAction(currentFolderActions.update)

	return useMutation(
		['updateDeck', deckId],
		async (name: string) => {
			const response = await DecksAPI.get().updateDeckById(selectedFolderId, deckId, {
				name,
			})
			const deck = response.data.deck
			handleUpdateMaterial({
				material: {
					type: 'deck',
					name: deck.name,
					id: deck.deckId,
				},
			})
		},
	)
}

function useDeckSettingsQuery(deckId: string, name: string) {
	return useQuery(['deckSettings', deckId], (): DeckSettingsData => ({
		name,
		access: 'private',
	}))
}

export {
	DeckSettingsPopup,
}