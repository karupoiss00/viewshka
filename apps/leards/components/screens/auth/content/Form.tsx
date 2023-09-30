import Image from 'next/image'
import React, {useState} from 'react'
import styles from './Form.module.css'
import LoginForm from './forms/LoginForm'
import RecoverForm from './forms/RecoverForm'
import RegisterForm from './forms/RegisterForm'

type FormState = 'login' | 'register' | 'recover'

function Form() {
	const [formState, setFormState] = useState<FormState>('login')
	const goLogin = () => setFormState('login')
	const goRegister = () => setFormState('register')
	const goRecover = () => setFormState('recover')

	return (
		<div className={styles.layout}>
			<div className={styles.logo}>
				<Image src={'/images/Logo.svg'} width={326} height={200} alt={'logo'}/>
			</div>
			{formState === 'login' && <LoginForm onRegister={goRegister} onRecover={goRecover}/>}
			{formState === 'register' && <RegisterForm onLogin={goLogin}/>}
			{formState === 'recover' && <RecoverForm onLogin={goLogin}/>}
		</div>
	)
}

export default Form