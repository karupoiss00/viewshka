import {DecksAPI} from '@leards/api/DecksAPI'
import {FoldersAPI} from '@leards/api/FoldersAPI'
import {currentFolderActions} from '@leards/components/screens/home/viewmodel/currentFolderAtom'
import {selectedFolderIdAtom} from '@leards/components/screens/home/viewmodel/selectionAtom'
import {useAction, useAtom} from '@reatom/npm-react'
import React from 'react'
import {useMutation, useQuery} from 'react-query'
import {MaterialSettingsPopup} from '../common/MaterialSettingsPopup'

type AccessType = 'public' | 'shared' | 'private'

type DeckSettingsData = {
	name: string
	access: AccessType
}

const getLink = (id: string) => `https://leards.space/share/${id}`

type FolderSettingsPopupProps = {
	folderId: string
	folderName: string
}
function FolderSettingsPopup({folderId, folderName}: FolderSettingsPopupProps) {
	const {data} = useFolderSettingsQuery(folderId, folderName)
	const {mutate: deleteDeck} = useDeleteFolderMutation(folderId)
	const {mutate: updateName} = useUpdateFolderMutation(folderId)

	if (!data) {
		return null
	}

	return (
		<MaterialSettingsPopup
			initialSettings={data}
			onSettingsUpdate={settings => updateName(settings.name)}
			onMaterialRemove={deleteDeck}
			getSharingLink={() => getLink(folderId)}
		>

		</MaterialSettingsPopup>
	)
}

function useDeleteFolderMutation(folderId: string) {
	const handleDeleteContent = useAction(currentFolderActions.remove)

	return useMutation(['removeFolder', folderId], async () => {
		await FoldersAPI.get().deleteFolderById(folderId)
		handleDeleteContent({contentId: folderId})
	})
}

function useUpdateFolderMutation(deckId: string) {
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)
	const handleUpdateMaterial = useAction(currentFolderActions.update)

	return useMutation(
		['updateDeck', deckId],
		async (name: string) => {
			const response = await FoldersAPI.get().updateFolderById(selectedFolderId, {
				name,
			})
			const deck = response.data.folder
			handleUpdateMaterial({
				material: {
					type: 'folder',
					name: deck.name,
					id: deck.folderId,
				},
			})
		},
	)
}

function useFolderSettingsQuery(folderId: string, name: string) {
	return useQuery(['folderSettings', folderId, name], (): DeckSettingsData => ({
		name,
		access: 'private',
	}))
}

export {
	FolderSettingsPopup,
}