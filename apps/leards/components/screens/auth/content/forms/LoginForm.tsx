import React, {useEffect, useState} from 'react'
import FormContainer from './common/FormContainer'
import styles from './LoginForm.module.css'
import {useRouter} from 'next/router'
import {useMutation} from 'react-query'
import AuthProvider from '../../../../../api/common/authProvider'
import {AccountsAPI} from '../../../../../api/AccountsAPI'
import TextField from '../../../../../../../libs/uikit/src/lib/textField/TextField'

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
	const [isValidEmail, setIsValidEmail] = useState(true)
	const [password, setPassword] = useState('')
	const [unauthorized, setUnauthorized] = useState(false)
	const tryAuthorize = () => {
		if (email) {
			mutate({
				email,
				password,
			})
		}
		else {
			setIsValidEmail(false)
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
				placeholder={'электронный адрес'}
				onChange={setEmail}
				valid={isValidEmail}
				errorMessage={'Неверный электорнный адрес'}
			/>
			<TextField
				className={styles.passwordTextField}
				placeholder={'пароль'}
				onChange={onPasswordChange}
				valid={!unauthorized}
				errorMessage={'Неверный пароль'}
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
	}, [callback])
}

export default LoginForm