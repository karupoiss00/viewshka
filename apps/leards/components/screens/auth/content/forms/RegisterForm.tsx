import React, {useEffect, useRef} from 'react'
import FormContainer from './common/FormContainer'
import styles from './RegisterForm.module.css'
import {useMutation} from 'react-query'
import {HttputilsCreateUserRequest} from '../../../../../api/generated'
import {AccountsAPI} from '../../../../../api/AccountsAPI'
import AuthProvider from '../../../../../api/common/authProvider'
import {useRouter} from 'next/router'

type RegisterFormProps = {
  onLogin: () => void;
};

function RegisterForm({onLogin}: RegisterFormProps) {
	const router = useRouter()
	const {status, data, mutate} = useRegisterMutation()
	const emailInputRef = useRef<HTMLInputElement>()
	const usernameInputRef = useRef<HTMLInputElement>()
	const passwordInputRef = useRef<HTMLInputElement>()
	const handleRegister = () => {
		mutate({
			username: usernameInputRef.current.value,
			email: emailInputRef.current.value,
			password: passwordInputRef.current.value,
		})
	}

	useEffect(() => {
		if (status == 'success') {
			AuthProvider.setAuthToken(data.token)
			AuthProvider.setUserId(data.userId)
			router.push('/dashboard')
		}
	}, [data, router, status])

	return (
		<FormContainer>
			<input placeholder={'Электронный адрес'} ref={emailInputRef} />
			<input className={styles.usernameTextField} placeholder={'Имя пользователя'} ref={usernameInputRef} />
			<input className={styles.passwordTextField} placeholder={'Пароль'} ref={passwordInputRef} />
			<input className={styles.passwordTextField} placeholder={'Повторите пароль'}/>
			<button className={styles.submitButton} onClick={handleRegister}>
				Зарегистрироваться
			</button>
			<p className={styles.authText}>
				Уже есть аккаунт? <span onClick={onLogin}>Войти</span>
			</p>
		</FormContainer>
	)
}

function useRegisterMutation() {
	return useMutation(async (userData: HttputilsCreateUserRequest) => {
		const response = await AccountsAPI.get().accountsPost(userData)
		return response.data
	})
}


export default RegisterForm