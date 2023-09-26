import React from 'react'
import BaseLayout from '../../common/BaseLayout'
import Form from './content/Form'
import styles from './Start.module.css'

function Start() {
	return (
		<BaseLayout className={styles.pageLayout}>
			<Form/>
		</BaseLayout>
	)
}

export default Start