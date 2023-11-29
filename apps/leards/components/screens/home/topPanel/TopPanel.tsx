import {
	useSetSelectedStorageParam,
} from '@leards/components/screens/home/common/hooks/useLoadSelectionParams'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAction, useAtom} from '@reatom/npm-react'
import {
	Breadcrumbs,
	TextField,
	PropsWithClassname,
} from '@viewshka/uikit'
import classnames from 'classnames'
import React, {PropsWithChildren} from 'react'
import {currentFolderAtom} from '../viewmodel/currentFolderAtom'
import {selectionActions, selectionAtom} from '../viewmodel/selectionAtom'
import styles from './TopPanel.module.css'
import {UserProfilePanel} from './UserProfile'

const MAX_CRUMBS_COUNT = 4

function TopPanel({className}: PropsWithClassname) {
	const [selection] = useAtom(selectionAtom)
	return (
		<Panel className={className}>
			<div className={styles.contentContainer}>
				{selection.type === 'user-content' && <UserContentPanel/>}
				{selection.type === 'library' && <LibraryPanel/>}
				<UserProfilePanel/>
			</div>
		</Panel>
	)
}

function UserContentPanel() {
	const getMessages = useMessages()
	const [currentFolder] = useAtom(currentFolderAtom)
	const setSelectedStorageQuery = useSetSelectedStorageParam()
	const handleSelectFolderAction = useAction(selectionActions.selectFolder)

	const selectFolder = (id: string) => {
		handleSelectFolderAction({
			folderId: id,
		})
		setSelectedStorageQuery('folder', id)
	}

	const path = currentFolder?.path?.length > MAX_CRUMBS_COUNT
		? [currentFolder.path[0], ...currentFolder.path.slice(-3)]
		: currentFolder?.path || []

	return (
		<Breadcrumbs onItemClick={selectFolder}>
			{path?.map((item, i) => (
				<Breadcrumbs.Item id={item.id} key={item.id}>
					{i === 0 ? getMessages('TopPanel.MainFolder.Name') : item.name}
				</Breadcrumbs.Item>
			))}
		</Breadcrumbs>
	)
}

function LibraryPanel() {
	const getMessage = useMessages()
	return (
		<div className={styles.libraryPanel}>
			<TextField
				className={styles.searchField}
				onChange={console.log}
				size={'small'}
				placeholder={getMessage('TopPanel.Search.Placeholder')}
			/>
		</div>
	)
}

function Panel({children, className}: PropsWithChildren & PropsWithClassname) {
	return (
		<div className={classnames(styles.panel, className)}>
			{children}
		</div>
	)
}

export default TopPanel