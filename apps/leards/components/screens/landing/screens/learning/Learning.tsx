import {Button} from '@viewshka/uikit'
import {useRouter} from 'next/router'
import React, {forwardRef, MutableRefObject, useCallback, useState} from 'react'
import {Card} from '../../common/card/Card'
import {CardData, CardEditor} from './cardEditor/CardEditor'
import {getCards} from './data/generateRandomCards'
import styles from './Learning.module.css'

const LOCAL_CARDS_STORAGE_KEY = 'local-cards'

const Learning = forwardRef((_, ref: MutableRefObject<HTMLDivElement>) => (
	<div className={styles.layout} ref={ref}>
		<LearningBlock/>
		<CardPair/>
	</div>
))

function LearningBlock() {
	const router = useRouter()
	const [cards, setCards] = useState(() => getCards())

	const updateCard = useCallback((card: CardData, index: number) => {
		const newCards = structuredClone(cards)
		newCards[index] = card
		setCards(newCards)
	}, [cards])

	const saveCards = useCallback(() => {
		window?.localStorage.setItem(LOCAL_CARDS_STORAGE_KEY, JSON.stringify(cards))
	}, [cards])

	const onLearnButtonClick = useCallback(() => {
		saveCards()
		router.push('/practice/trial')
	}, [router, saveCards])

	return (
		<div className={styles.fillCardsArea}>
			<div className={styles.textContainer}>
				<div className={styles.header}>
					Попробуй
				</div>
				<div className={styles.description}>
					Заполни каждую карточку на передней и задней стороне
					и приступи к тренировке
				</div>
			</div>
			<div className={styles.cardsList}>
				{
					cards.map(
						(card, index) =>
							<CardEditor
								key={index}
								initialState={card}
								onCardChange={card => updateCard(card, index)}
							/>,
					)
				}
			</div>
			<Button
				className={styles.learnButton}
				type="primary"
				size="large"
				onClick={onLearnButtonClick}
			>
				<span className={styles.learnButtonText}>Запомнить</span>
			</Button>
		</div>
	)
}

function CardPair() {
	return (
		<div className={styles.cardsPair}>
			<Card className={styles.bottomCard} size="medium">
				Перевод
			</Card>
			<div className={styles.arrows}></div>
			<Card className={styles.topCard} size="medium">
				Слово
			</Card>
		</div>
	)
}


export {
	Learning,
	LOCAL_CARDS_STORAGE_KEY,
}