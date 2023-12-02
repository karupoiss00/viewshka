import {
	WorkspaceFeature,
} from '@leards/components/screens/landing/screens/advantages/workspaceFeature/WorkspaceFeature'
import React from 'react'
import styles from './Advantages.module.css'
import {LibraryFeature} from './libraryFeature/LibraryFeature'
import {PersonalDecks} from './personalDecks/PersonalDecks'
import {SharingFeature} from './sharingFeature/SharingFeature'

function Advantages() {
	return (
		<div className={styles.layout}>
			<PersonalDecks/>
			<SharingFeature/>
			<LibraryFeature/>
			<WorkspaceFeature/>
		</div>
	)
}

export {
	Advantages,
}