import React, {PropsWithChildren} from "react";
import styles from './FormContainer.module.css'

function FormContainer(props: PropsWithChildren) {
    return (
        <div className={styles.container}>
            {props.children}
        </div>
    )
}

export default FormContainer