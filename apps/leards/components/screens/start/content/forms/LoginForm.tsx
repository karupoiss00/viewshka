import React from "react";
import FormContainer from "./common/FormContainer";

type LoginFormProps =  {
    goToRegister: () => void,

}

function LoginForm({goToRegister}: LoginFormProps) {
    return (
        <FormContainer>
            <input/>
            <input/>
            <p>Забыл пароль</p>
            <button></button>
            <p onClick={goToRegister}>Создать аккаунт</p>
        </FormContainer>
    )
}

export default LoginForm