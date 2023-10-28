import {CardsAPI} from '@leards/api/CardsAPI'
import {useAtom} from '@reatom/npm-react'
import React, {useCallback, useEffect, useState} from 'react'
import {useQuery} from 'react-query'
import CommonTopPanel from '../../../common/topPanel/TopPanel'
import LoadingPage from '../../loading/LoadingPage'
import Controls from './controls/Controls'
import FlipCards from './flipCards/FlipCards'
import styles from './FlipPractice.module.css'
import ProgressBar from './progressBar/ProgressBar'
import {cardsAtom} from './viewmodel/cardsAtom'

function FlipPractice() {
	const [cards] = useAtom(cardsAtom)
	const [materialName, setMaterialName] = useState('')
	const [progress, setProgress] = useState(0)
	const isLoading = usePracticeInit(setMaterialName)

	const incrementProgress = useCallback(() => {
		if (progress + 1 > cards.length) {
			setProgress(0)
			return
		}
		setProgress(progress + 1)
	}, [cards, progress])

	if (isLoading) {
		return <LoadingPage/>
	}

	return (
		<div className={styles.layout}>
			<CommonTopPanel className={styles.topPanel}>
				<p className={styles.materialNameHeader}>{materialName}</p>
			</CommonTopPanel>
			<ProgressBar progress={progress} maxProgress={cards.length}/>
			<div className={styles.cardsContainer}>
				<FlipCards currentCardIndex={progress}/>
			</div>
			<Controls incrementProgress={incrementProgress}/>
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