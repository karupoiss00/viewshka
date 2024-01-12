import React, {PropsWithChildren} from 'react'
import styles from './TrainingCard.module.css'

function TrainingCard({children}: PropsWithChildren) {
	return (
		<div className={styles.resultCard}>
			{children}
		</div>
	)
}

export {
	TrainingCard,
}