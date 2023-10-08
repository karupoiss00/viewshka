import {useSearchParams} from '@leards/hooks/useSearchParams'
import {useAction, useAtom} from '@reatom/npm-react'
import {useCallback, useEffect} from 'react'
import {selectedDeckIdAtom, selectedFolderIdAtom, selectionActions, selectionAtom} from '../../viewmodel/selectionAtom'

const SELECTED_DECK_KEY = 'selectedDeck'
const SELECTED_FOLDER_KEY = 'selectedFolder'
const SELECTED_SECTION_KEY = 'section'

function useSelectionParams() {
	useSectionParam()
	useFolderParam()
	useDeckParam()
}

function useSectionParam() {
	const [selection] = useAtom(selectionAtom)
	const handleSelectSection = useAction(selectionActions.selectSection)
	const {getSelectedSectionParam, setSelectedSectionParam} = useSelectedSectionParam()
	const selectedSectionParam = getSelectedSectionParam()

	const loadSectionParam = () => {
		if (selectedSectionParam) {
			handleSelectSection(selectedSectionParam)
		}
		else {
			handleSelectSection('user-content')
		}
	}

	const updateSectionParam = () => {
		if (selection.type && selection.type !== selectedSectionParam) {
			setSelectedSectionParam(selection.type)
		}
	}

	useEffect(loadSectionParam, [handleSelectSection, selectedSectionParam])
	useEffect(updateSectionParam, [selectedSectionParam, selection.type, setSelectedSectionParam])
}

function useFolderParam() {
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)
	const [selectedDeckId] = useAtom(selectedDeckIdAtom)
	const handleSelectFolderAction = useAction(selectionActions.selectFolder)
	const {getSelectedFolderParam, setSelectedFolderParam} = useSelectedFolderParam()
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

	const updateFolderParam = () => {
		if (!selectedFolderId) {
			return
		}

		if (selectedFolderId !== selectedFolderIdParam || selectedDeckId !== selectedDeckIdParam) {
			setSelectedFolderParam(selectedFolderId)
		}
	}

	useEffect(loadFolderParam, [handleSelectFolderAction, selectedDeckIdParam, selectedFolderIdParam])
	useEffect(updateFolderParam, [selectedDeckId, selectedDeckIdParam, selectedFolderId, selectedFolderIdParam, setSelectedFolderParam])
}

function useDeckParam() {
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)
	const [selectedDeckId] = useAtom(selectedDeckIdAtom)
	const handleSelectDeckAction = useAction(selectionActions.selectDeck)
	const {getSelectedFolderParam} = useSelectedFolderParam()
	const {getSelectedDeckParam, setSelectedDeckParam} = useSelectedDeckParam()
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

	const updateDeckParam = () => {
		if (selectedFolderId && selectedDeckId && selectedDeckId !== selectedDeckIdParam) {
			setSelectedDeckParam(selectedFolderId, selectedDeckId)
		}
	}

	useEffect(loadDeckParam, [handleSelectDeckAction, selectedDeckIdParam, selectedFolderIdParam])
	useEffect(updateDeckParam, [selectedDeckId, selectedDeckIdParam, selectedFolderId, setSelectedDeckParam])
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
	useSelectionParams,
}