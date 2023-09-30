import React, {useEffect, useState} from 'react'
import FormContainer from './common/FormContainer'
import styles from './LoginForm.module.css'
import {useRouter} from 'next/router'
import {useMutation} from 'react-query'
import AuthProvider from '../../../../../api/common/authProvider'
import {AccountsAPI} from '../../../../../api/AccountsAPI'
import {useEnterHandler} from './hooks/useEnterHandler'
import {TextField} from '@viewshka/uikit'

type LoginFormProps = {
    onRegister: () => void,
    onRecover: () => void,
}

type LoginData = {
	email: string,
	password: string
}

function LoginForm({onRegister, onRecover}: LoginFormProps) {
	const router = useRouter()
	const {status, data, mutate} = useLoginMutation()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [unauthorized, setUnauthorized] = useState(false)
	const tryAuthorize = () => {
		if (email && password) {
			mutate({
				email,
				password,
			})
		}
		else {
			setUnauthorized(true)
		}
	}
	const onPasswordChange = (data: string) => {
		setPassword(data)
		if (unauthorized) {
			setUnauthorized(false)
		}
	}

	useEnterHandler(tryAuthorize)
	useEffect(() => {
		if (status === 'success') {
			AuthProvider.setAuthToken(data.token)
			AuthProvider.setUserId(data.userId)
			router.replace('/dashboard')
		}
		if (status === 'error') {
			setUnauthorized(true)
		}
	}, [data, router, status])

	return (
		<FormContainer>
			<TextField
				placeholder={'Почта'}
				onChange={setEmail}
				valid={!unauthorized}
			/>
			<TextField
				className={styles.passwordTextField}
				placeholder={'Пароль'}
				onChange={onPasswordChange}
				valid={!unauthorized}
				errorMessage={'Неверный логин или пароль'}
				contentHidden={true}
			/>
			<p className={styles.forgotPasswordText}>
				<span onClick={onRecover}>Забыл пароль</span>
			</p>
			<button className={styles.submitButton} onClick={tryAuthorize}>
                Войти
			</button>
			<p className={styles.registerText}>
				<span onClick={onRegister}>Создать аккаунт</span>
			</p>
		</FormContainer>
	)
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