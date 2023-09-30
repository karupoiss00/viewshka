import {classNames} from '@viewshka/core'
import React, {PropsWithChildren} from 'react'
import styles from './BaseLayout.module.css'

type BaseLayoutProps = PropsWithChildren & {
    className?: string
}

function BaseLayout({children, className}: BaseLayoutProps) {
	return (
		<div className={classNames(styles.layout, className)}>
			{children}
		</div>
	)
}

export default BaseLayout