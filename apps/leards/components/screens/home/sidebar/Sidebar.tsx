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
import React, {useEffect} from 'react'
import {useQuery} from 'react-query'
import {setCurrentFolderAction} from '../viewmodel/currentFolderAtom'
import {selectionAtom, selectionActions, selectedFolderIdAtom, selectedDeckIdAtom} from '../viewmodel/selectionAtom'
import styles from './Sidebar.module.css'

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
	const handleChangeSelection = useAction(selectionActions.selectSection)
	const [selection] = useAtom(selectionAtom)

	return (
		<div className={styles.sectionsList}>
			<p className={styles.materialsTitle}>
				{getMessage('Sidebar.Title.Materials')}
			</p>
			<SelectList onItemSelect={handleChangeSelection} selectedItem={selection.type}>
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
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)
	const [selectedDeckId] = useAtom(selectedDeckIdAtom)
	const {data: folder} = useSelectedFolder(selectedFolderId)
	const handleSelectDeckAction = useAction(selectionActions.selectDeck)
	const handleSelectFolderAction = useAction(selectionActions.selectFolder)
	const handleSetSelectedFolderAction = useAction(setCurrentFolderAction)

	useEffect(() => {
		handleSetSelectedFolderAction({folder})
	}, [folder, handleSetSelectedFolderAction])

	const setSelection = (id: string) => {
		const selectedContent = folder.content.find(el => el.id === id)

		if (!selectedContent) {
			throw new Error(`Incorrect id selected: ${id}`)
		}

		if (selectedContent.type === 'folder') {
			handleSelectFolderAction({
				folderId: selectedContent.id,
			})
		}

		if (selectedContent.type === 'deck') {
			handleSelectDeckAction({
				parentFolderId: selectedFolderId,
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
				<SelectList onItemSelect={setSelection} selectedItem={selectedDeckId}>
					{folder?.content?.map(item => (
						<SelectList.Item id={item.id} key={item.id}>
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

function useSelectedFolder(folderId: string | null) {
	const router = useRouter()

	const queryResult = useQuery(`folderId:${folderId}`, async () => {
		const userId = AuthProvider.getUserId()

		if (!folderId) {
			const response = await FoldersAPI.get().rootFolderGet(userId)
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