import {StorageType} from '@leards/components/screens/home/viewmodel/selection/Selection'
import {useRouter} from 'next/router'

function useStorageParams() {
	const router = useRouter()
	const {slug} = router.query
	const storageType = slug[0] as StorageType
	const storageId = slug[1]

	return {
		storageType,
		storageId,
	}
}

export {
	useStorageParams,
}