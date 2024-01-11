import {Avatar, SystemIconDeck} from '@viewshka/uikit'
import React from 'react'
import styles from './Deck.module.css'

type DeckProps = {
	name: string
	tags: string[]
	authorName: string
	authorAvatarUrl: string
	onClick: () => void
}
function Deck({name, tags, onClick, authorName, authorAvatarUrl}: DeckProps) {
	return (
		<div className={styles.deck} onClick={onClick}>
			<div className={styles.icon}>
				<SystemIconDeck/>
			</div>
			<div className={styles.infoContainer}>
				<div className={styles.deckInfoContainer}>
					<div className={styles.name}>
						{name}
					</div>
					<div className={styles.tagsContainer}>
						{tags.map((tag, index) => <div key={index}>#{tag}</div>)}
					</div>
				</div>
				<div className={styles.authorContainer}>
					<span className={styles.authorName}>
						{authorName}
					</span>
					{
						authorAvatarUrl
							? <Avatar size="xsmall" type="image" avatarUrl={authorAvatarUrl}/>
							: <Avatar size="xsmall" type="gradient" name={authorName}/>
					}
				</div>
			</div>
		</div>
	)
}

export {
	Deck,
}