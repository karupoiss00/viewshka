import {CardsAPI} from '@leards/api/CardsAPI'
import {Card} from '@leards/api/generated'
import {Practice} from '@leards/components/screens/practice/flip/practice/Practice'
import {IntermediateResult} from '@leards/components/screens/practice/flip/results/IntermediateResult'
import {TotalResult} from '@leards/components/screens/practice/flip/results/TotalResult'
import {useRouter} from 'next/router'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useMutation} from 'react-query'
import LoadingPage from '../../loading/LoadingPage'
import ProgressBar from '../common/progressBar/ProgressBar'
import PracticeTopPanel from '../common/topPanel/PracticeTopPanel'
import styles from './FlipPractice.module.css'

type PracticeState = 'practice' | 'intermediate-result' | 'result'

function FlipPractice() {
	const {
		isLoading,
		materialName,
		practiceState,
		progress,

		cards,
		cardsToRepeat,
		cardsLeft,
		currentCard,

		goToNextCard,
		addToRepeatQueue,

		onContinuePractice,
		onExit,
		onRestart,
	} = usePracticeState()

	if (isLoading) {
		return <LoadingPage/>
	}

	return (
		<div className={styles.layout}>
			<PracticeTopPanel materialName={materialName} />
			<ProgressBar progress={progress} maxProgress={cards.length}/>
			{
				practiceState === 'practice' && currentCard && <Practice
					currentCard={currentCard}
					cardsLeft={cardsLeft}
					onEasy={() => goToNextCard()}
					onRepeat={addToRepeatQueue}
				/>
			}
			{
				practiceState === 'intermediate-result' && <IntermediateResult
					onExit={onExit}
					onContinuePractice={onContinuePractice}
					learnedCardsCount={cards.length - cardsToRepeat.length}
					repeatCardsCount={cardsToRepeat.length}
				/>
			}
			{
				practiceState === 'result' && <TotalResult
					onExit={onExit}
					onRestart={onRestart}
				/>
			}
		</div>
	)
}

function usePracticeState() {
	const router = useRouter()
	const [materialName, setMaterialName] = useState('')
	const [practiceState, setPracticeState] = useState<PracticeState>('practice')
	const [cards, setCards] = useState<Card[]>(() => [])
	const [cardsToRepeat, setCardsToRepeat] = useState<Card[]>(() => [])
	const [progress, setProgress] = useState(0)
	const allCardsRef = useRef<Array<Card>>([])
	const setInitialCards = useCallback((cards: Card[]) => {
		setCards(cards)
		console.log(123)
		allCardsRef.current = cards
	}, [])
	const isLoading = usePracticeInit(setMaterialName, setInitialCards)

	const cardsLeft = cards.length - progress
	const currentCard = cards[progress]

	const resetPractice = () => {
		setCardsToRepeat([])
		setProgress(0)
		setPracticeState('practice')
	}

	const addCardsToRepeat = useCallback((card: Card) => {
		setCardsToRepeat([
			...cardsToRepeat,
			card,
		])
	}, [cardsToRepeat])

	const goToNextCard = useCallback((lastCardRepeat = false) => {
		setProgress(progress + 1)
		const cardsLeft = progress + 1 >= cards.length
		if (cardsLeft) {
			console.log(cardsToRepeat.length > 0, lastCardRepeat)
			setPracticeState(
				cardsToRepeat.length > 0 || lastCardRepeat
					? 'intermediate-result'
					: 'result',
			)
		}
	}, [cards.length, cardsToRepeat.length, progress])

	const addToRepeatQueue = useCallback(() => {
		addCardsToRepeat(currentCard)
		goToNextCard(true)
	}, [addCardsToRepeat, currentCard, goToNextCard])

	const onContinuePractice = useCallback(() => {
		setCards([...cardsToRepeat])
		resetPractice()
	}, [cardsToRepeat])

	const onRestart = useCallback(() => {
		setCards(allCardsRef.current)
		resetPractice()
	}, [])

	const onExit = useCallback(() => {
		router.push('/home')
	}, [router])

	return {
		isLoading,

		materialName,
		practiceState,
		progress,

		cards,
		cardsToRepeat,
		cardsLeft,
		currentCard,

		addToRepeatQueue,
		goToNextCard,

		onContinuePractice,
		onRestart,
		onExit,
	}
}


function usePracticeInit(setMaterialName: (name: string) => void, setCards: (cards: Array<Card>) => void) {
	const {data: practiceData, status, isLoading, mutate} = useMutation('cards', async () => {
		const response = await CardsAPI.get().getFlipPracticeData()

		return response.data
	})

	useEffect(() => {
		mutate()
	}, [mutate])

	useEffect(() => {
		if (status !== 'success') {
			return
		}

		setMaterialName(practiceData.materialName)
		setCards(practiceData.cards)
	}, [setCards, practiceData, setMaterialName, status])

	return isLoading
}

export {
	FlipPractice,
}