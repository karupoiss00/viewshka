import {PropsWithClassname} from '@viewshka/uikit'
import classnames from 'classnames'
import React, {PropsWithChildren} from 'react'
import styles from './FormContainer.module.css'

function FormContainer({className, children}: PropsWithChildren & PropsWithClassname) {
	return (
		<div className={classnames(styles.container, className)}>{children}</div>
	)
}

export default FormContainer