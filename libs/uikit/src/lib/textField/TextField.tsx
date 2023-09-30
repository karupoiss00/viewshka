import {useState} from 'react'
import IconCloseEye from '../icons/IconCloseEye'
import IconOpenEye from '../icons/IconOpenEye'
import styles from './TextField.module.css'
import classnames from 'classnames'

type TextFieldProps = {
	className?: string
    placeholder?: string
    errorMessage?: string
    contentHidden?: boolean
    onChange: (value: string) => void
    validate?: (value: string) => boolean
}

function TextField({className, placeholder, errorMessage, contentHidden, onChange, validate}: TextFieldProps) {
	const [isValidate, setIsValidate] = useState(true)
	const [isVisible, setIsVisible] = useState(!contentHidden)
	const [text, setText] = useState('')

	return (
		<div className={styles['text-field-container']}>
			<div
				className={classnames(styles['text-field'], {
					[styles['text-field--default']]: isValidate,
					[styles['text-field--error']]: !isValidate,
				}, className)}
				onBlur={() => validate && setIsValidate(validate(text))}
			>
				<input
					className={styles['text-field-input']}
					placeholder={placeholder}
					type={isVisible ? 'text' : 'password'}
					onChange={event => {
						onChange(event.target.value)
						setText(event.target.value)
					}}
				>
				</input>
				{contentHidden !== undefined && <VisibilityButton isVisibility={isVisible} onClick={() => setIsVisible(!isVisible)}/>}
			</div>
			<p className={styles['error-text']} hidden={isValidate}>{errorMessage}</p>
		</div>
	)
}

type VisibilityButtonProps = {
	isVisibility: boolean
	onClick: () => void
}

function VisibilityButton({isVisibility, onClick}: VisibilityButtonProps) {
	return <div className={styles['eye-container']} onClick={onClick}>
		{isVisibility ? <IconOpenEye/> : <IconCloseEye/>}
	</div>
}

export default TextField