import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAction, useAtom} from '@reatom/npm-react'
import {PropsWithClassname} from '@viewshka/core'
import {Breadcrumbs} from '@viewshka/uikit'
import classnames from 'classnames'
import React, {PropsWithChildren} from 'react'
import {useSelectedFolderParam} from '../common/hooks/useLoadSelectionParams'
import {currentFolderAtom} from '../viewmodel/currentFolderAtom'
import {selectionActions, selectionAtom} from '../viewmodel/selectionAtom'
import styles from './TopPanel.module.css'

function TopPanel({className}: PropsWithClassname) {
	const [selection] = useAtom(selectionAtom)
	return (
		<Panel className={className}>
			{selection.type === 'user-content' && <UserContentPanel/>}
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

	return (
		<div className={styles.userContentPanel}>
			<Breadcrumbs className={styles.breadcrumbs} onItemClick={selectFolder}>
				{currentFolder.path?.map((item, i) => (
					<Breadcrumbs.Item id={item.id} key={item.id}>
						{i === 0 ? getMessages('TopPanel.MainFolder.Name') : item.name}
					</Breadcrumbs.Item>
				))}
			</Breadcrumbs>
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