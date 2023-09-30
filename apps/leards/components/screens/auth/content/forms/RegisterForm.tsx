import React, {useEffect, useState} from 'react'
import FormContainer from './common/FormContainer'
import styles from './RegisterForm.module.css'
import {useMutation} from 'react-query'
import {HttputilsCreateUserRequest} from '../../../../../api/generated'
import {AccountsAPI} from '../../../../../api/AccountsAPI'
import AuthProvider from '../../../../../api/common/authProvider'
import {useRouter} from 'next/router'
import {isValidEmail} from '@viewshka/core'
import {useEnterHandler} from './hooks/useEnterHandler'
import {TextField} from '@viewshka/uikit'


type RegisterFormProps = {
	onLogin: () => void;
};

function RegisterForm({onLogin}: RegisterFormProps) {
	const router = useRouter()
	const {status, data, mutate} = useRegisterMutation()
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [repeatedPassword, setRepeatedPassword] = useState('')
	const [emailValid, setEmailValid] = useState(true)
	const [usernameValid, setUsernameValid] = useState(true)
	const [passwordValid, setPasswordValid] = useState(true)
	const [passwordVerified, setPasswordVerified] = useState(true)

	const validateEmail = (data: string) => {
		const isValid = isValidEmail(data)
		setEmailValid(isValid)
		return isValid
	}

	const validateUsername = (data: string) => {
		const isValid = isValidUsername(data)
		setUsernameValid(isValid)
		return isValid
	}

	const validatePassword = (data: string) => {
		const isValid = isValidPassword(data)
		setPasswordValid(isValid)
		return isValid
	}

	const validatePasswordRepeat = (data: string) => {
		const isValid = data.length && password.length && data === password
		setPasswordVerified(isValid)
		return isValid
	}

	const tryRegister = () => {
		const validEmail = validateEmail(email)
		const validPassword = validatePassword(password)
		const validRepeatPassword = validatePasswordRepeat(repeatedPassword)
		const validUsername = validateUsername(username)

		if (validEmail && validPassword && validUsername && validRepeatPassword) {
			mutate({
				username,
				email,
				password,
			})
		}
	}

	useEnterHandler(tryRegister)

	useEffect(() => {
		if (status == 'success') {
			AuthProvider.setAuthToken(data.token)
			AuthProvider.setUserId(data.userId)
			router.push('/dashboard')
		}
	}, [data, router, status])

	return (
		<FormContainer>
			<TextField
				placeholder={'Почта'}
				onChange={setEmail}
				onValidate={validateEmail}
				valid={emailValid}
				errorMessage={'Неверный электорнный адрес'}
			/>
			<TextField
				className={styles.passwordTextField}
				placeholder={'Пароль'}
				onChange={setPassword}
				onValidate={validatePassword}
				valid={passwordValid}
				errorMessage={'Пароль должен быть длиннее 8 символов и содержать цифру и заглавную букву'}
				contentHidden={true}
			/>
			<TextField
				className={styles.passwordTextField}
				placeholder={'Повтор пароля'}
				onChange={setRepeatedPassword}
				onValidate={validatePasswordRepeat}
				valid={passwordVerified}
				errorMessage={'Пароли не совпадают'}
				contentHidden={true}
			/>
			<TextField
				className={styles.usernameTextField}
				placeholder={'Как вас зовут?'}
				onChange={setUsername}
				onValidate={validateUsername}
				valid={usernameValid}
				errorMessage={'Неверное имя пользователя'}
			/>
			<button className={styles.submitButton} onClick={tryRegister}>
				Зарегистрироваться
			</button>
			<p className={styles.authText} onClick={onLogin}>Авторизоваться</p>
		</FormContainer>
	)
}

function useRegisterMutation() {
	return useMutation(async (userData: HttputilsCreateUserRequest) => {
		const response = await AccountsAPI.get().accountsPost(userData)
		return response.data
	})
}

function isValidPassword(password: string) {
	return password.length >= 8
}

function isValidUsername(name: string) {
	return name.length > 1
}

export default RegisterForm