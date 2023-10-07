import {useSearchParams} from '@leards/hooks/useSearchParams'

const SELECTED_DECK_KEY = 'selectedDeck'
const SELECTED_FOLDER_KEY = 'selectedFolder'

function useSelectedFolderParams() {
	const [getParam, setParams] = useSearchParams()

	const setSelectedFolderParam = (id: string) => {
		setParams({
			[SELECTED_FOLDER_KEY]: id,
		})
	}

	const getSelectedFolderParam = () => getParam(SELECTED_FOLDER_KEY)

	return {
		getSelectedFolderParam,
		setSelectedFolderParam,
	}
}

function useSelectedDeckParam() {
	const [getParam, setParams] = useSearchParams()

	const setSelectedDeckParam = (folderId: string, deckId: string) => {
		setParams({
			[SELECTED_DECK_KEY]: deckId,
			[SELECTED_FOLDER_KEY]: folderId,
		})
	}

	const getSelectedDeckParam = () => getParam(SELECTED_DECK_KEY)

	return {
		getSelectedDeckParam,
		setSelectedDeckParam,
	}
}


export {
	useSelectedFolderParams,
	useSelectedDeckParam,
}