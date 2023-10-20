import {AccountsAPI} from '@leards/api/AccountsAPI'
import {CreateUserRequest} from '@leards/api/generated'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import AuthProvider from '@leards/providers/authProvider'
import {useAction} from '@reatom/npm-react'
import {isValidEmail} from '@viewshka/core'
import {Button, TextField} from '@viewshka/uikit'
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import {useMutation} from 'react-query'
import {userActions} from '../../../../common/viewmodel/userAtom'
import FormContainer from './common/FormContainer'
import {useEnterHandler} from './hooks/useEnterHandler'
import styles from './RegisterForm.module.css'

type RegisterFormProps = {
	onLogin: () => void;
};

function RegisterForm({onLogin}: RegisterFormProps) {
	const router = useRouter()
	const getMessage = useMessages()
	const handleSetUserAction = useAction(userActions.set)
	const {status, data, mutate} = useRegisterMutation()
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [repeatedPassword, setRepeatedPassword] = useState('')
	const [emailValid, setEmailValid] = useState(true)
	const [usernameValid, setUsernameValid] = useState(true)
	const [passwordValid, setPasswordValid] = useState(true)
	const [passwordVerified, setPasswordVerified] = useState(true)
	const buttonState = status === 'loading' ? 'loading' : 'default'

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
			AuthProvider.setAuthToken(data.user.authToken)
			handleSetUserAction({
				user: data.user,
			})
			router.push('/home')
		}
	}, [data, handleSetUserAction, router, status])

	return (
		<FormContainer>
			<TextField
				placeholder={getMessage('TextField.Email.Placeholder')}
				onChange={setEmail}
				onValidate={validateEmail}
				valid={emailValid}
				errorMessage={getMessage('Error.InvalidEmailFormat')}
			/>
			<TextField
				className={styles.passwordTextField}
				placeholder={getMessage('TextField.Password.Placeholder')}
				onChange={setPassword}
				onValidate={validatePassword}
				valid={passwordValid}
				errorMessage={getMessage('Error.InvalidPasswordFormat')}
				contentHidden={true}
			/>
			<TextField
				className={styles.passwordTextField}
				placeholder={getMessage('TextField.RepeatPassword.Placeholder')}
				onChange={setRepeatedPassword}
				onValidate={validatePasswordRepeat}
				valid={passwordVerified}
				errorMessage={getMessage('Error.PasswordNotMatching')}
				contentHidden={true}
			/>
			<TextField
				className={styles.usernameTextField}
				placeholder={getMessage('TextField.Username.Placeholder')}
				onChange={setUsername}
				onValidate={validateUsername}
				valid={usernameValid}
				errorMessage={getMessage('Error.InvalidUsernameFormat')}
			/>
			<Button
				className={styles.submitButton}
				type={'primary'}
				size={'large'}
				onClick={tryRegister}
				state={buttonState}
			>
				{getMessage('Register.Button.Submit')}
			</Button>
			<p className={styles.authText} onClick={onLogin}>
				{getMessage('Link.Authorize')}
			</p>
		</FormContainer>
	)
}

function useRegisterMutation() {
	return useMutation(async (userData: CreateUserRequest) => {
		const response = await AccountsAPI.get().registerNewUser(userData)
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