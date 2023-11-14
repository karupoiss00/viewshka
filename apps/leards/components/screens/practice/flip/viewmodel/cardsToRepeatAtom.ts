import {Card} from '@leards/api/generated'
import {action, atom} from '@reatom/core'

const cardsToRepeatAtom = atom<Card[]>([])

type AddCardToRepeatActionPayload = {
	card: Card
}
const add = action((ctx, {card}: AddCardToRepeatActionPayload) => {
	const currentCards = ctx.get(cardsToRepeatAtom)
	cardsToRepeatAtom(ctx, [
		...currentCards,
		card,
	])
})

const cardsToRepeatActions = {
	add,
} as const

export {
	cardsToRepeatAtom,
	cardsToRepeatActions,
}