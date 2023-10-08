import React from 'react'
import {useSelectionParams} from './common/hooks/useSelectionParams'
import ContentArea from './contentArea/ContentArea'
import styles from './Home.module.css'
import Sidebar from './sidebar/Sidebar'
import TopPanel from './topPanel/TopPanel'

function Home() {
	useSelectionParams()

	return (
		<div className={styles.layout}>
			<TopPanel className={styles.topPanel}/>
			<Sidebar className={styles.sidebar}/>
			<ContentArea className={styles.contentArea} />
		</div>
	)
}

export default Home