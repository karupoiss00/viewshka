import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAction, useAtom} from '@reatom/npm-react'
import {PropsWithClassname} from '@viewshka/core'
import {SelectList, SystemIconFolder, SystemIconPublicDecks, SystemIconTaskList} from '@viewshka/uikit'
import classnames from 'classnames'
import React from 'react'
import {selectionAtom, setSelectionAction} from '../viewmodel/selectionAtom'
import styles from './Sidebar.module.css'

function Sidebar({className}: PropsWithClassname) {
	const getMessage = useMessages()
	const [selection] = useAtom(selectionAtom)
	const handleChangeSelection = useAction(setSelectionAction)

	return (
		<div className={classnames(styles.sidebar, className)}>
			<p className={styles.materialsTitle}>
				{getMessage('Sidebar.Title.Materials')}
			</p>
			<SelectList
				onItemSelect={handleChangeSelection}
				initialSelectedItem={selection.type}
			>
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
			<p className={styles.userContentTitle}>
				{getMessage('Sidebar.Title.UserContent')}
			</p>
		</div>
	)
}

export default Sidebar