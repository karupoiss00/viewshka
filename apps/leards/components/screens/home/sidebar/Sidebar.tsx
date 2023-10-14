import {FoldersAPI} from '@leards/api/FoldersAPI'
import {Folder} from '@leards/api/generated'
import {LibraryAPI} from '@leards/api/LibraryAPI'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import AuthProvider from '@leards/providers/authProvider'
import UserProvider from '@leards/providers/userProvider'
import {useAction, useAtom} from '@reatom/npm-react'
import {PropsWithClassname} from '@viewshka/core'
import {
	SelectList,
	SystemIconDeck,
	SystemIconFolder,
	SystemIconPublicDecks,
	SystemIconTaskList,
} from '@viewshka/uikit'
import classnames from 'classnames'
import {useRouter} from 'next/router'
import React, {useEffect} from 'react'
import {useQuery} from 'react-query'
import {
	useSelectedDeckParam,
	useSelectedFolderParam,
	useSelectedSectionParam,
} from '../common/hooks/useLoadSelectionParams'
import {currentFolderAtom, setCurrentFolderAction} from '../viewmodel/currentFolderAtom'
import {Selection} from '../viewmodel/selection/Selection'
import {selectionAtom, selectionActions, selectedFolderIdAtom, selectedDeckIdAtom} from '../viewmodel/selectionAtom'
import styles from './Sidebar.module.css'

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
				<SelectList.Item id={'tasks'}>
					<SystemIconTaskList />
					{getMessage('Sidebar.SectionList.Tasks')}
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
	const [{type: selectionType}] = useAtom(selectionAtom)
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)
	const [selectedDeckId] = useAtom(selectedDeckIdAtom)
	const [folder] = useAtom(currentFolderAtom)
	const {setSelectedDeckParam} = useSelectedDeckParam()
	const {setSelectedFolderParam} = useSelectedFolderParam()
	const handleSelectDeckAction = useAction(selectionActions.selectDeck)
	const handleSelectFolderAction = useAction(selectionActions.selectFolder)

	useSelectedFolderQuery(selectedFolderId, selectionType)

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

	return (
		<>
			<p className={styles.userContentTitle}>
				{selectionType && getMessage(TITLE_MESSAGE_MAP.get(selectionType))}
			</p>
			<div className={styles.listContainer}>
				{folder && <ContentList onItemSelect={setSelection} selectedItem={selectedDeckId} folder={folder}/>}
			</div>
		</>
	)
}

interface ContentListProps {
	onItemSelect: (id: string) => void
	selectedItem: string
	folder: Folder
}
function ContentList({onItemSelect, selectedItem, folder}: ContentListProps) {
	return (
		<div className={styles.listContainer}>
			<SelectList onItemSelect={onItemSelect} selectedItem={selectedItem}>
				{folder.content?.map(item => (
					<SelectList.Item id={item.id} key={item.id}>
						{item.type === 'folder' && <SystemIconFolder />}
						{item.type === 'deck' && <SystemIconDeck />}
						<span>{item.name}</span>
					</SelectList.Item>
				))}
			</SelectList>
		</div>
	)
}

function useSelectedFolderQuery(folderId: string | null, selectionType: Selection['type']) {
	const router = useRouter()
	const handleSetSelectedFolderAction = useAction(selectionActions.setSelectedFolder)
	const handleSetCurrentFolderAction = useAction(setCurrentFolderAction)

	const {isError, isSuccess, data} = useQuery(`${selectionType}:folderId:${folderId}`, async () => {
		const userId = UserProvider.getUserId()

		if (!folderId) {
			const response = await requestRootFolder(userId, selectionType)
			return response.folder
		}

		const response = await FoldersAPI.get().foldersIdGet(folderId)
		return response.data.folder
	}, {
		retry: false,
	})

	useEffect(() => {
		if (isError) {
			router.replace('/home')
		}

		if (isSuccess) {
			handleSetCurrentFolderAction({
				folder: data,
			})
			// не можем просто заселектить папку, так как
			// сбросится id открытой колоды полученный из урла,
			// поэтому сделан отдельный экшен на устновку открытой папки
			handleSetSelectedFolderAction({
				folderId: data.folderId,
			})
		}
	}, [data, handleSetCurrentFolderAction, handleSetSelectedFolderAction, isError, isSuccess, router])
}

function requestRootFolder(userId: string, selectionType: Selection['type']) {
	if (selectionType === 'library') {
		return LibraryAPI.get().getSavedDecks(userId)
	}

	return FoldersAPI.get().rootFolderGet(userId)
}

export default Sidebar