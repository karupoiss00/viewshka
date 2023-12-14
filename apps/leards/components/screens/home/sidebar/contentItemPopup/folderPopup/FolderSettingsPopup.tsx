import {FoldersAPI} from '@leards/api/FoldersAPI'
import {currentFolderActions} from '@leards/components/screens/home/viewmodel/currentFolderAtom'
import {useAction} from '@reatom/npm-react'
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
	const {mutate: deleteFolder} = useDeleteFolderMutation(folderId)
	const {mutate: updateName} = useUpdateFolderMutation(folderId)

	if (!data) {
		return null
	}

	return (
		<MaterialSettingsPopup
			initialSettings={data}
			onSettingsUpdate={settings => updateName(settings.name)}
			onMaterialRemove={deleteFolder}
			getSharingLink={() => getLink(folderId)}
			closeOnEnter={true}
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

function useUpdateFolderMutation(folderId: string) {
	const handleUpdateMaterial = useAction(currentFolderActions.update)

	return useMutation(
		['updateDeck', folderId],
		async (name: string) => {
			const response = await FoldersAPI.get().updateFolderById(folderId, {
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