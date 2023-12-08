import {DecksAPI} from '@leards/api/DecksAPI'
import {FoldersAPI} from '@leards/api/FoldersAPI'
import {useSetSelectedStorageParam} from '@leards/components/screens/home/hooks/useLoadSelectionParams'
import {ContentList} from '@leards/components/screens/home/sidebar/contentList/common/ContentList'
import {currentFolderAtom} from '@leards/components/screens/home/viewmodel/currentFolderAtom'
import {
	selectedDeckIdAtom,
	selectedFolderIdAtom,
	selectionActions,
} from '@leards/components/screens/home/viewmodel/selectionAtom'
import {useAction, useAtom} from '@reatom/npm-react'
import {useRouter} from 'next/router'
import React, {useEffect} from 'react'
import {useQuery} from 'react-query'

const SELECTED_FOLDER_QUERY_KEY = 'sidebar-folder'

function UserContentList() {
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)
	const [selectedDeckId] = useAtom(selectedDeckIdAtom)
	const [folder] = useAtom(currentFolderAtom)
	const setStorageQueryParam = useSetSelectedStorageParam()
	const handleSelectDeckAction = useAction(selectionActions.selectDeck)
	const handleSelectFolderAction = useAction(selectionActions.selectFolder)

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

	if (!folder) {
		return null
	}

	return (
		<ContentList
			onItemSelect={setSelection}
			selectedItem={selectedDeckId}
			content={folder.content}
			editable={true}
		/>
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

			console.log('invalidated', data.folder)

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

export {
	UserContentList,
	SELECTED_FOLDER_QUERY_KEY,
}