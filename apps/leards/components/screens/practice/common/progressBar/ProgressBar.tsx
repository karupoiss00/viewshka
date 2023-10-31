import React from 'react'
import styles from './ProgressBar.module.css'

type ProgressBarProps = {
	progress: number,
	maxProgress: number,
}
function ProgressBar({progress, maxProgress}: ProgressBarProps) {
	if (maxProgress === 0) {
		return null
	}

	return (
		<div className={styles.container}>
			<div className={styles.progress} style={{
				width: `${100 * progress / maxProgress}%`,
			}} />
		</div>
	)
}

export default ProgressBar