import React, {useState} from 'react'
import styles from './TextField.module.css'

type TextFieldProps = {
    placeholder?: string
    errorMessage?: string
    contentVisible: boolean
    onChange: (value: string) => void
    onInput: (value: string) => void
    validate?: (value: string) => boolean
}

function TextField({placeholder, errorMessage, contentVisible, onChange, onInput, validate}: TextFieldProps) {
	const [isValidate] = useState(true)

	return <div>
		<input
			className={styles['text-field']}
			placeholder={placeholder}
			onChange={event => {
				onChange(event.target.value)
			}}
		>
		</input>
		<p hidden={!isValidate}>{errorMessage}</p>
	</div>
}

export default TextField