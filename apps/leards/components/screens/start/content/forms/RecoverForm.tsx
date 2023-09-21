import React from "react";
import FormContainer from "./common/FormContainer";
import styles from "./RecoverForm.module.css";

type RecoverFormProps =  {
	onLogin: () => void,
}

function RecoverForm({onLogin}: RecoverFormProps) {
	return (
		<FormContainer>
			<input placeholder={'Электронный адрес'}/>
			<button className={styles.submitButton}>
				Восстановить пароль
			</button>
			<p className={styles.returnText}>
				<span onClick={onLogin}>Вернуться</span>
			</p>
		</FormContainer>
	)
}

export default RecoverForm