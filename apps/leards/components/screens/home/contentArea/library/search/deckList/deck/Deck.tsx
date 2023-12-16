import {SystemIconDeck} from '@viewshka/uikit'
import React from 'react'
import styles from './Deck.module.css'

type DeckProps = {
	name: string
	tags: string[]
	onClick: () => void
}
function Deck({name, tags, onClick}: DeckProps) {
	return (
		<div className={styles.deck} onClick={onClick}>
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