import React from 'react'
import CommonTopPanel from '../../../../common/topPanel/TopPanel'
import styles from './PracticeTopPanel.module.css'

type PracticeTopPanelProps = {
	materialName: string
}
function PracticeTopPanel({materialName}: PracticeTopPanelProps) {
	return (
		<CommonTopPanel className={styles.topPanel}>
			<p className={styles.materialNameHeader}>{materialName}</p>
		</CommonTopPanel>
	)
}

export default PracticeTopPanel