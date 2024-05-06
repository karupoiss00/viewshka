import {DecksAPI} from '@leards/api/DecksAPI'
import {FoldersAPI} from '@leards/api/FoldersAPI'
import {useEffect, useState} from 'react'
import {useQuery} from 'react-query'

function useStorageNameQuery(storageType: string, storageId: string) {
	const [name, setName] = useState('')

	const {data, isSuccess, isLoading} = useQuery([
		'practice-title', storageType, storageId,
	], async () => {
		const storage = storageType === 'folder'
			? (await FoldersAPI.get().getFolderById(storageId)).data.folder
			: (await DecksAPI.get().getDeckById(storageId)).data.deck

		return storage.name
	}, {
		retry: false,
	})

	useEffect(() => {
		if (isSuccess) {
			setName(data)
		}
	}, [data, isSuccess])

	return {name, isLoading}
}

export {
	useStorageNameQuery,
}