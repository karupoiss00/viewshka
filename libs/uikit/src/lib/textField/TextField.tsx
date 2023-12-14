import {PropsWithClassname} from '@viewshka/uikit'
import classnames from 'classnames'
import React, {forwardRef, Ref, useCallback, useEffect, useState} from 'react'
import {SystemIconCloseEye} from '../icons/SystemIconCloseEye'
import {SystemIconOpenEye} from '../icons/SystemIconOpenEye'
import styles from './TextField.module.css'

type TextFieldProps = PropsWithClassname & {
	size?: 'default' | 'small'
    placeholder?: string
    errorMessage?: string
    contentHidden?: boolean
	initialValue?: string
	value?: string
	valid?: boolean
    onChange: (value: string) => void
    onValidate?: (value: string) => boolean
	invalidateOnChange?: boolean
	disabled?: boolean
}

const TextField = forwardRef(({
	size = 'default',
	className,
	placeholder,
	errorMessage,
	contentHidden,
	onChange,
	onValidate,
	valid,
	value,
	initialValue,
	invalidateOnChange = false,
	disabled,
}: TextFieldProps, ref: Ref<HTMLInputElement>) => {
	const [isValidData, setIsValidData] = useState(true)
	const [isVisible, setIsVisible] = useState(!contentHidden)
	const [text, setText] = useState(initialValue || '')

	useEffect(() => {
		if (value !== undefined) {
			setText(value)
		}
	}, [value])

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
					[styles['text-field--disabled']]: disabled,
				}, styles[`text-field-size-${size}`])}
				onBlur={() => validate(text)}
			>
				<input
					className={classnames(styles['text-field-input'], styles[`text-field-input-${size}`], {
						[styles['text-field-input--disabled']]: disabled,
					})}
					placeholder={placeholder}
					type={isVisible ? 'text' : 'password'}
					value={text}
					onChange={onChangeHandler}
					ref={ref}
					disabled={disabled}
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
			<p className={classnames(styles['error-text'], {
				[styles['error-text--visible']]: errorMessage && !isValidData,
			})}>{errorMessage}</p>
		</div>
	)
})

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