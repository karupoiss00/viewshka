import React, {PropsWithChildren} from 'react'
import styles from './ResultCard.module.css'

function ResultCard({children}: PropsWithChildren) {
	return (
		<div className={styles.resultCard}>
			{children}
		</div>
	)
}

export {
	ResultCard,
}