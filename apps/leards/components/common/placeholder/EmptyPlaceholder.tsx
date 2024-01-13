import React from 'react'
import styles from './EmptyPlaceholder.module.css'

type EmptyPlaceholderProps = {
	text: string
}
function EmptyPlaceholder({text}: EmptyPlaceholderProps) {
	return (
		<div className={styles.placeholderContainer}>
			<div className={styles.placeholder}></div>
			{text}
		</div>
	)
}


export {
	EmptyPlaceholder,
}