import {useAtom} from '@reatom/npm-react'
import {getRandomInt} from '@viewshka/core'
import classnames from 'classnames'
import React, {MouseEventHandler, useCallback, useEffect, useRef, useState} from 'react'
import {currentCardAtom} from '../viewmodel/cardsAtom'
import {cardsLeftCountAtom} from '../viewmodel/progressAtom'
import styles from './FlipCards.module.css'

const MAX_ROTATION_DEG = 15
const MAX_OFFSET_X = 50
const MAX_OFFSET_Y = 50

function FlipCards() {
	const [currentCard] = useAtom(currentCardAtom)
	const [cardsLeftCount] = useAtom(cardsLeftCountAtom)

	const ghosts = []

	for (let i = 0; i < cardsLeftCount - 1; i++) {
		ghosts.push(<CardGhost key={i}/>)
	}

	return (
		<div className={styles.flipCardsContainer}>
			{ghosts}
			{currentCard && <Card frontSideText={currentCard.frontSide} backSideText={currentCard.backSide}/>}
		</div>
	)
}

type CardProps = {
	frontSideText: string
	backSideText: string
}
function Card({frontSideText, backSideText}: CardProps) {
	const [activeSide, setActiveSide] = useState<'front'|'back'>('front')

	const onClick = useCallback(() => {
		setActiveSide(activeSide === 'front' ? 'back' : 'front')
	}, [activeSide])

	const onMouseDown: MouseEventHandler<HTMLDivElement> = e => {
		if (e.detail > 1) {
			e.preventDefault()
		}
	}

	const className = classnames(styles.card, {
		[styles.cardActive]: true,
		[styles.flipped]: activeSide === 'back',
	})

	return (
		<div
			className={className}
			onClick={onClick}
			onMouseDown={onMouseDown}
		>
			<span>
				{activeSide === 'front' && frontSideText}
				{activeSide === 'back' && backSideText}
			</span>
		</div>
	)
}

function CardGhost() {
	const stylesRef = useRef({
		transform: `
			rotate(${getRandomInt(-MAX_ROTATION_DEG, MAX_ROTATION_DEG)}deg) 
			translateX(${getRandomInt(-MAX_OFFSET_X, MAX_OFFSET_X)}px)
			translateY(${getRandomInt(-MAX_OFFSET_Y, MAX_OFFSET_Y)}px)`,
	})
	const className = classnames(styles.card, {
		[styles.cardGhost]: true,
	})

	return (
		<div className={className} style={stylesRef.current} />
	)
}


export default FlipCards