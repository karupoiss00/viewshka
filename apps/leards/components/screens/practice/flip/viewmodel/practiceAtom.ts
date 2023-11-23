import {Card} from '@leards/api/generated'
import {
	cardsToRepeatActions,
	cardsToRepeatAtom,
} from '@leards/components/screens/practice/flip/viewmodel/cardsToRepeatAtom'
import {action, atom} from '@reatom/core'

type StartState = {
	status: 'start'
}

type InProgressState = {
	status: 'in-progress'
	progress: number
	cards: Card[]
}

type IntermediateResultState = {
	status: 'intermediate-result'
	cardsLeft: number
	cardsLearned: number
}

type ResultState = {
	status: 'result'
}

type PracticeState = StartState | InProgressState | IntermediateResultState | ResultState

const practiceAtom = atom<PracticeState>({
	status: 'start',
})

const currentCardAtom = atom<Card | null>(ctx => {
	const practice = ctx.spy(practiceAtom)

	if (practice.status !== 'in-progress') {
		return null
	}

	const {progress, cards} = practice

	return cards[progress]
})

const currentProgressAtom = atom(ctx => {
	const practice = ctx.spy(practiceAtom)

	if (practice.status !== 'in-progress') {
		return 0
	}

	return practice.progress / practice.cards.length
})

const cardsLeftAtom = atom(ctx => {
	const practice = ctx.spy(practiceAtom)

	if (practice.status !== 'in-progress') {
		return 0
	}

	return practice.cards.length - practice.progress
})

const showResults = action(ctx => {
	const practice = ctx.get(practiceAtom)

	if (practice.status !== 'in-progress') {
		return
	}

	const {cards} = practice

	const repeatCardsCount = ctx.get(cardsToRepeatAtom).length
	if (repeatCardsCount) {
		practiceAtom(ctx, {
			status: 'intermediate-result',
			cardsLeft: repeatCardsCount,
			cardsLearned: cards.length - repeatCardsCount,
		})
	}
	else {
		practiceAtom(ctx, {
			status: 'result',
		})
	}
})

type StartPracticeActionPayload = {
	cards: Card[]
}
const start = action((ctx, {cards}: StartPracticeActionPayload) => {
	practiceAtom(ctx, {
		status: 'in-progress',
		progress: 0,
		cards,
	})
	cardsToRepeatAtom(ctx, [])
})

const continuePractice = action(ctx => {
	const practice = ctx.get(practiceAtom)

	if (practice.status !== 'intermediate-result') {
		return
	}

	const cardsToRepeat = ctx.get(cardsToRepeatAtom)

	if (!cardsToRepeatAtom.length) {
		return
	}

	practiceAtom(ctx, {
		status: 'in-progress',
		progress: 0,
		cards: cardsToRepeat,
	})
	cardsToRepeatAtom(ctx, [])
})

type NextCardActionPayload = {
	repeatCard: boolean
}
const nextCard = action((ctx, {repeatCard}: NextCardActionPayload) => {
	const practice = ctx.get(practiceAtom)

	if (practice.status !== 'in-progress') {
		return
	}

	const {progress, cards} = practice

	if (repeatCard) {
		const card = cards[progress]
		cardsToRepeatActions.add(ctx, {card})
	}

	const cardsLeft = progress + 1 >= cards.length
	if (!cardsLeft) {
		practiceAtom(ctx, {
			status: 'in-progress',
			progress: progress + 1,
			cards: [...cards],
		})
	}
	else {
		showResults(ctx)
	}
})

const practiceActions = {
	start,
	continuePractice,
	nextCard,
} as const

export {
	practiceAtom,
	practiceActions,

	currentCardAtom,
	cardsLeftAtom,
	currentProgressAtom,
}