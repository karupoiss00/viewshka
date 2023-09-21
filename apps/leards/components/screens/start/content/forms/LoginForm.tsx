import React from "react";
import FormContainer from "./common/FormContainer";
import styles from './LoginForm.module.css'

type LoginFormProps =  {
    onRegister: () => void,
    onRecover: () => void,
}

function LoginForm({onRegister, onRecover}: LoginFormProps) {
    return (
        <FormContainer>
            <input placeholder={'электронный адрес'}/>
            <input className={styles.passwordTextField} placeholder={'пароль'}/>
            <p className={styles.forgotPasswordText}>
                <span onClick={onRecover}>Забыл пароль</span>
            </p>
            <button className={styles.submitButton}>
                Войти
            </button>
            <p className={styles.registerText}>
                <span onClick={onRegister}>Создать аккаунт</span>
            </p>
        </FormContainer>
    )
}

export default LoginForm