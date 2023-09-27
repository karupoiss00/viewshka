import React from 'react'
import BaseLayout from '../../common/BaseLayout'
import Form from './content/Form'
import styles from './Auth.module.css'

function Auth() {
	return (
		<BaseLayout className={styles.pageLayout}>
			<Form/>
		</BaseLayout>
	)
}

export default Auth