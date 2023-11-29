import {LibraryPanel} from '@leards/components/screens/home/topPanel/library/LibraryPanel'
import {UserContentPanel} from '@leards/components/screens/home/topPanel/userContent/UserContentPanel'
import {useAtom} from '@reatom/npm-react'
import {PropsWithClassname} from '@viewshka/uikit'
import classnames from 'classnames'
import React, {PropsWithChildren} from 'react'
import {selectionAtom} from '../viewmodel/selectionAtom'
import {UserProfile} from './common/profile/UserProfile'
import styles from './TopPanel.module.css'

function TopPanel({className}: PropsWithClassname) {
	const [selection] = useAtom(selectionAtom)
	return (
		<Panel className={className}>
			<div className={styles.contentContainer}>
				{selection.type === 'user-content' && <UserContentPanel/>}
				{selection.type === 'library' && <LibraryPanel/>}
				<UserProfile/>
			</div>
		</Panel>
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