import {HttputilsDeck} from '@leards/api/generated'
import {action, atom} from '@reatom/core'

const currentDeckAtom = atom<HttputilsDeck | null>({
	deckId: '',
	name: '',
	content: [],
})

type SetCurrentDeckActionPayload = {
	deck: HttputilsDeck | null
}
const setCurrentDeckAction = action((ctx, {deck}: SetCurrentDeckActionPayload) => {
	if (deck) {
		currentDeckAtom(ctx, deck)
	}
})

export {
	currentDeckAtom,
	setCurrentDeckAction,
}
