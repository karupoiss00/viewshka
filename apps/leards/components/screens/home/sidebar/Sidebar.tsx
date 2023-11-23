import {FoldersAPI} from '@leards/api/FoldersAPI'
import {LibraryAPI} from '@leards/api/LibraryAPI'
import {ContentList} from '@leards/components/screens/home/sidebar/contentList/ContentList'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import UserProvider from '@leards/providers/userProvider'
import {useAction, useAtom} from '@reatom/npm-react'
import {
	PropsWithClassname,
	SelectList,
	SystemIconFolder,
	SystemIconPublicDecks,
} from '@viewshka/uikit'
import classnames from 'classnames'
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import {useQuery} from 'react-query'
import {useSelectedDeckParam, useSelectedFolderParam, useSelectedSectionParam} from '../common/hooks/useLoadSelectionParams'
import {currentFolderAtom} from '../viewmodel/currentFolderAtom'
import {Selection} from '../viewmodel/selection/Selection'
import {
	selectionAtom,
	selectionActions,
	selectedFolderIdAtom,
	selectedDeckIdAtom,
	selectedSectionAtom,
} from '../viewmodel/selectionAtom'
import styles from './Sidebar.module.css'

const SELECTED_FOLDER_QUERY_KEY = 'sidebar-folder'

function Sidebar({className}: PropsWithClassname) {
	return (
		<div className={classnames(styles.sidebar, className)}>
			<SectionsList />
			<ContentNavigation />
		</div>
	)
}

function SectionsList() {
	const getMessage = useMessages()
	const {setSelectedSectionParam} = useSelectedSectionParam()
	const handleChangeSelection = useAction(selectionActions.selectSection)
	const [selection] = useAtom(selectionAtom)

	const selectSection = (id: string) => {
		setSelectedSectionParam(id)
		handleChangeSelection(id)
	}

	return (
		<div className={styles.sectionsList}>
			<p className={styles.materialsTitle}>
				{getMessage('Sidebar.Title.Materials')}
			</p>
			<SelectList onItemSelect={selectSection} selectedItem={selection.type}>
				<SelectList.Item id={'user-content'}>
					<SystemIconFolder />
					{getMessage('Sidebar.SectionList.UserContent')}
				</SelectList.Item>
				<SelectList.Item id={'library'}>
					<SystemIconPublicDecks />
					{getMessage('Sidebar.SectionList.Library')}
				</SelectList.Item>
			</SelectList>
		</div>
	)
}

const TITLE_MESSAGE_MAP: Map<Selection['type'], string> = new Map([
	['user-content', 'Sidebar.Title.UserContent'],
	['library', 'Sidebar.Title.Library'],
	['tasks', 'Sidebar.Title.Tasks'],
])

function ContentNavigation() {
	const getMessage = useMessages()
	const [selection] = useAtom(selectionAtom)

	return (
		<div className={styles.contentNavigation}>
			<p className={styles.contentTitle}>
				{getMessage(TITLE_MESSAGE_MAP.get(selection.type))}
			</p>
			<UserContentList/>
		</div>
	)
}

function UserContentList() {
	const [selectedSection] = useAtom(selectedSectionAtom)
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

	if (!selectedSection || !folder) {
		return null
	}

	return (
		<ContentList
			onItemSelect={setSelection}
			selectedItem={selectedDeckId}
			content={folder.content}
			editable={selectedSection === 'user-content'}
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
	SELECTED_FOLDER_QUERY_KEY,
}

export default Sidebar