import {PropsWithClassname} from '@viewshka/uikit'
import classnames from 'classnames'
import React, {PropsWithChildren} from 'react'
import styles from './TopPanel.module.css'

function CommonTopPanel({children, className}: PropsWithChildren & PropsWithClassname) {
	return (
		<div className={classnames(styles.panel, className)}>
			{children}
		</div>
	)
}

export default CommonTopPanel