import {FoldersAPI} from '@leards/api/FoldersAPI'
import {
	useSelectedDeckParam,
	useSelectedFolderParam,
} from '@leards/components/screens/home/common/hooks/useLoadSelectionParams'
import {ContentList} from '@leards/components/screens/home/sidebar/contentList/common/ContentList'
import {currentFolderAtom} from '@leards/components/screens/home/viewmodel/currentFolderAtom'
import {
	selectedDeckIdAtom,
	selectedFolderIdAtom,
	selectionActions,
} from '@leards/components/screens/home/viewmodel/selectionAtom'
import {useAction, useAtom} from '@reatom/npm-react'
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import {useQuery} from 'react-query'

const SELECTED_FOLDER_QUERY_KEY = 'sidebar-folder'

function UserContentList() {
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)
	const [selectedDeckId] = useAtom(selectedDeckIdAtom)
	const [, setCurrentFolder] = useAtom(currentFolderAtom)
	const {setSelectedDeckParam} = useSelectedDeckParam()
	const {setSelectedFolderParam} = useSelectedFolderParam()
	const handleSetSelectedFolder = useAction(selectionActions.setSelectedFolder)
	const handleSelectDeckAction = useAction(selectionActions.selectDeck)
	const handleSelectFolderAction = useAction(selectionActions.selectFolder)
	const folder = useFolderQuery(selectedFolderId)

	useEffect(() => {
		if (folder) {
			setCurrentFolder({...folder})
			// не можем просто заселектить папку, так как
			// сбросится id открытой колоды полученный из урла,
			// поэтому сделан отдельный экшен на устновку открытой папки
			handleSetSelectedFolder({
				folderId: folder.folderId,
			})
		}
	}, [folder, handleSetSelectedFolder, setCurrentFolder])

	const setSelection = (id: string) => {
		const selectedContent = folder.content.find(el => el.id === id)

		if (!selectedContent) {
			throw new Error(`Incorrect id selected: ${id}`)
		}

		if (selectedContent.type === 'folder') {
			setSelectedFolderParam(selectedContent.id)
			handleSelectFolderAction({
				folderId: selectedContent.id,
			})
		}

		if (selectedContent.type === 'deck') {
			setSelectedDeckParam(selectedFolderId, selectedContent.id)
			handleSelectDeckAction({
				parentFolderId: selectedFolderId,
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

function useFolderQuery(folderId: string) {
	const router = useRouter()
	const [folder, setFolder] = useState(null)
	const queryKey = [SELECTED_FOLDER_QUERY_KEY, {
		folderId,
	}]
	const {isError, isSuccess, data} = useQuery(queryKey, async () => {
		const api = FoldersAPI.get()
		const {data} = await api.getFolderById(folderId)

		return data.folder
	}, {
		retry: false,
	})

	useEffect(() => {
		if (isSuccess) {
			setFolder(data)
		}

		if (isError) {
			router.replace('/home')
		}
	}, [data, isError, isSuccess, router])

	return folder
}

export {
	UserContentList,
	SELECTED_FOLDER_QUERY_KEY,
}