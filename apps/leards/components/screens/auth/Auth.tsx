import React from 'react'
import BaseLayout from '../../common/BaseLayout'
import styles from './Auth.module.css'
import Form from './content/Form'

function Auth() {
	return (
		<BaseLayout className={styles.pageLayout}>
			<Form/>
		</BaseLayout>
	)
}

export default Auth