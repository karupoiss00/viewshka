import {PropsWithClassname} from '@viewshka/core'
import classnames from 'classnames'
import React from 'react'
import styles from './TopPanel.module.css'

function TopPanel({className}: PropsWithClassname) {
	return (
		<div className={classnames(styles.panel, className)}>

		</div>
	)
}

export default TopPanel