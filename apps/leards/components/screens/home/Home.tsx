import Router from 'next/router'
import React from 'react'
import {useLoadSelectionParams} from './common/hooks/useLoadSelectionParams'
import ContentArea from './contentArea/ContentArea'
import styles from './Home.module.css'
import Sidebar from './sidebar/Sidebar'
import TopPanel from './topPanel/TopPanel'

function Home() {
	useLoadSelectionParams()

	return (
		<div className={styles.layout}>
			<TopPanel className={styles.topPanel}/>
			<Sidebar className={styles.sidebar}/>
			<ContentArea className={styles.contentArea} />
		</div>
	)
}

function goToHome() {
	Router.push(`/home`)
}

export {
	Home,
	goToHome,
}