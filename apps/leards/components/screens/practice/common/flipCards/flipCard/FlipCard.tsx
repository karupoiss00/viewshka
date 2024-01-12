import {getRandomNumber} from '@viewshka/core'
import {PropsWithClassname} from '@viewshka/uikit'
import classnames from 'classnames'
import React, {MouseEventHandler, useCallback, useRef, useState} from 'react'
import styles from './FlipCard.module.css'

type ActiveSide = 'front' | 'back'

const MAX_ROTATION_DEG = 15
const MAX_OFFSET_X = 50
const MAX_OFFSET_Y = 50

type FlipCardProps = PropsWithClassname & {
	activeSide: ActiveSide,
	setActiveSide: (side: ActiveSide) => void,
	frontSideText: string
	backSideText: string
}
function FlipCard(props: FlipCardProps) {
	const {
		className: externalClassName,
		activeSide,
		setActiveSide,
		frontSideText,
		backSideText,
	} = props
	const [playAnimation, setPlayAnimation] = useState<'first-part'|'second-part'|'none'>('none')

	const onClick: MouseEventHandler<HTMLDivElement> = e => {
		if (e.defaultPrevented) {
			return
		}
		setPlayAnimation('first-part')
	}

	const onMouseDown: MouseEventHandler<HTMLDivElement> = e => {
		// нужно для того чтобы не выделся текст двойным кликом
		if (e.detail > 1) {
			e.preventDefault()
		}
	}

	const onAnimationEnd = useCallback(() => {
		if (playAnimation === 'first-part') {
			setPlayAnimation('second-part')
			setActiveSide(activeSide === 'front' ? 'back' : 'front')
		}
		if (playAnimation === 'second-part') {
			setPlayAnimation('none')
		}
	}, [activeSide, playAnimation, setActiveSide])

	const className = classnames(styles.card, {
		[styles.cardActive]: true,
		[styles.cardFlippingFirstPart]: playAnimation == 'first-part',
		[styles.cardFlippingSecondPart]: playAnimation == 'second-part',
	}, externalClassName)

	return (
		<div
			className={className}
			onClick={onClick}
			onMouseDown={onMouseDown}
			onAnimationEnd={onAnimationEnd}
		>
			<span>
				{activeSide === 'front' && frontSideText}
				{activeSide === 'back' && backSideText}
			</span>
		</div>
	)
}

function FlipCardGhost({className: externalClassName}: PropsWithClassname) {
	const stylesRef = useRef({
		transform: `
			rotate(${getRandomNumber(-MAX_ROTATION_DEG, MAX_ROTATION_DEG)}deg) 
			translateX(${getRandomNumber(-MAX_OFFSET_X, MAX_OFFSET_X)}px)
			translateY(${getRandomNumber(-MAX_OFFSET_Y, MAX_OFFSET_Y)}px)`,
	})
	const className = classnames(styles.card, {
		[styles.cardGhost]: true,
	}, externalClassName)

	return (
		<div className={className} style={stylesRef.current} />
	)
}


export {
	FlipCard,
	FlipCardGhost,

	type ActiveSide as FlipCardActiveSide,
}