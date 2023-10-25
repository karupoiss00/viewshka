import {atom} from '@reatom/core'
import {progressAtom} from './progressAtom'

const cardsAtom = atom([])

const currentCardAtom = atom(ctx => {
	const progress = ctx.get(progressAtom)
	const cards = ctx.get(cardsAtom)

	if (!cards.length) {
		return null
	}

	return cards[progress]
})

export {
	cardsAtom,
	currentCardAtom,
}