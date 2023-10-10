import {HttputilsDeck} from '@leards/api/generated'
import {generateUniqueId} from '@viewshka/core'


interface AddCardPayload {
	frontSide: string
	backSide: string
}
function addCard(deck: HttputilsDeck, {frontSide, backSide}: AddCardPayload): HttputilsDeck {
	deck.content.push({
		cardId: generateUniqueId(),
		frontSide,
		backSide,
	})

	return deck
}

interface RemoveCardPayload {
	cardId: string
}
function removeCard(deck: HttputilsDeck, {cardId}: RemoveCardPayload): HttputilsDeck {
	deck.content = deck.content.filter(card => card.cardId !== cardId)

	return deck
}

interface EditCardFrontSidePayload {
	cardId: string
	frontSide: string
}
function editCardFrontSide(deck: HttputilsDeck, {cardId, frontSide}: EditCardFrontSidePayload): HttputilsDeck {
	const card = deck.content.find(card => card.cardId === cardId)

	if (!card) {
		console.warn(`Card not found`)
		return deck
	}

	card.frontSide = frontSide

	return deck
}

interface EditCardBackSidePayload {
	cardId: string
	backSide: string
}
function editCardBackSide(deck: HttputilsDeck, {cardId, backSide}: EditCardBackSidePayload): HttputilsDeck {
	const card = deck.content.find(card => card.cardId === cardId)

	if (!card) {
		console.warn(`Card not found`)
		return deck
	}

	card.backSide = backSide

	return deck
}

const Deck = {
	addCard,
	removeCard,
	editCardFrontSide,
	editCardBackSide,
} as const

export type {
	AddCardPayload,
	RemoveCardPayload,
	EditCardFrontSidePayload,
	EditCardBackSidePayload,
}

export {
	Deck,
}