import {SearchResult} from '@leards/api/generated'
import {isLast} from '@viewshka/core'
import React from 'react'
import {Deck} from './deck/Deck'
import styles from './DecksList.module.css'

type DecksListProps = {
	decks: SearchResult[]
	onDeckClick: (deckId: string) => void
}
function DecksList({decks, onDeckClick}: DecksListProps) {
	const listElements = decks.map((deck, index) => (
		<div key={`deck-with-separator-${index}`}>
			<Deck
				name={deck.name}
				tags={deck.tags}
				key={deck.id}
				onClick={() => onDeckClick(deck.id)}
			/>
			{
				!isLast(decks, index)
				&& <div
					className={styles.separator}
					key={`deck-separator-${index}`}
				/>
			}
		</div>
	))

	return (
		<div className={styles.list}>
			{listElements}
		</div>
	)
}


export {
	DecksList,
}