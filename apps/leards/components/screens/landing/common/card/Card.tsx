import {PropsWithClassname} from '@viewshka/uikit'
import classnames from 'classnames'
import React, {PropsWithChildren} from 'react'
import styles from './Card.module.css'

type CardProps = PropsWithChildren & PropsWithClassname & {
	size: 'small' | 'medium' | 'large'
}
function Card({className: extClassName, children, size}: CardProps) {
	const className = classnames(styles.card, {
		[styles.cardSmall]: size === 'small',
		[styles.cardMedium]: size === 'medium',
		[styles.cardLarge]: size === 'large',
	}, extClassName)

	return (
		<div className={className}>
			{children}
		</div>
	)
}

export {
	Card,
}