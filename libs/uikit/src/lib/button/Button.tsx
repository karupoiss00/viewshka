import {PropsWithClassname} from '@viewshka/core'
import classnames from 'classnames'
import React, {PropsWithChildren} from 'react'
import commonStyles from './Common.module.css'
import ghostStyles from './GhostButton.module.css'
import linkStyles from './LinkButton.module.css'
import primaryStyles from './PrimaryButton.module.css'
import secondaryStyles from './SecondaryButton.module.css'

type ButtonType = 'primary' | 'secondary' | 'link' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonState = 'default' | 'hovered' | 'pressed' | 'disabled' | 'loading';
type ButtonSpacing = 'default' | 'none';

type ButtonProps = PropsWithChildren & PropsWithClassname & {
	type: ButtonType;
	size: ButtonSize;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	state?: ButtonState;
	spacing?: ButtonSpacing;
	flexible?: boolean;
};

function getButtonStyles(type: ButtonType) {
	if (type === 'primary') {
		return primaryStyles
	}
	if (type === 'secondary') {
		return secondaryStyles
	}
	if (type === 'link') {
		return linkStyles
	}
	if (type === 'ghost') {
		return ghostStyles
	}

	throw new Error('unknown button type')
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
	type,
	size,
	onClick,
	state = 'default',
	flexible = false,
	spacing = 'default',
	children,
	className,
}, ref) => {
	const specificStyles = getButtonStyles(type)

	return (
		<button
			className={classnames(commonStyles['button'], specificStyles['button'], {
				[commonStyles[`button-spacing--none`]]: spacing === 'none',
				[commonStyles[`button--flexible`]]: flexible,
				[commonStyles[`button-size--${size}`]]: true,
				[commonStyles[`button-state--loading`]]: state === 'loading',
				[specificStyles[`button-state--${state}`]]: true,
			}, className)}
			onClick={onClick}
			disabled={state === 'disabled'}
			ref={ref}
		>
			<div className={commonStyles['button-content']}>{children}</div>
		</button>
	)
})

export type {
	ButtonType,
	ButtonSize,
	ButtonState,
	ButtonSpacing,
}

export {
	Button,
}