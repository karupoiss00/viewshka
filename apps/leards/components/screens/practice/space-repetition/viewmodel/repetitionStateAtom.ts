import {Card} from '@leards/api/generated'
import {action, atom} from '@reatom/core'

type StartState = {
	state: 'start'
}

type InProgressState = {
	state: 'in-progress',
	card: Card,
}

type FinishState = {
	state: 'finished'
}

type RepetitionState = StartState | InProgressState | FinishState

const repetitionStateAtom = atom<RepetitionState>({
	state: 'start',
})

const startRepetition = action(ctx => {
	repetitionStateAtom(ctx, {
		state: 'start',
	})
})

type StartRepetitionActionPayload = {
	card: Card
}

const showNextCard = action((ctx, {card}: StartRepetitionActionPayload) => {
	repetitionStateAtom(ctx, {
		state: 'in-progress',
		card,
	})
})

const finishRepetition = action(ctx => {
	repetitionStateAtom(ctx, {
		state: 'finished',
	})
})

const repetitionActions = {
	startRepetition,
	showNextCard,
	finishRepetition,
} as const

export {
	repetitionStateAtom,
	repetitionActions,
}