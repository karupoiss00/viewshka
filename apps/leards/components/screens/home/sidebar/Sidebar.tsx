import {useSetSelectedSectionParam} from '@leards/components/screens/home/common/hooks/useLoadSelectionParams'
import {FavoriteDecksList} from '@leards/components/screens/home/sidebar/contentList/FavoriteDecksList'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAction, useAtom} from '@reatom/npm-react'
import {
	PropsWithClassname,
	SelectList,
	SystemIconFolder,
	SystemIconPublicDecks,
} from '@viewshka/uikit'
import classnames from 'classnames'
import React from 'react'
import {Selection} from '../viewmodel/selection/Selection'
import {
	selectionAtom,
	selectionActions,
} from '../viewmodel/selectionAtom'
import {UserContentList} from './contentList/UserContentList'
import styles from './Sidebar.module.css'


function Sidebar({className}: PropsWithClassname) {
	return (
		<div className={classnames(styles.sidebar, className)}>
			<SectionsList />
			<SectionContent />
		</div>
	)
}

function SectionsList() {
	const getMessage = useMessages()
	const setSectionQueryParam = useSetSelectedSectionParam()
	const handleChangeSelection = useAction(selectionActions.selectSection)
	const [selection] = useAtom(selectionAtom)

	const selectSection = (id: Selection['type']) => {
		setSectionQueryParam(id)
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

function SectionContent() {
	const getMessage = useMessages()
	const [selection] = useAtom(selectionAtom)

	return (
		<div className={styles.contentNavigation}>
			<p className={styles.contentTitle}>
				{getMessage(TITLE_MESSAGE_MAP.get(selection.type))}
			</p>
			{selection.type === 'user-content' && <UserContentList/>}
			{selection.type === 'library' && <FavoriteDecksList/>}
		</div>
	)
}

export default Sidebar