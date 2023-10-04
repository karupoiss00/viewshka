import {PropsWithClassname} from '@viewshka/core'
import classnames from 'classnames'
import React from 'react'
import styles from './ContentArea.module.css'

function ContentArea({className}: PropsWithClassname) {
	return (
		<div className={classnames(styles.contentArea, className)}>

		</div>
	)
}

export default ContentArea