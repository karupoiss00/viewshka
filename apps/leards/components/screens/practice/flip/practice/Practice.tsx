import {Card} from '@leards/api/generated'
import FlipCardsStack from '@leards/components/screens/practice/common/flipCards/FlipCardsStack'
import Controls from '@leards/components/screens/practice/flip/controls/Controls'
import React from 'react'
import styles from './Practice.module.css'

type CardsProps = {
	currentCard: Card
	cardsLeft: number
	onEasy: () => void
	onRepeat: () => void
}
function Practice({currentCard, cardsLeft, onEasy, onRepeat}: CardsProps) {
	return (
		<div className={styles.container}>
			<div className={styles.cards}>
				<FlipCardsStack topCard={currentCard} cardsLeft={cardsLeft}/>
			</div>
			<Controls onEasy={onEasy} onRepeat={onRepeat}/>
		</div>
	)
}

export {
	Practice,
}