import React, {useState} from 'react'
import styles from './Form.module.css'
import Image from 'next/image'
import LoginForm from './forms/LoginForm'
import RegisterForm from './forms/RegisterForm'
import RecoverForm from './forms/RecoverForm'

type FormState = 'login' | 'register' | 'recover'

function Form() {
	const [formState, setFormState] = useState<FormState>('login')

	const onLogin = () => setFormState('login')
	const onRegister = () => setFormState('register')
	const onRecover = () => setFormState('recover')

	return (
		<div className={styles.layout}>
			<div className={styles.logo}>
				<Image src={'/images/Logo.svg'} width={326} height={200} alt={'logo'}/>
			</div>
			{formState === 'login' && <LoginForm onRegister={onRegister} onRecover={onRecover}/>}
			{formState === 'register' && <RegisterForm onLogin={onLogin}/>}
			{formState === 'recover' && <RecoverForm onLogin={onLogin}/>}
		</div>
	)
}

export default Form