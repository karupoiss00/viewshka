import classnames from 'classnames'
import {useEffect, useState} from 'react'
import IconCloseEye from '../icons/IconCloseEye'
import IconOpenEye from '../icons/IconOpenEye'
import styles from './TextField.module.css'

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
				<TextVisibilitySwitcher
					className={classnames({
						[styles['empty-text-field']]:  !text,
					})}
					state={isVisible ? 'visible' : 'hidden'}
					hidden={contentHidden === undefined}
					onClick={() => setIsVisible(!isVisible)}
				/>
			</div>
			<p className={styles['error-text']} hidden={isValidData}>{errorMessage}</p>
		</div>
	)
}

type VisibilityButtonProps = {
	state: 'visible' | 'hidden'
	className?: string
	onClick: () => void
	hidden?: boolean
}

function TextVisibilitySwitcher({className, state, onClick, hidden}: VisibilityButtonProps) {
	if (hidden) {
		return null
	}

	return <div className={classnames(styles['eye-container'], className)} onClick={onClick}>
		{state === 'visible' && <IconOpenEye/>}
		{state === 'hidden' && <IconCloseEye/>}
	</div>
}

export {
	TextField,
}