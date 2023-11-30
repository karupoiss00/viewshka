import {SystemIconDeck} from '@viewshka/uikit'
import React from 'react'
import styles from './Deck.module.css'

/**
 * .deck {
 *     display: flex;
 *     flex-direction: row;
 *     height: 80px;
 *     flex-shrink: 0;
 *     flex-grow: 1;
 *     background: var(--surface-color);
 *     color: var(--text-color-default)
 * }
 *
 * .icon {
 *     padding-block: 20px;
 *     padding-inline: 37px 63px;
 * }
 *
 * .info-container {
 *     display: flex;
 *     flex-direction: column;
 *     gap: 6px;
 * }
 *
 * .name {
 *     color: var(--text-color-default);
 * }
 *
 * .tags-container {
 *     display: flex;
 *     flex-direction: row;
 *     gap: 5px;
 *     color: var(--text-color-subdued);
 * }
 */

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
					{tags.map(tag => <div>{tag}</div>)}
				</div>
			</div>
		</div>
	)
}

export {
	Deck,
}