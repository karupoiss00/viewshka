import React from 'react'
import {Preloader} from '../../common/preloader/Preloader'
import styles from './LoadingPage.module.css'

function LoadingPage() {
	return (
		<div className={styles.layout}>
			<Preloader/>
		</div>
	)
}

export default LoadingPage