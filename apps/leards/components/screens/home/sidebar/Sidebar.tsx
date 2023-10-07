import {FoldersAPI} from '@leards/api/FoldersAPI'
import {useSearchParams} from '@leards/hooks/useSearchParams'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import AuthProvider from '@leards/providers/authProvider'
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
import React, {useCallback, useEffect} from 'react'
import {useQuery} from 'react-query'
import {selectionAtom, selectionActions} from '../viewmodel/selectionAtom'
import styles from './Sidebar.module.css'

const SELECTED_SECTION_KEY = 'section'
const SELECTED_FOLDER_KEY = 'selectedFolder'
const SELECTED_DECK_KEY = 'selectedDeck'

function Sidebar({className}: PropsWithClassname) {
	const [selection] = useAtom(selectionAtom)

	return (
		<div className={classnames(styles.sidebar, className)}>
			<SectionsList />
			{selection.type === 'user-content' && <ContentList />}
		</div>
	)
}

function SectionsList() {
	const getMessage = useMessages()
	const [getParam, setParams] = useSearchParams()
	const handleChangeSelection = useAction(selectionActions.selectSection)
	const selectedSection = getParam(SELECTED_SECTION_KEY)
	const [selection] = useAtom(selectionAtom)
	const setSelection = useCallback((sectionType: string) => {
		setParams({
			[SELECTED_SECTION_KEY]: sectionType,
		}, true)
	}, [setParams])

	useEffect(() => {
		if (selectedSection) {
			handleChangeSelection(selectedSection)
		}
	}, [handleChangeSelection, selectedSection])

	useEffect(() => {
		if (!selectedSection) {
			setSelection(selection.type)
		}
	}, [selectedSection, selection.type, setSelection])

	return (
		<div className={styles.sectionsList}>
			<p className={styles.materialsTitle}>
				{getMessage('Sidebar.Title.Materials')}
			</p>
			<SelectList onItemSelect={setSelection} selectedItem={selectedSection}>
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


function ContentList() {
	const getMessage = useMessages()
	const [getParam, setParams] = useSearchParams()
	const {data: folder} = useSelectedFolderContent(getParam(SELECTED_FOLDER_KEY))
	const handleSelectDeckAction = useAction(selectionActions.selectDeck)
	const handleSelectFolderAction = useAction(selectionActions.selectFolder)

	const setSelection = (id: string) => {
		const selectedContent = folder.content.find(el => el.id === id)

		if (!selectedContent) {
			throw new Error(`Incorrect id selected: ${id}`)
		}

		if (selectedContent.type === 'folder') {
			setParams({
				[SELECTED_FOLDER_KEY]: selectedContent.id,
			})
			handleSelectFolderAction({
				folderId: selectedContent.id,
			})
		}

		if (selectedContent.type === 'deck') {
			const folderId = getParam(SELECTED_FOLDER_KEY)
			setParams({
				[SELECTED_FOLDER_KEY]: folderId,
				[SELECTED_DECK_KEY]: selectedContent.id,
			})
			handleSelectDeckAction({
				parentFolderId: folderId,
				deckId: selectedContent.id,
			})
		}
	}

	return (
		<>
			<p className={styles.userContentTitle}>
				{getMessage('Sidebar.Title.UserContent')}
			</p>
			<div className={styles.listContainer}>
				<SelectList onItemSelect={setSelection} initialSelectedItem={getParam(SELECTED_DECK_KEY)}>
					{folder?.content?.map((item, i) => (
						<SelectList.Item id={item.id} key={item.id.repeat(i)}>
							{item.type === 'folder' && <SystemIconFolder />}
							{item.type === 'deck' && <SystemIconDeck />}
							{item.name}
						</SelectList.Item>
					))}
				</SelectList>
			</div>
		</>
	)
}

function useSelectedFolderContent(folderId: string | null) {
	const router = useRouter()

	const queryResult = useQuery(`folderId:${folderId}`, async () => {
		const userId = AuthProvider.getUserId()

		if (!folderId) {
			const response = await FoldersAPI.mock().getRoot(userId)
			return response.folder
		}

		const response = await FoldersAPI.get().foldersIdGet(folderId)
		return response.data.folder
	}, {
		retry: false,
	})

	useEffect(() => {
		if (queryResult.isError) {
			router.replace('/home')
		}
	}, [queryResult.isError, router])

	return queryResult
}

export default Sidebar