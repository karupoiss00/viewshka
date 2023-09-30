import React, {PropsWithChildren} from 'react'
import styles from './LoadingPage.module.css'

type BaseLayoutProps = PropsWithChildren & {
	className?: string
}

function LoadingPage({children, className}: BaseLayoutProps) {
	return (
		<div className={styles.layout}>
			{children}
		</div>
	)
}

export default LoadingPage