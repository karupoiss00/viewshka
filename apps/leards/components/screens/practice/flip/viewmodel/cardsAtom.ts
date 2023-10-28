import {atom} from '@reatom/core'
import {progressAtom} from './progressAtom'

const cardsAtom = atom([])

const currentCardAtom = atom(ctx => {
	const progress = ctx.spy(progressAtom)
	const cards = ctx.spy(cardsAtom)

	if (!cards.length) {
		return null
	}

	return cards[progress]
})

export {
	cardsAtom,
	currentCardAtom,
}