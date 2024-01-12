import {FlipCardsStack} from '@leards/components/screens/practice/common/flipCards/FlipCardsStack'
import Controls from '@leards/components/screens/practice/flip/controls/Controls'
import {cardsLeftAtom, currentCardAtom} from '@leards/components/screens/practice/flip/viewmodel/practiceAtom'
import {useAtom} from '@reatom/npm-react'
import React from 'react'
import styles from './Practice.module.css'

function Practice() {
	const [currentCard] = useAtom(currentCardAtom)
	const [cardsLeft] = useAtom(cardsLeftAtom)

	return (
		<div className={styles.container}>
			<div className={styles.cards}>
				<FlipCardsStack topCard={currentCard} cardsLeft={cardsLeft}/>
			</div>
			<Controls/>
		</div>
	)
}

export {
	Practice,
}