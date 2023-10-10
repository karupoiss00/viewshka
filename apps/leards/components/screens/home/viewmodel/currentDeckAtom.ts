import {HttputilsDeck} from '@leards/api/generated'
import {action, atom} from '@reatom/core'
import {Deck} from './deck/Deck'

const currentDeckAtom = atom<HttputilsDeck | null>({
	deckId: '',
	name: '',
	content: [],
})

function declareDeckAction<T>(reducer: (deck: HttputilsDeck, payload: T) => HttputilsDeck) {
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
	deck: HttputilsDeck | null
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

const addCard = declareDeckAction(Deck.addCard)
const removeCard = declareDeckAction(Deck.removeCard)
const editCardFrontSide = declareDeckAction(Deck.editCardFrontSide)
const editCardBackSide = declareDeckAction(Deck.editCardBackSide)

const currentDeckActions = {
	set,
	addCard,
	removeCard,
	editCardFrontSide,
	editCardBackSide,
} as const

export {
	currentDeckAtom,
	currentDeckActions,
}
