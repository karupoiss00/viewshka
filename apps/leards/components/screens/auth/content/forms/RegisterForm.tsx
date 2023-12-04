import {AccountsAPI} from '@leards/api/AccountsAPI'
import {CreateUserRequest} from '@leards/api/generated'
import {useFormReset} from '@leards/components/screens/auth/content/forms/hooks/useFormReset'
import {LandingButton} from '@leards/components/screens/landing/common/button/LandingButton'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import AuthProvider from '@leards/providers/authProvider'
import {useAction} from '@reatom/npm-react'
import {isValidEmail, isValidPassword, isValidUsername} from '@viewshka/core'
import {Button, TextField, PropsWithClassname} from '@viewshka/uikit'
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import {useMutation} from 'react-query'
import {userActions} from '../../../../common/viewmodel/userAtom'
import FormContainer from './common/FormContainer'
import {useEnterHandler} from './hooks/useEnterHandler'
import styles from './RegisterForm.module.css'

type RegisterFormProps = PropsWithClassname & {
	onLogin: () => void;
	visible: boolean;
};

function RegisterForm({className, onLogin, visible}: RegisterFormProps) {
	const router = useRouter()
	const getMessage = useMessages()
	const handleSetUserAction = useAction(userActions.set)
	const {status, data, mutate} = useRegisterMutation()
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [emailValid, setEmailValid] = useState(true)
	const [usernameValid, setUsernameValid] = useState(true)
	const [passwordValid, setPasswordValid] = useState(true)
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


	const tryRegister = () => {
		const validEmail = validateEmail(email)
		const validPassword = validatePassword(password)
		const validUsername = validateUsername(username)

		if (validEmail && validPassword && validUsername) {
			mutate({
				username,
				email,
				password,
			})
		}
	}

	const resetForm = () => {
		setUsernameValid(true)
		setEmailValid(true)
		setPasswordValid(true)
	}

	useEnterHandler(tryRegister)
	useFormReset(resetForm, visible)
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
		<FormContainer className={className}>
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
				className={styles.usernameTextField}
				placeholder={getMessage('TextField.Username.Placeholder')}
				onChange={setUsername}
				onValidate={validateUsername}
				valid={usernameValid}
				errorMessage={getMessage('Error.InvalidUsernameFormat')}
			/>
			<LandingButton
				className={styles.submitButton}
				type={'primary'}
				size={'large'}
				onClick={tryRegister}
				state={buttonState}
			>
				{getMessage('Register.Button.Submit')}
			</LandingButton>
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

export default RegisterForm