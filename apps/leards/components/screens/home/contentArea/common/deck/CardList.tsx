import {Card as CardData, Deck as DeckData} from '@leards/api/generated'
import {useAction} from '@reatom/npm-react'
import React, {useState} from 'react'
import {currentDeckActions} from '../../../viewmodel/currentDeckAtom'
import styles from './CardList.module.css'

interface CardListProps {
	deck: DeckData
	readonly: boolean
}
function CardList({deck, readonly}: CardListProps) {
	return (
		<div className={styles.list}>
			{deck.content.map(card => (
				<Card card={card} key={card.cardId} readonly={readonly}/>
			))}
		</div>
	)
}

type CardProps = {
	card: CardData
	readonly: boolean
}
function Card({card, readonly}: CardProps) {
	const {cardId, frontSide, backSide} = card
	const [frontSideText, setFrontSideText] = useState(frontSide)
	const [backSideText, setBackSideText] = useState(backSide)
	const handleEditCardFrontSideAction = useAction(currentDeckActions.editCardFrontSide)
	const handleEditCardBackSideAction = useAction(currentDeckActions.editCardBackSide)
	const handleRemoveCardAction = useAction(currentDeckActions.removeCard)

	const onFrontEditorKeyDown: React.KeyboardEventHandler<HTMLDivElement> = e => {
		const removeCombinationPressed = e.key === 'Backspace' && e.ctrlKey
		if (removeCombinationPressed && !frontSideText.length) {
			handleRemoveCardAction({
				cardId,
			})
		}
	}

	return (
		<div className={styles.card}>
			<input
				className={styles.sideValueEditor}
				value={frontSideText}
				disabled={readonly}
				onKeyDown={onFrontEditorKeyDown}
				onChange={e => {
					handleEditCardFrontSideAction({
						cardId,
						frontSide: e.target.value,
					})
					setFrontSideText(e.target.value)
				}}
			/>
			<div className={styles.divider}></div>
			<input
				className={styles.sideValueEditor}
				value={backSideText}
				disabled={readonly}
				onChange={e => {
					handleEditCardBackSideAction({
						cardId,
						backSide: e.target.value,
					})
					setBackSideText(e.target.value)
				}}/>
		</div>
	)
}

export {
	CardList,
}