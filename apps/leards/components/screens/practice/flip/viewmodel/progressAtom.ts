import {atom} from '@reatom/core'
import {cardsAtom} from './cardsAtom'

const progressAtom = atom(0)

const cardsLeftCountAtom = atom(ctx => {
	const cards = ctx.spy(cardsAtom)
	const progress = ctx.spy(progressAtom)

	return cards.length - progress
})

export {
	progressAtom,
	cardsLeftCountAtom,
}