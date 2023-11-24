import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAction, useAtom} from '@reatom/npm-react'
import {PropsWithClassname} from '@viewshka/core'
import {
	Breadcrumbs,
	TextField,
} from '@viewshka/uikit'
import classnames from 'classnames'
import React, {PropsWithChildren} from 'react'
import {useSelectedFolderParam} from '../common/hooks/useLoadSelectionParams'
import {currentFolderAtom} from '../viewmodel/currentFolderAtom'
import {selectionActions, selectionAtom} from '../viewmodel/selectionAtom'
import styles from './TopPanel.module.css'
import {UserProfilePanel} from './UserProfile'

const MAX_CRUMBS_COUNT = 4

function TopPanel({className}: PropsWithClassname) {
	const [selection] = useAtom(selectionAtom)
	return (
		<Panel className={className}>
			{selection.type === 'user-content' && <UserContentPanel/>}
			{selection.type === 'library' && <LibraryPanel/>}
			<UserProfilePanel/>
		</Panel>
	)
}

function UserContentPanel() {
	const getMessages = useMessages()
	const [currentFolder] = useAtom(currentFolderAtom)
	const {setSelectedFolderParam} = useSelectedFolderParam()
	const handleSelectFolderAction = useAction(selectionActions.selectFolder)

	const selectFolder = (id: string) => {
		handleSelectFolderAction({
			folderId: id,
		})
		setSelectedFolderParam(id)
	}

	const path = currentFolder.path?.length > MAX_CRUMBS_COUNT
		? [currentFolder.path[0], ...currentFolder.path.slice(-3)]
		: currentFolder.path || []

	return (
		<div className={styles.userContentPanel}>
			<Breadcrumbs className={styles.breadcrumbs} onItemClick={selectFolder}>
				{path?.map((item, i) => (
					<Breadcrumbs.Item id={item.id} key={item.id}>
						{i === 0 ? getMessages('TopPanel.MainFolder.Name') : item.name}
					</Breadcrumbs.Item>
				))}
			</Breadcrumbs>
		</div>
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