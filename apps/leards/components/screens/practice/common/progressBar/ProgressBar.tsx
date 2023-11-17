import React from 'react'
import styles from './ProgressBar.module.css'

type ProgressBarProps = {
	progress: number,
}
function ProgressBar({progress}: ProgressBarProps) {
	return (
		<div className={styles.container}>
			<div className={styles.progress} style={{
				width: `${progress * 100}%`,
			}} />
		</div>
	)
}

export default ProgressBar