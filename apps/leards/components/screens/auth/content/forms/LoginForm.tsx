import {Button, TextField} from '@viewshka/uikit'
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import {useMutation} from 'react-query'
import {AccountsAPI} from '../../../../../api/AccountsAPI'
import {useMessages} from '../../../../../i18n/hooks/useMessages'
import AuthProvider from '../../../../../providers/authProvider'
import FormContainer from './common/FormContainer'
import {useEnterHandler} from './hooks/useEnterHandler'
import styles from './LoginForm.module.css'

type LoginFormProps = {
    onRegister: () => void,
}

type LoginData = {
	email: string,
	password: string
}

function LoginForm({onRegister}: LoginFormProps) {
	const getMessage = useMessages()
	const router = useRouter()
	const {status, data, mutate} = useLoginMutation()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [unauthorized, setUnauthorized] = useState(false)
	const buttonState = status === 'loading' ? 'loading' : 'default'
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
				placeholder={getMessage('TextField.Email.Placeholder')}
				onChange={setEmail}
				valid={!unauthorized}
			/>
			<TextField
				className={styles.passwordTextField}
				placeholder={getMessage('TextField.Password.Placeholder')}
				onChange={onPasswordChange}
				valid={!unauthorized}
				errorMessage={getMessage('Error.InvalidCredentials')}
				contentHidden={true}
			/>
			<Button
				className={styles.submitButton}
				type={'primary'}
				size={'large'}
				onClick={tryAuthorize}
				state={buttonState}
			>
				{getMessage('Login.Button.Submit')}
			</Button>
			<p className={styles.registerText}>
				<span onClick={onRegister}>{getMessage('Link.CreateAccount')}</span>
			</p>
		</FormContainer>
	)
}

function useLoginMutation() {
	return useMutation(async ({email, password}: LoginData) => {
		AuthProvider.setBaseAuth(email, password)
		AccountsAPI.update()
		const response = await AccountsAPI.get().accountsGet()
		return response.data
	})
}


export default LoginForm