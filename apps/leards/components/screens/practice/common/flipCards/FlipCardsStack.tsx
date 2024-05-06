import {Card as CardData} from '@leards/api/generated'
import {
	FlipCard,
	FlipCardActiveSide,
	FlipCardGhost,
} from '@leards/components/screens/practice/common/flipCards/flipCard/FlipCard'
import {useLayoutEffect} from '@viewshka/core'
import React, {useState} from 'react'
import styles from './FlipCardsStack.module.css'

type FlipCardsProps = {
	topCard: CardData
	cardsLeft: number
};
function FlipCardsStack({topCard, cardsLeft} : FlipCardsProps) {
	const [activeSide, setActiveSide] = useState<FlipCardActiveSide>('front')
	const ghosts = []

	for (let i = 0; i < cardsLeft - 1; i++) {
		ghosts.push(<FlipCardGhost className={styles.card} key={i}/>)
	}

	useLayoutEffect(() => {
		setActiveSide('front')
	}, [topCard])

	return (
		<div className={styles.flipCardsContainer}>
			{ghosts}
			<FlipCard
				className={styles.card}
				activeSide={activeSide}
				setActiveSide={setActiveSide}
				frontSideText={topCard.frontSide}
				backSideText={topCard.backSide}
			/>
		</div>
	)
}

export {
	FlipCardsStack,
}