import {Content} from '@leards/api/generated'
import React from 'react'
import {Deck} from './deck/Deck'
import styles from './DecksList.module.css'

type DecksListProps = {
	decks: Content[]
}
function DecksList({decks}: DecksListProps) {

	return (
		<div className={styles.list}>
			{decks.map(deck => <Deck id={deck.id} name={deck.name}/>)}
		</div>
	)
}


export {
	DecksList,
}