import Image from 'next/image'
import React, {useState} from 'react'
import styles from './Form.module.css'
import LoginForm from './forms/LoginForm'
import RegisterForm from './forms/RegisterForm'

type FormState = 'login' | 'register' | 'recover'

function Form() {
	const [formState, setFormState] = useState<FormState>('login')
	const goLogin = () => setFormState('login')
	const goRegister = () => setFormState('register')

	return (
		<div className={styles.layout}>
			<div className={styles.logo}>
				<Image src={'/images/Logo.svg'} width={326} height={200} alt={'logo'}/>
			</div>
			{formState === 'login' && <LoginForm onRegister={goRegister}/>}
			{formState === 'register' && <RegisterForm onLogin={goLogin}/>}
		</div>
	)
}

export default Form