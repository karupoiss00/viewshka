import {AccountsAPI} from '@leards/api/AccountsAPI'
import {useFormReset} from '@leards/components/screens/auth/content/forms/hooks/useFormReset'
import {goToHome} from '@leards/components/screens/home/Home'
import {LandingButton} from '@leards/components/screens/landing/common/button/LandingButton'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import AuthProvider from '@leards/providers/authProvider'
import {useAction} from '@reatom/npm-react'
import {PropsWithClassname, TextField} from '@viewshka/uikit'
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import {useMutation} from 'react-query'
import {userActions} from '../../../../common/viewmodel/userAtom'
import FormContainer from './common/FormContainer'
import {useEnterHandler} from './hooks/useEnterHandler'
import styles from './LoginForm.module.css'

type LoginFormProps = PropsWithClassname & {
    onRegister: () => void,
	visible: boolean
}

type LoginData = {
	email: string,
	password: string
}

function LoginForm({className, onRegister, visible}: LoginFormProps) {
	const getMessage = useMessages()
	const router = useRouter()
	const {status, data, mutate} = useLoginMutation()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [unauthorized, setUnauthorized] = useState(false)
	const handleSetUserAction = useAction(userActions.set)
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

	const resetForm = () => {
		setUnauthorized(false)
	}

	useFormReset(resetForm, visible)
	useEnterHandler(tryAuthorize)
	useEffect(() => {
		if (status === 'success') {
			AuthProvider.setAuthToken(data.user.authToken)
			handleSetUserAction({
				user: data.user,
			})
			goToHome()
		}
		if (status === 'error') {
			setUnauthorized(true)
		}
	}, [data, handleSetUserAction, router, status])

	return (
		<FormContainer className={className}>
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
			<LandingButton
				className={styles.submitButton}
				type="primary"
				size="large"
				onClick={tryAuthorize}
				state={buttonState}
			>
				{getMessage('Login.Button.Submit')}
			</LandingButton>
			<p className={styles.registerText}>
				<span onClick={onRegister}>{getMessage('Link.CreateAccount')}</span>
			</p>
		</FormContainer>
	)
}

function useLoginMutation() {
	return useMutation(async ({email, password}: LoginData) => {
		AuthProvider.setBaseAuth(email, password)
		const response = await AccountsAPI.get().loginUser()
		return response.data
	})
}

export default LoginForm