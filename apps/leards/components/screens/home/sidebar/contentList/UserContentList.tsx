import {DecksAPI} from '@leards/api/DecksAPI'
import {FoldersAPI} from '@leards/api/FoldersAPI'
import {userAtom} from '@leards/components/common/viewmodel/userAtom'
import {useSetSelectedStorageParam} from '@leards/components/screens/home/hooks/useLoadSelectionParams'
import {ContentList} from '@leards/components/screens/home/sidebar/contentList/common/ContentList'
import {currentFolderAtom} from '@leards/components/screens/home/viewmodel/currentFolderAtom'
import {
	selectedDeckIdAtom,
	selectedFolderIdAtom,
	selectionActions,
} from '@leards/components/screens/home/viewmodel/selectionAtom'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAction, useAtom} from '@reatom/npm-react'
import {ActionList, Button, Popover, SystemIconDeck, SystemIconFolder, SystemIconPlus} from '@viewshka/uikit'
import {useRouter} from 'next/router'
import React, {useEffect, useRef, useState} from 'react'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import styles from './UserContentList.module.css'

const SELECTED_FOLDER_QUERY_KEY = 'sidebar-folder'

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
						</ActionList>
					</Popover.Content>
				</Popover>
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
		[SELECTED_FOLDER_QUERY_KEY, {folderId}],
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

			return data.folder
		},
		{
			retry: false,
		},
	)

	useEffect(() => {
		if (isSuccess) {
			setCurrentFolder(data)
		}

		if (isError) {
			handleResetSelection()
			router.replace('/home')
		}
	}, [data, handleResetSelection, isError, isSuccess, router, setCurrentFolder])
}

function useDeckCreateMutation() {
	const queryClient = useQueryClient()
	const getMessage = useMessages()
	const [user] = useAtom(userAtom)
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)

	return useMutation(async () => {
		await DecksAPI.get().createNewDeck(selectedFolderId, {
			parentFolderId: selectedFolderId,
			name: getMessage('Deck.DefaultName'),
			userId: user.id,
		})
		await queryClient.invalidateQueries({
			queryKey: [SELECTED_FOLDER_QUERY_KEY],
		})
	})
}

function useFolderCreateMutation() {
	const queryClient = useQueryClient()
	const getMessage = useMessages()
	const [user] = useAtom(userAtom)
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)

	return useMutation(async () => {
		await FoldersAPI.get().createNewFolder({
			name: getMessage('Folder.DefaultName'),
			parentFolderId: selectedFolderId,
			userId: user.id,
		})
		await queryClient.invalidateQueries({
			queryKey: [SELECTED_FOLDER_QUERY_KEY],
		})
	})
}

export {
	UserContentList,
	SELECTED_FOLDER_QUERY_KEY,
}