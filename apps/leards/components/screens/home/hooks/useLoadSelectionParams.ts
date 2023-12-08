import {
	createStorageSelection,
	StorageType,
} from '@leards/components/screens/home/viewmodel/selection/Selection'
import {selectionAtom} from '@leards/components/screens/home/viewmodel/selectionAtom'
import {useSearchParams} from '@leards/hooks/useSearchParams'
import {useAtom} from '@reatom/npm-react'
import {useCallback, useEffect} from 'react'

const SELECTED_STORAGE_TYPE_KEY = 'storageType'
const SELECTED_STORAGE_ID_KEY = 'storageId'
const SELECTED_SECTION_KEY = 'section'

function useLoadSelectionParams() {
	const [, setSelection] = useAtom(selectionAtom)

	const sectionParam = useSelectedSectionParam()
	const storageTypeParam = useStorageTypeParam()
	const storageIdParam = useStorageIdParam()

	useEffect(() => {
		const selection = createStorageSelection({
			section: sectionParam,
			storageType: storageTypeParam,
			storageId: storageIdParam,
		})
		setSelection(selection)
	}, [sectionParam, setSelection, storageIdParam, storageTypeParam])
}

function useSelectedSectionParam() {
	const [getParam] = useSearchParams()

	return getParam(SELECTED_SECTION_KEY)
}

function useStorageTypeParam() {
	const [getParam] = useSearchParams()

	return getParam(SELECTED_STORAGE_TYPE_KEY)
}

function useStorageIdParam() {
	const [getParam] = useSearchParams()

	return getParam(SELECTED_STORAGE_ID_KEY)
}

function useSetSelectedSectionParam() {
	const [, setParam] = useSearchParams()

	return useCallback((section: Selection['type']) => {
		setParam({
			[SELECTED_SECTION_KEY]: section,
		}, true)
	}, [setParam])
}

function useSetSelectedStorageParam() {
	const [, setParam] = useSearchParams()
	const [{type}] = useAtom(selectionAtom)

	return useCallback((storageType: StorageType, storageId: string) => {
		setParam({
			[SELECTED_SECTION_KEY]: type,
			[SELECTED_STORAGE_TYPE_KEY]: storageType,
			[SELECTED_STORAGE_ID_KEY]: storageId,
		}, true)
	}, [setParam, type])
}

export {
	useLoadSelectionParams,

	useSetSelectedSectionParam,
	useSetSelectedStorageParam,
}