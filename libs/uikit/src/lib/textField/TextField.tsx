import { useState } from "react";
import styles from './TextField.module.css';
import classnames from "classnames";
import VisibilityButton from "./VisibilityButton";

type TextFieldProps = {
    placeholder?: string
    errorMessage?: string
    contentHidden: boolean
    onChange: (value: string) => void
    onInput: (value: string) => void
    validate?: (value: string) => boolean
}

function TextField({placeholder, errorMessage, contentHidden = false, onChange, onInput, validate}: TextFieldProps) {
    const [isValidate, setIsValidate] = useState(true)
    const [isVisible, setIsVisible] = useState(!contentHidden)
    const [text, setText] = useState("")

    return <div className={styles["text-field-container"]}>
        <div 
            className={classnames(styles["text-field"], {
                [styles["text-field--default"]]: isValidate,
                [styles["text-field--error"]]: !isValidate,
            })}
            onBlur={event => {
                console.log(`lose focus: ${text}`)
                if (validate != null) {
                    setIsValidate(validate(text))
                }
            }}
        >
            <input 
                className={styles["text-field-input"]}
                placeholder={placeholder}
                type={isVisible ? "text" : "password"}
                onChange={event => {
                    onChange(event.target.value)
                    setText(event.target.value)
                }}
            >
            </input>
            <VisibilityButton isVisibility={isVisible} onClick={() => setIsVisible(!isVisible)} />      
        </div>
        <p className={styles["error-text"]} hidden={isValidate}>{errorMessage}</p>
    </div>
}

export default TextField;