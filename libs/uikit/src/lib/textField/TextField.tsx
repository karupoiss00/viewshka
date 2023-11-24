import {PropsWithClassname} from '@viewshka/core'
import classnames from 'classnames'
import React, {useCallback, useEffect, useState} from 'react'
import {SystemIconCloseEye} from '../icons/SystemIconCloseEye'
import {SystemIconOpenEye} from '../icons/SystemIconOpenEye'
import styles from './TextField.module.css'

type TextFieldProps = PropsWithClassname & {
	size?: 'default' | 'small'
    placeholder?: string
    errorMessage?: string
    contentHidden?: boolean
	initialValue?: string
	valid?: boolean
    onChange: (value: string) => void
    onValidate?: (value: string) => boolean
	invalidateOnChange?: boolean
}

function TextField({
	size = 'default',
	className,
	placeholder,
	errorMessage,
	contentHidden,
	onChange,
	onValidate,
	valid,
	initialValue,
	invalidateOnChange = false,
}: TextFieldProps) {
	const [isValidData, setIsValidData] = useState(true)
	const [isVisible, setIsVisible] = useState(!contentHidden)
	const [text, setText] = useState(initialValue || '')

	useEffect(() => {
		if (valid !== undefined) {
			setIsValidData(valid)
		}
	}, [valid])

	const validate = useCallback(
		(value: string) => onValidate && setIsValidData(onValidate(value)),
		[onValidate],
	)

	const onChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		if (invalidateOnChange) {
			validate(value)
		}
		else {
			setIsValidData(true)
		}
		onChange(value)
		setText(value)
	}, [invalidateOnChange, onChange, validate])

	return (
		<div className={classnames(styles['text-field-container'], className)}>
			<div
				className={classnames(styles['text-field'], {
					[styles['text-field--default']]: isValidData,
					[styles['text-field--error']]: !isValidData,
				}, styles[`text-field-size-${size}`])}
				onBlur={() => validate(text)}
			>
				<input
					className={classnames(styles['text-field-input'], styles[`text-field-input-${size}`])}
					placeholder={placeholder}
					type={isVisible ? 'text' : 'password'}
					value={text}
					onChange={onChangeHandler}
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
			{!!errorMessage && <p className={styles['error-text']} hidden={isValidData}>{errorMessage}</p>}
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
		{state === 'visible' && <SystemIconOpenEye/>}
		{state === 'hidden' && <SystemIconCloseEye/>}
	</div>
}

export {
	TextField,
}