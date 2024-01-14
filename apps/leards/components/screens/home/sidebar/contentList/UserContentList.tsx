import {DecksAPI} from '@leards/api/DecksAPI'
import {FoldersAPI} from '@leards/api/FoldersAPI'
import {userAtom} from '@leards/components/common/viewmodel/userAtom'
import {useSetSelectedStorageParam} from '@leards/components/screens/home/hooks/useLoadSelectionParams'
import {ContentList} from '@leards/components/screens/home/sidebar/contentList/common/ContentList'
import {
	QuizletImportPopup,
} from '@leards/components/screens/home/sidebar/contentList/quizletImportPopup/QuizletImportPopup'
import {currentFolderActions, currentFolderAtom} from '@leards/components/screens/home/viewmodel/currentFolderAtom'
import {
	selectedDeckIdAtom,
	selectedFolderIdAtom,
	selectionActions,
} from '@leards/components/screens/home/viewmodel/selectionAtom'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAction, useAtom} from '@reatom/npm-react'
import {
	ActionList,
	Button,
	Popover, Popup,
	SystemIconDeck,
	SystemIconFolder,
	SystemIconLetterQ,
	SystemIconPlus,
} from '@viewshka/uikit'
import {useRouter} from 'next/router'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useMutation, useQuery} from 'react-query'
import styles from './UserContentList.module.css'

function UserContentList() {
	const getMessage = useMessages()
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)
	const [selectedDeckId] = useAtom(selectedDeckIdAtom)
	const [folder] = useAtom(currentFolderAtom)
	const setStorageQueryParam = useSetSelectedStorageParam()
	const handleSelectDeckAction = useAction(selectionActions.selectDeck)
	const handleSelectFolderAction = useAction(selectionActions.selectFolder)
	const createButtonRef = useRef()
	const [popoverOpened, setPopoverOpened] = useState(false)
	const [importPopupOpened, setImportPopupOpened] = useState(false)

	const onImportPopupClose = useCallback(() => {
		setImportPopupOpened(false)
	}, [])

	const {mutate: createDeck} = useDeckCreateMutation()
	const {mutate: createFolder} = useFolderCreateMutation()

	useCurrentFolderQuery(selectedFolderId)

	const setSelection = (id: string) => {
		const selectedContent = folder.content.find(el => el.id === id)

		if (!selectedContent) {
			throw new Error(`Incorrect id selected: ${id}`)
		}

		if (selectedContent.type === 'folder') {
			setStorageQueryParam('folder', selectedContent.id)
			handleSelectFolderAction({
				folderId: selectedContent.id,
			})
		}

		if (selectedContent.type === 'deck') {
			setStorageQueryParam('deck', selectedContent.id)
			handleSelectDeckAction({
				deckId: selectedContent.id,
			})
		}
	}

	const onItemClick = (id: string) => {
		if (id === 'create-deck') {
			createDeck()
		}

		if (id === 'create-folder') {
			createFolder()
		}

		if (id === 'quizlet-import') {
			setImportPopupOpened(true)
		}

		setPopoverOpened(false)
	}

	if (!folder) {
		return null
	}

	return (
		<div className={styles.container}>
			<div className={styles.createButtonContainer}>
				<Button
					type="secondary"
					size="medium"
					flexible={true}
					ref={createButtonRef}
					onClick={() => setPopoverOpened(true)}
				>
					<SystemIconPlus/>
				</Button>
				<Popover
					relativePosition={{
						verticalAlign: 'center',
						horizontalAlign: 'end',
					}}
					triggerRef={createButtonRef}
					visible={!popoverOpened ? popoverOpened : undefined}
				>
					<Popover.Content className={styles.createPopover}>
						<ActionList onItemClick={onItemClick}>
							<ActionList.Item id="create-deck">
								<SystemIconDeck/>
								{getMessage('Button.Create.Deck')}
							</ActionList.Item>
							<ActionList.Item id="create-folder">
								<SystemIconFolder/>
								{getMessage('Button.Create.Folder')}
							</ActionList.Item>
							<ActionList.Item id="quizlet-import">
								<SystemIconLetterQ/>
								{getMessage('Button.Import.Quizlet.Deck')}
							</ActionList.Item>
						</ActionList>
					</Popover.Content>
				</Popover>
				<Popup opened={importPopupOpened} onClose={onImportPopupClose}>
					<Popup.Content>
						<QuizletImportPopup onImportComplete={onImportPopupClose}/>
					</Popup.Content>
				</Popup>
			</div>
			<ContentList
				onItemSelect={setSelection}
				selectedItem={selectedDeckId}
				content={folder.content}
				editable={true}
			/>
		</div>
	)
}

function useCurrentFolderQuery(folderId: string | null) {
	const [currentFolder, setCurrentFolder] = useAtom(currentFolderAtom)
	const [selectedDeckId] = useAtom(selectedDeckIdAtom)
	const handleResetSelection = useAction(selectionActions.reset)
	const router = useRouter()
	const {isError, isSuccess, data} = useQuery(
		['sidebar-folder-content', {folderId, currentFolder, size: currentFolder.content?.length}],
		async () => {
			if (!folderId) {
				const {data} = await DecksAPI.get().getDeckById(selectedDeckId)

				folderId = data.deck.parentFolderId
			}

			if (folderId === currentFolder.folderId) {
				return currentFolder
			}

			const api = FoldersAPI.get()

			const {data} = await api.getFolderById(folderId)


			setCurrentFolder({...data.folder})
		},
		{
			retry: false,
		},
	)

	useEffect(() => {
		if (isError) {
			handleResetSelection()
			router.replace('/home')
		}
	}, [data, handleResetSelection, isError, isSuccess, router, setCurrentFolder])
}

function useDeckCreateMutation() {
	const getMessage = useMessages()
	const [user] = useAtom(userAtom)
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)
	const handleAddMaterial = useAction(currentFolderActions.add)

	return useMutation(async () => {
		const response = await DecksAPI.get().createNewDeck({
			parentFolderId: selectedFolderId,
			name: getMessage('Deck.DefaultName'),
			userId: user.id,
		})
		const deck = response.data.deck

		handleAddMaterial({
			material: {
				type: 'deck',
				id: deck.deckId,
				name: deck.name,
			},
		})
	})
}

function useFolderCreateMutation() {
	const getMessage = useMessages()
	const [user] = useAtom(userAtom)
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)
	const handleAddMaterial = useAction(currentFolderActions.add)

	return useMutation(async () => {
		const response = await FoldersAPI.get().createNewFolder({
			name: getMessage('Folder.DefaultName'),
			parentFolderId: selectedFolderId,
			userId: user.id,
		})
		const folder = response.data.folder

		handleAddMaterial({
			material: {
				type: 'folder',
				id: folder.folderId,
				name: folder.name,
			},
		})
	})
}

export {
	UserContentList,
}