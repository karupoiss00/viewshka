import {Card as CardData} from '@leards/api/generated'
import {getRandomNumber} from '@viewshka/core'
import classnames from 'classnames'
import React, {MouseEventHandler, useCallback, useRef, useState, useEffect} from 'react'
import styles from './FlipCardsStack.module.css'

const MAX_ROTATION_DEG = 15
const MAX_OFFSET_X = 50
const MAX_OFFSET_Y = 50

type ActiveSide = 'front' | 'back'

type FlipCardsProps = {
	topCard: CardData
	cardsLeft: number
};
function FlipCardsStack({topCard, cardsLeft} : FlipCardsProps) {
	const [activeSide, setActiveSide] = useState<ActiveSide>('front')
	const ghosts = []
	const cardRef = useRef<HTMLDivElement>()

	for (let i = 0; i < cardsLeft - 1; i++) {
		ghosts.push(<CardGhost key={i}/>)
	}

	useEffect(() => {
		setActiveSide('front')
	}, [topCard])

	return (
		<div className={styles.flipCardsContainer}>
			{ghosts}
			<Card
				ref={cardRef}
				activeSide={activeSide}
				setActiveSide={setActiveSide}
				frontSideText={topCard.frontSide}
				backSideText={topCard.backSide}
			/>
		</div>
	)
}

type CardProps = {
	activeSide: ActiveSide,
	setActiveSide: (side: ActiveSide) => void,
	frontSideText: string
	backSideText: string
}
const Card = React.forwardRef<HTMLDivElement, CardProps>(({activeSide, setActiveSide, frontSideText, backSideText}: CardProps, ref) => {
	const [playAnimation, setPlayAnimation] = useState<'first-part'|'second-part'|'none'>('none')

	const onClick: MouseEventHandler<HTMLDivElement> = e => {
		if (e.defaultPrevented) {
			return
		}
		setPlayAnimation('first-part')
	}

	const onMouseDown: MouseEventHandler<HTMLDivElement> = e => {
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
	})

	return (
		<div
			className={className}
			onClick={onClick}
			onMouseDown={onMouseDown}
			onAnimationEnd={onAnimationEnd}
			ref={ref}
		>
			<span>
				{activeSide === 'front' && frontSideText}
				{activeSide === 'back' && backSideText}
			</span>
		</div>
	)
})

function CardGhost() {
	const stylesRef = useRef({
		transform: `
			rotate(${getRandomNumber(-MAX_ROTATION_DEG, MAX_ROTATION_DEG)}deg) 
			translateX(${getRandomNumber(-MAX_OFFSET_X, MAX_OFFSET_X)}px)
			translateY(${getRandomNumber(-MAX_OFFSET_Y, MAX_OFFSET_Y)}px)`,
	})
	const className = classnames(styles.card, {
		[styles.cardGhost]: true,
	})

	return (
		<div className={className} style={stylesRef.current} />
	)
}

export default FlipCardsStack