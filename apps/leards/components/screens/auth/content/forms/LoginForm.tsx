import React, {useEffect, useRef} from 'react'
import FormContainer from './common/FormContainer'
import styles from './LoginForm.module.css'
import {useRouter} from 'next/router'
import {useMutation} from 'react-query'
import {AuthAPI} from '../../../../../api/AuthAPI'
import AuthProvider from '../../../../../api/common/authProvider'
import {AccountsApi} from '../../../../../api/generated'
import {AccountsAPI} from '../../../../../api/AccountsAPI'

type LoginFormProps = {
    onRegister: () => void,
    onRecover: () => void,
}

function LoginForm({onRegister, onRecover}: LoginFormProps) {
	const router = useRouter()
	const {status, data, mutate} = useLoginMutation()
	const emailInputRef = useRef<HTMLInputElement>()
	const passwordInputRef = useRef<HTMLInputElement>()

	const handleLogin = () => {
		mutate({
			email: emailInputRef.current.value,
			password: passwordInputRef.current.value,
		})
	}

	useEffect(() => {
		if (status == 'success') {
			AuthProvider.setAuthToken(data.token)
			AuthProvider.setUserId(data.userId)
			router.replace('/dashboard')
		}
	}, [data, router, status])

	return (
		<FormContainer>
			<input placeholder={'электронный адрес'} ref={emailInputRef}/>
			<input className={styles.passwordTextField} placeholder={'пароль'} ref={passwordInputRef}/>
			<p className={styles.forgotPasswordText}>
				<span onClick={onRecover}>Забыл пароль</span>
			</p>
			<button className={styles.submitButton} onClick={handleLogin}>
                Войти
			</button>
			<p className={styles.registerText}>
				<span onClick={onRegister}>Создать аккаунт</span>
			</p>
		</FormContainer>
	)
}

type LoginData = {
	email: string,
	password: string
}

function useLoginMutation() {
	return useMutation(async ({email, password}: LoginData) => {
		AuthProvider.setBaseAuth(email, password)
		AccountsAPI.reset()
		const response = await AccountsAPI.get().accountsGet()
		return response.data
	})
}

export default LoginForm