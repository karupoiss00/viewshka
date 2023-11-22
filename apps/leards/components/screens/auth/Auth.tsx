import {CardsAPI} from '@leards/api/CardsAPI'
import Router from 'next/router'
import React from 'react'
import styles from './Auth.module.css'
import Form from './content/Form'

function Auth() {
	return (
		<div className={styles.pageLayout}>
			<Form/>
		</div>
	)
}

function goToAuth() {
	Router.push(`/auth`)
}

export {
	goToAuth,
	Auth,
}