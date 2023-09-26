import React, {useEffect} from 'react'
import FormContainer from './common/FormContainer'
import styles from './LoginForm.module.css'
import {useRouter} from 'next/router'
import {useMutation} from 'react-query'
import {AuthAPI} from '../../../../../api/AuthAPI'
import AuthProvider from '../../../../../api/common/authProvider'

type LoginFormProps = {
    onRegister: () => void,
    onRecover: () => void,
}

function LoginForm({onRegister, onRecover}: LoginFormProps) {
	const router = useRouter()
	const {status, data, mutate} = useLoginMutation()
	const handleLogin = () => {
		mutate()
	}

	useEffect(() => {
		if (status == 'success') {
			AuthProvider.setAuthToken(data.token)
			router.replace('/dashboard')
		}
	}, [data, router, status])

	return (
		<FormContainer>
			<input placeholder={'электронный адрес'}/>
			<input className={styles.passwordTextField} placeholder={'пароль'}/>
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

function useLoginMutation() {
	return useMutation(async () => {
		const response = await AuthAPI.get().authIdGet('')
		return response.data
	})
}

export default LoginForm