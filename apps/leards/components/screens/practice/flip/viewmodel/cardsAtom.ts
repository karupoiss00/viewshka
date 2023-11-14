import {Card} from '@leards/api/generated'
import {atom} from '@reatom/core'

const cardsAtom = atom<Card[]>([])

export {
	cardsAtom,
}