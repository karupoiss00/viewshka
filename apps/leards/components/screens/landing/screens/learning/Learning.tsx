import {CardEditor} from '@leards/components/screens/landing/screens/learning/cardEditor/CardEditor'
import {Button} from '@viewshka/uikit'
import React, {forwardRef, MutableRefObject} from 'react'
import {Card} from '../../common/card/Card'
import styles from './Learning.module.css'

const Learning = forwardRef((_, ref: MutableRefObject<HTMLDivElement>) => (
	<div className={styles.layout} ref={ref}>
		<LearningBlock/>
		<CardPair/>
	</div>
))

function LearningBlock() {
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
				<CardEditor
					initialState={{
						word: 'car',
						translation: 'машина',
					}}
					onCardChange={() => {}}
				/>
				<CardEditor
					initialState={{
						word: 'car',
						translation: 'машина',
					}}
					onCardChange={() => {}}
				/>
				<CardEditor
					initialState={{
						word: 'car',
						translation: 'машина',
					}}
					onCardChange={() => {}}
				/>
				<CardEditor
					initialState={{
						word: 'car',
						translation: 'машина',
					}}
					onCardChange={() => {}}
				/>
				<CardEditor
					initialState={{
						word: 'car',
						translation: 'машина',
					}}
					onCardChange={() => {}}
				/>
			</div>
			<Button
				className={styles.learnButton}
				type="primary"
				size="large"
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
}