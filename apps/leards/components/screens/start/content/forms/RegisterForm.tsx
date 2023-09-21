import React from "react";
import FormContainer from "./common/FormContainer";
import styles from "./RegisterForm.module.css";

type LoginFormProps =  {
	onLogin: () => void,
}

function RegisterForm({onLogin}: LoginFormProps) {
	return (
		<FormContainer>
			<input placeholder={'Электронный адрес'}/>
			<input className={styles.passwordTextField} placeholder={'Пароль'}/>
			<input className={styles.passwordTextField} placeholder={'Повторите пароль'}/>
			<button className={styles.submitButton}>
				Зарегистрироваться
			</button>
			<p className={styles.authText}>
				Уже есть аккаунт? <span onClick={onLogin}>Войти</span>
			</p>
		</FormContainer>
	)
}

export default RegisterForm