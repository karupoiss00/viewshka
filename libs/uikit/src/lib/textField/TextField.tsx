import {useEffect, useState} from 'react'
import IconCloseEye from '../icons/IconCloseEye'
import IconOpenEye from '../icons/IconOpenEye'
import styles from './TextField.module.css'
import classnames from 'classnames'

type TextFieldProps = {
	className?: string
    placeholder?: string
    errorMessage?: string
    contentHidden?: boolean
	valid?: boolean
    onChange: (value: string) => void
    onValidate?: (value: string) => boolean
}

function TextField({className, placeholder, errorMessage, contentHidden, onChange, onValidate, valid}: TextFieldProps) {
	const [isValidData, setIsValidData] = useState(true)
	const [isVisible, setIsVisible] = useState(!contentHidden)
	const [text, setText] = useState('')

	useEffect(() => {
		if (valid !== undefined) {
			setIsValidData(valid)
		}
	}, [valid])

	return (
		<div className={styles['text-field-container']}>
			<div
				className={classnames(styles['text-field'], {
					[styles['text-field--default']]: isValidData,
					[styles['text-field--error']]: !isValidData,
				}, className)}
				onBlur={() => onValidate && setIsValidData(onValidate(text))}
			>
				<input
					className={styles['text-field-input']}
					placeholder={placeholder}
					type={isVisible ? 'text' : 'password'}
					onChange={event => {
						setIsValidData(true)
						onChange(event.target.value)
						setText(event.target.value)
					}}
				>
				</input>
				{contentHidden !== undefined && <VisibilityButton isVisibility={isVisible} onClick={() => setIsVisible(!isVisible)}/>}
			</div>
			<p className={styles['error-text']} hidden={isValidData}>{errorMessage}</p>
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