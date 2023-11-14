import {CardsAPI} from '@leards/api/CardsAPI'
import {Card} from '@leards/api/generated'
import {Practice} from '@leards/components/screens/practice/flip/practice/Practice'
import {IntermediateResult} from '@leards/components/screens/practice/flip/results/IntermediateResult'
import {TotalResult} from '@leards/components/screens/practice/flip/results/TotalResult'
import {cardsAtom} from '@leards/components/screens/practice/flip/viewmodel/cardsAtom'
import {
	currentProgressAtom,
	practiceActions,
	practiceAtom,
} from '@leards/components/screens/practice/flip/viewmodel/practiceAtom'
import {useAction, useAtom} from '@reatom/npm-react'
import {useRouter} from 'next/router'
import React, {useCallback, useEffect, useState} from 'react'
import {useMutation} from 'react-query'
import LoadingPage from '../../loading/LoadingPage'
import ProgressBar from '../common/progressBar/ProgressBar'
import PracticeTopPanel from '../common/topPanel/PracticeTopPanel'
import styles from './FlipPractice.module.css'

function FlipPractice() {
	const router = useRouter()
	const [, setAllCards] = useAtom(cardsAtom)
	const [practice] = useAtom(practiceAtom)
	const [materialName, setMaterialName] = useState('')
	const [progress] = useAtom(currentProgressAtom)
	const handlePracticeStart = useAction(practiceActions.start)
	const onCardsLoaded = useCallback((cards: Array<Card>) => {
		setAllCards(cards)
		handlePracticeStart({cards})
	}, [handlePracticeStart, setAllCards])
	const isLoading = useLoadData(setMaterialName, onCardsLoaded)

	if (isLoading) {
		return <LoadingPage/>
	}

	return (
		<div className={styles.layout}>
			<PracticeTopPanel materialName={materialName} />
			<ProgressBar progress={progress} />
			{
				practice.status === 'in-progress' && <Practice/>
			}
			{
				practice.status === 'intermediate-result' && <IntermediateResult onExit={() => router.push('/home')}/>
			}
			{
				practice.status === 'result' && <TotalResult onExit={() => router.push('/home')}/>
			}
		</div>
	)
}

function useLoadData(onMaterialNameLoad: (name: string) => void, onCardsLoad: (cards: Array<Card>) => void) {
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

		onMaterialNameLoad(practiceData.materialName)
		onCardsLoad(practiceData.cards)
	}, [onCardsLoad, practiceData, onMaterialNameLoad, status])

	return isLoading
}

export {
	FlipPractice,
}