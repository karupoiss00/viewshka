import React, {useEffect, useRef, useState} from 'react'
import FormContainer from './common/FormContainer'
import styles from './LoginForm.module.css'
import {useRouter} from 'next/router'
import {useMutation} from 'react-query'
import {AuthAPI} from '../../../../../api/AuthAPI'
import AuthProvider from '../../../../../api/common/authProvider'
import {AccountsApi} from '../../../../../api/generated'
import {AccountsAPI} from '../../../../../api/AccountsAPI'
import TextField from '../../../../../../../libs/uikit/src/lib/textField/TextField'

type LoginFormProps = {
    onRegister: () => void,
    onRecover: () => void,
}

function LoginForm({onRegister, onRecover}: LoginFormProps) {
	const router = useRouter()
	const {status, data, mutate} = useLoginMutation()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = () => {
		mutate({
			email,
			password,
		})
	}

	useEnterHandler(handleLogin)
	useEffect(() => {
		if (status == 'success') {
			AuthProvider.setAuthToken(data.token)
			AuthProvider.setUserId(data.userId)
			router.replace('/dashboard')
		}
	}, [data, router, status])

	return (
		<FormContainer>
			<TextField
				placeholder={'электронный адрес'}
				onChange={setEmail}
			/>
			<TextField
				className={styles.passwordTextField}
				placeholder={'пароль'}
				onChange={setPassword}
				contentHidden={true}
			/>
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

function useEnterHandler(callback: () => void) {
	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				callback()
			}
		}

		window.addEventListener('keydown', onKeyDown)

		return () => {
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [])
}

export default LoginForm