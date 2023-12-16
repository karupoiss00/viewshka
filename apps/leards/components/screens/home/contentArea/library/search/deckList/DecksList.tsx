import {SearchResult} from '@leards/api/generated'
import {isLast} from '@viewshka/core'
import React from 'react'
import {Deck} from './deck/Deck'
import styles from './DecksList.module.css'

type DecksListProps = {
	decks: SearchResult[]
}
function DecksList({decks}: DecksListProps) {
	const listElements = decks.map((deck, index) => (
		<div key={`deck-with-separator-${index}`}>
			<Deck
				id={deck.id}
				name={deck.name}
				tags={deck.tags}
				key={`deck-${index}`}
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