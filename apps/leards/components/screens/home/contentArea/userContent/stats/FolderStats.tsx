import {StorageStats} from '@leards/components/common/storageStats/StorageStats'
import {StorageType} from '@leards/components/screens/home/viewmodel/selection/Selection'
import React from 'react'
import styles from './FolderStats.module.css'

type FolderStatsProps = {
	storageType: StorageType
	storageId: string
}
function FolderStats(props: FolderStatsProps) {
	return (
		<div className={styles.container}>
			<StorageStats {...props}/>
		</div>
	)
}

export {
	FolderStats,
}