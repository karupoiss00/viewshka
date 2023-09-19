import React, {useState} from "react";
import BaseLayout from "../common/BaseLayout";
import FormLayout from "./content/FormLayout";
import styles from './Start.module.css'
import LoginForm from "./content/forms/LoginForm";

type FormState = 'initial' | 'login' | 'register'

function Start() {
    const [formState, setFormState] = useState<FormState>('initial')

    return (
<BaseLayout className={styles['page-layout']}>
    <FormLayout>
        {formState === 'initial' && <button onClick={() => setFormState('login')}>Начать</button>}
        {formState === 'login' && <LoginForm goToRegister={() => setFormState('register')}/>}
    </FormLayout>
</BaseLayout>
    )
}

export default Start;