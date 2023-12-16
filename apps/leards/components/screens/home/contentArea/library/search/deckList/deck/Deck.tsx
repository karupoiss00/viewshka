import {SystemIconDeck} from '@viewshka/uikit'
import React from 'react'
import styles from './Deck.module.css'

type DeckProps = {
	id: string
	name: string
	tags: string[]
}
function Deck({id, name, tags}: DeckProps) {
	return (
		<div className={styles.deck}>
			<div className={styles.icon}>
				<SystemIconDeck/>
			</div>
			<div className={styles.infoContainer}>
				<div className={styles.name}>
					{name}
				</div>
				<div className={styles.tagsContainer}>
					{tags.map((tag, index) => <div key={index}>#{tag}</div>)}
				</div>
			</div>
		</div>
	)
}

export {
	Deck,
}