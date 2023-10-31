import {CardsAPI} from '@leards/api/CardsAPI'
import {useAtom} from '@reatom/npm-react'
import React, {useCallback, useEffect, useState} from 'react'
import {useQuery} from 'react-query'
import CommonTopPanel from '../../../common/topPanel/TopPanel'
import LoadingPage from '../../loading/LoadingPage'
import FlipCardsStack from '../common/flipCards/FlipCardsStack'
import ProgressBar from '../common/progressBar/ProgressBar'
import PracticeTopPanel from '../common/topPanel/PracticeTopPanel'
import Controls from './controls/Controls'
import styles from './FlipPractice.module.css'
import {cardsAtom} from './viewmodel/cardsAtom'

function FlipPractice() {
	const [cards] = useAtom(cardsAtom)
	const [materialName, setMaterialName] = useState('')
	const [progress, setProgress] = useState(0)
	const isLoading = usePracticeInit(setMaterialName)

	const cardsLeft = cards.length - progress
	const currentCard = cards[progress]


	const incrementProgress = useCallback(() => {
		if (progress + 1 >= cards.length) {
			setProgress(0)
			return
		}
		setProgress(progress + 1)
	}, [cards, progress])

	if (isLoading || !currentCard) {
		return <LoadingPage/>
	}

	return (
		<div className={styles.layout}>
			<PracticeTopPanel materialName={materialName} />
			<ProgressBar progress={progress} maxProgress={cards.length}/>
			<div className={styles.cardsContainer}>
				<FlipCardsStack topCard={currentCard} cardsLeft={cardsLeft}/>
			</div>
			<Controls incrementProgress={incrementProgress} currentCardId={currentCard.id}/>
		</div>
	)
}

function usePracticeInit(setMaterialName: React.Dispatch<React.SetStateAction<string>>) {
	const [, handleSetCardsAtom] = useAtom(cardsAtom)
	const {data: practiceData, status, isLoading} = useQuery('cards', async () => {
		const response = await CardsAPI.get().getFlipPracticeData()

		return response.data
	})

	useEffect(() => {
		if (status !== 'success') {
			return
		}

		setMaterialName(practiceData.materialName)
		handleSetCardsAtom(practiceData.cards)
	}, [handleSetCardsAtom, practiceData, setMaterialName, status])

	return isLoading
}

export default FlipPractice