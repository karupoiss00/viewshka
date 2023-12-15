import {DecksAPI} from '@leards/api/DecksAPI'
import {FoldersAPI} from '@leards/api/FoldersAPI'
import {SharingAPI} from '@leards/api/SharingAPI'
import {currentFolderActions} from '@leards/components/screens/home/viewmodel/currentFolderAtom'
import {Folder} from '@leards/components/screens/home/viewmodel/folder/Folder'
import {useAction} from '@reatom/npm-react'
import React, {useCallback} from 'react'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {MaterialSettingsPopup} from '../common/MaterialSettingsPopup'

type AccessType = 'public' | 'shared' | 'private'

type FolderSettingsData = {
	name: string
	access: AccessType
}

const getLink = (id: string) => `https://leards.space/share/${id}`

type FolderSettingsPopupProps = {
	folderId: string
}
function FolderSettingsPopup({folderId}: FolderSettingsPopupProps) {
	const {data} = useFolderSettingsQuery(folderId)
	const {mutate: deleteFolder} = useDeleteFolderMutation(folderId)
	const {mutate: updateFolder} = useUpdateFolderMutation(folderId)

	if (!data) {
		return null
	}

	return (
		<MaterialSettingsPopup
			initialSettings={data}
			onSettingsUpdate={updateFolder}
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

type UpdateFolderArgs = {
	name: string
	access: string
}

function useUpdateFolderMutation(folderId: string) {
	const handleUpdateMaterial = useAction(currentFolderActions.update)
	const queryClient = useQueryClient()

	const updateName = useCallback(async (name: string) => {
		if (!name) {
			return
		}

		const api = FoldersAPI.get()
		const response = await api.updateFolderById(folderId, {
			name,
		})
		const folder = response.data.folder
		handleUpdateMaterial({
			material: {
				type: 'folder',
				name: folder.name,
				id: folder.folderId,
			},
		})
	}, [folderId, handleUpdateMaterial])

	const updateAccess = useCallback(async (access: string) => {
		const api = SharingAPI.get()
		await api.setStorageAccess('folder', folderId, {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			type: access,
		})
	}, [folderId])

	return useMutation(
		['updateFolder', folderId],
		async (settings: UpdateFolderArgs) => {
			await updateName(settings.name)
			await updateAccess(settings.access)
			queryClient.getQueryCache().clear()
		},
	)
}

function useFolderSettingsQuery(folderId: string) {
	return useQuery(['folderSettings', folderId], async () => {
		const api = FoldersAPI.get()

		const response = await api.getFolderById(folderId)

		const folder = response.data.folder

		return {
			name: folder.name,
			access: folder.accessType,
		}
	})
}

export {
	FolderSettingsPopup,
}