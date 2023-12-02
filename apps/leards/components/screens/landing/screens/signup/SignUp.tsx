import Form from '@leards/components/screens/auth/content/Form'
import React from 'react'
import {Card} from '../../common/card/Card'
import styles from './SignUp.module.css'

function SignUp() {
	return (
		<div className={styles.container}>
			<div className={styles.cardsPair}>
				<Card size="medium" className={styles.topCard}>
					Sign Up
				</Card>
				<Card size="medium" className={styles.bottomCard}>
					Зарегистрироваться
				</Card>
			</div>
			<div className={styles.form}>
				<Form initialState={'register'}/>
			</div>
		</div>
	)
}

export {
	SignUp,
}