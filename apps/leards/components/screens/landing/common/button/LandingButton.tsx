import {Button, ButtonProps} from '@viewshka/uikit'
import classnames from 'classnames'
import React from 'react'
import styles from './LandingButton.module.css'

function LandingButton(props: ButtonProps) {
	return (
		<Button {...{
			...props,
			className: classnames(props.className, styles.landingButton),
		}}/>
	)
}

export {
	LandingButton,
}