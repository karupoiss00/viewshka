import {useSearchParams} from '@leards/hooks/useSearchParams'
import {useAction} from '@reatom/npm-react'
import {useCallback, useEffect} from 'react'
import {selectionActions} from '../../viewmodel/selectionAtom'

const SELECTED_DECK_KEY = 'selectedDeck'
const SELECTED_FOLDER_KEY = 'selectedFolder'
const SELECTED_SECTION_KEY = 'section'

function useLoadSelectionParams() {
	useSectionParam()
	useFolderParam()
	useDeckParam()
}

function useSectionParam() {
	const handleSelectSection = useAction(selectionActions.selectSection)
	const {getSelectedSectionParam} = useSelectedSectionParam()
	const selectedSectionParam = getSelectedSectionParam()

	const loadSectionParam = () => {
		if (selectedSectionParam) {
			handleSelectSection(selectedSectionParam)
		}
		else {
			handleSelectSection('user-content')
		}
	}

	useEffect(loadSectionParam, [handleSelectSection, selectedSectionParam])
}

function useFolderParam() {
	const handleSelectFolderAction = useAction(selectionActions.selectFolder)
	const {getSelectedFolderParam} = useSelectedFolderParam()
	const {getSelectedDeckParam} = useSelectedDeckParam()
	const selectedDeckIdParam = getSelectedDeckParam()
	const selectedFolderIdParam = getSelectedFolderParam()

	const loadFolderParam = () => {
		if (selectedFolderIdParam && !selectedDeckIdParam) {
			handleSelectFolderAction({
				folderId: selectedFolderIdParam,
			})
		}
	}

	useEffect(loadFolderParam, [handleSelectFolderAction, selectedDeckIdParam, selectedFolderIdParam])
}

function useDeckParam() {
	const handleSelectDeckAction = useAction(selectionActions.selectDeck)
	const {getSelectedFolderParam} = useSelectedFolderParam()
	const {getSelectedDeckParam} = useSelectedDeckParam()
	const selectedFolderIdParam = getSelectedFolderParam()
	const selectedDeckIdParam = getSelectedDeckParam()

	const loadDeckParam = () => {
		if (selectedFolderIdParam && selectedDeckIdParam) {
			handleSelectDeckAction({
				parentFolderId: selectedFolderIdParam,
				deckId:
				selectedDeckIdParam,
			})
		}
	}
	useEffect(loadDeckParam, [handleSelectDeckAction, selectedDeckIdParam, selectedFolderIdParam])
}

function useSelectedSectionParam() {
	const [getParam, setParams] = useSearchParams()

	const setSelectedSectionParam = useCallback((sectionType: string) => {
		setParams({
			[SELECTED_SECTION_KEY]: sectionType,
		}, true)
	}, [setParams])

	const getSelectedSectionParam = useCallback(() => getParam(SELECTED_SECTION_KEY), [getParam])

	return {
		getSelectedSectionParam,
		setSelectedSectionParam,
	}
}

function useSelectedFolderParam() {
	const [getParam, setParams] = useSearchParams()

	const setSelectedFolderParam = useCallback((id: string) => {
		setParams({
			[SELECTED_SECTION_KEY]: 'user-content',
			[SELECTED_FOLDER_KEY]: id,
		}, true)
	}, [setParams])

	const getSelectedFolderParam = useCallback(() => getParam(SELECTED_FOLDER_KEY), [getParam])

	return {
		getSelectedFolderParam,
		setSelectedFolderParam,
	}
}

function useSelectedDeckParam() {
	const [getParam, setParams] = useSearchParams()

	const setSelectedDeckParam = useCallback((folderId: string, deckId: string) => {
		setParams({
			[SELECTED_DECK_KEY]: deckId,
			[SELECTED_FOLDER_KEY]: folderId,
		})
	}, [setParams])

	const getSelectedDeckParam = useCallback(() => getParam(SELECTED_DECK_KEY), [getParam])

	return {
		getSelectedDeckParam,
		setSelectedDeckParam,
	}
}


export {
	useLoadSelectionParams,
	useSelectedFolderParam,
	useSelectedDeckParam,
	useSelectedSectionParam,
}