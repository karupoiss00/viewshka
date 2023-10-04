import {PropsWithClassname} from '@viewshka/core'
import classnames from 'classnames'
import React from 'react'
import styles from './Sidebar.module.css'

function Sidebar({className}: PropsWithClassname) {
	return (
		<div className={classnames(styles.sidebar, className)}>

		</div>
	)
}

export default Sidebar