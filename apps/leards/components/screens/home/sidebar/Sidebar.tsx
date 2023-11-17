import {FoldersAPI} from '@leards/api/FoldersAPI'
import {Content, Folder} from '@leards/api/generated'
import {LibraryAPI} from '@leards/api/LibraryAPI'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import UserProvider from '@leards/providers/userProvider'
import {useAction, useAtom} from '@reatom/npm-react'
import {
	PropsWithClassname,
	Button,
	Popup,
	PopupLayer,
	SelectList,
	SystemIconDeck,
	SystemIconFolder,
	SystemIconMore,
	SystemIconPublicDecks,
	SystemIconTaskList,
} from '@viewshka/uikit'
import classnames from 'classnames'
import {useRouter} from 'next/router'
import React, {useEffect, useRef} from 'react'
import {useQuery} from 'react-query'
import {userAtom} from '../../../common/viewmodel/userAtom'
import {useSelectedDeckParam, useSelectedFolderParam, useSelectedSectionParam} from '../common/hooks/useLoadSelectionParams'
import {currentFolderAtom, setCurrentFolderAction} from '../viewmodel/currentFolderAtom'
import {Selection} from '../viewmodel/selection/Selection'
import {selectionAtom, selectionActions, selectedFolderIdAtom, selectedDeckIdAtom} from '../viewmodel/selectionAtom'
import {ContentSettingsPopup} from './contentItemPopup/ContentSettingsPopup'
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
				{
					folder && <ContentList
						onItemSelect={setSelection}
						selectedItem={selectedDeckId}
						folder={folder}
						contentEditable={selectionType === 'user-content'}
					/>
				}
			</div>
		</>
	)
}

interface ContentListProps {
	contentEditable: boolean
	onItemSelect: (id: string) => void
	selectedItem: string
	folder: Folder
}
function ContentList({onItemSelect, selectedItem, folder, contentEditable}: ContentListProps) {
	const [selectedDeckId] = useAtom(selectedDeckIdAtom)
	const content = folder.content?.map(item =>
		<ContentItem
			item={item}
			selected={item.id === selectedDeckId}
			editable={contentEditable}
			key={item.id}
		/>,
	)
	return (
		<div className={styles.listContainer}>
			{content?.length
				? <SelectList onItemSelect={onItemSelect} selectedItem={selectedItem}>
					{content}
				</SelectList>
				: <Placeholder/>}

		</div>
	)
}

type ContentItemProps = {
	item: Content
	editable: boolean
	selected: boolean
}
function ContentItem({item, editable, selected}: ContentItemProps) {
	const settingsButtonRef = useRef<HTMLButtonElement>()

	return (
		<SelectList.Item className={classnames(styles.contentItem, {
			[styles.contentItemSelected]: selected,
		})} id={item.id} key={item.id}>
			{item.type === 'folder' && <SystemIconFolder />}
			{item.type === 'deck' && <SystemIconDeck />}
			<span>{item.name}</span>
			{editable
				&& <Button
					className={styles.settingsButton}
					type={'ghost'}
					size={'small'}
					onClick={e => e.preventDefault()}
					spacing={'none'}
					ref={settingsButtonRef}
				>
					<SystemIconMore/>
				</Button>
			}
			{editable
				&& <Popup triggerRef={settingsButtonRef}>
					<Popup.Content>
						<ContentSettingsPopup
							contentType={item.type}
							contentId={item.id}
							contentName={item.name}
						/>
					</Popup.Content>
				</Popup>
			}
		</SelectList.Item>
	)
}

function Placeholder() {
	const getMessage = useMessages()

	return (
		<div className={styles.placeholderContainer}>
			<div className={styles.placeholder}></div>
			{getMessage('Sidebar.Empty.Placeholder')}
		</div>
	)
}

function useSelectedFolderQuery(folderId: string | null, selectionType: Selection['type']) {
	const router = useRouter()
	const [{rootFolderId}] = useAtom(userAtom)
	const handleSetSelectedFolderAction = useAction(selectionActions.setSelectedFolder)
	const handleSetCurrentFolderAction = useAction(setCurrentFolderAction)

	const {isError, isSuccess, data} = useQuery([SELECTED_FOLDER_QUERY_KEY, {
		folderId,
		selectionType,
	}], async () => {
		const userId = UserProvider.getUserId()

		if (!folderId) {
			const folder = await requestRootFolder(rootFolderId, userId, selectionType)
			return folder
		}

		const response = await FoldersAPI.get().getFolderById(folderId)
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

async function requestRootFolder(rootFolderId: string, userId: string, selectionType: Selection['type']) {
	if (selectionType === 'library') {
		return LibraryAPI.get().getSavedDecks(userId)
	}

	const {data} = await FoldersAPI.get().getFolderById(rootFolderId)

	return data.folder
}

export {
	SELECTED_FOLDER_QUERY_KEY,
}

export default Sidebar