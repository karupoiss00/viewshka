import {Card, Deck as DeckData} from '@leards/api/generated'
import {action, atom} from '@reatom/core'
import {merge} from '@viewshka/core'
import {Deck} from './deck/Deck'

const currentDeckAtom = atom<DeckData | null>({
	deckId: '',
	name: '',
	content: [],
})

function declareDeckAction<T>(reducer: (deck: DeckData, payload: T) => DeckData) {
	return action((ctx, payload: T) => {
		const deck = ctx.get(currentDeckAtom)
		const resultDeck = structuredClone(
			reducer(deck, payload),
		)
		currentDeckAtom(
			ctx,
			resultDeck,
		)
	})
}

type SetCurrentDeckActionPayload = {
	deck: DeckData | null
}
const set = action((ctx, {deck}: SetCurrentDeckActionPayload) => {
	if (deck) {
		const currentDeck = ctx.get(currentDeckAtom)
		currentDeck.deckId = deck.deckId
		currentDeck.content = deck.content
		currentDeck.name = deck.name
		currentDeckAtom(ctx, deck)
	}
})

type UpdateCardsActionPayload = {
	cards: Array<Card>
}
const updateCards = action((ctx, {cards}: UpdateCardsActionPayload) => {
	const currentDeck = ctx.get(currentDeckAtom)
	currentDeckAtom(ctx, {
		...currentDeck,
		content: merge(currentDeck.content, cards, (a, b) => a.cardId === b.cardId),
	})
})

const addCard = declareDeckAction(Deck.addCard)
const removeCard = declareDeckAction(Deck.removeCard)
const editCardFrontSide = declareDeckAction(Deck.editCardFrontSide)
const editCardBackSide = declareDeckAction(Deck.editCardBackSide)

const currentDeckActions = {
	set,
	updateCards,
	addCard,
	removeCard,
	editCardFrontSide,
	editCardBackSide,
} as const

export {
	currentDeckAtom,
	currentDeckActions,
}
