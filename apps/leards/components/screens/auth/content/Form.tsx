import classnames from 'classnames'
import React, {useState} from 'react'
import styles from './Form.module.css'
import LoginForm from './forms/LoginForm'
import RegisterForm from './forms/RegisterForm'

type FormState = 'login' | 'register'

type FormProps = {
	initialState?: FormState
}
function Form({
	initialState = 'login',
}: FormProps) {
	const [formState, setFormState] = useState<FormState>(initialState)
	const goLogin = () => setFormState('login')
	const goRegister = () => setFormState('register')

	return (
		<div className={styles.layout}>
			<div className={classnames(styles.logo, {
				[styles.logoSmall]: formState === 'register',
			})}>
				<img
					className={styles.logoImage}
					src="/images/logo.svg"
					alt="logo"
				/>
			</div>
			<div className={styles.formContainer}>
				<div className={styles.formViewBox}>
					<LoginForm
						className={classnames(styles.loginForm, {
							[styles.loginFormVisible]: formState === 'login',
							[styles.loginFormHidden]: formState !== 'login',
						})}
						visible={formState === 'login'}
						onRegister={goRegister}
					/>
					<RegisterForm
						className={classnames(styles.registerForm, {
							[styles.registerFormVisible]: formState === 'register',
							[styles.registerFormHidden]: formState !== 'register',
						})}
						visible={formState === 'register'}
						onLogin={goLogin}
					/>
				</div>
			</div>
		</div>
	)
}

export default Form