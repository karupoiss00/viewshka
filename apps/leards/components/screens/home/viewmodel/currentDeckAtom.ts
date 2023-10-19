import {Card, Deck as DeckData} from '@leards/api/generated'
import {action, atom} from '@reatom/core'
import {generateUniqueId} from '@viewshka/core'
import {AddCardPayload, Deck} from './deck/Deck'

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
	console.log(cards)
	currentDeck.content = cards
	currentDeckAtom(ctx, currentDeck)
})

type AddCardActionPayload = Omit<AddCardPayload, 'id'>
const addCard = declareDeckAction((deck, payload: AddCardActionPayload) => Deck.addCard(deck, {
	...payload,
	id: generateUniqueId(),
}))
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
