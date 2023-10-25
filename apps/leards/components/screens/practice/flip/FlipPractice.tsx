import {CardsAPI} from '@leards/api/CardsAPI'
import {useAtom} from '@reatom/npm-react'
import React, {useEffect} from 'react'
import {useQuery} from 'react-query'
import CommonTopPanel from '../../../common/topPanel/TopPanel'
import LoadingPage from '../../loading/LoadingPage'
import BottomPanel from './bottomPanel/BottomPanel'
import FlipCards from './flipCards/FlipCards'
import styles from './FlipPractice.module.css'
import ProgressBar from './progressBar/ProgressBar'
import {cardsAtom} from './viewmodel/cardsAtom'
import {materialNameAtom} from './viewmodel/materialNameAtom'

function FlipPractice() {
	const [materialName] = useAtom(materialNameAtom)
	const isLoading = usePracticeInit()

	if (isLoading) {
		return <LoadingPage/>
	}

	return (
		<div className={styles.layout}>
			<CommonTopPanel className={styles.topPanel}>
				<p className={styles.materialNameHeader}>{materialName}</p>
			</CommonTopPanel>
			<ProgressBar/>
			<div className={styles.cardsContainer}>
				<FlipCards/>
			</div>
			<BottomPanel/>
		</div>
	)
}

function usePracticeInit() {
	const [, handleSetMaterialName] = useAtom(materialNameAtom)
	const [, handleSetCardsAtom] = useAtom(cardsAtom)
	const {data: practiceData, status, isLoading} = useQuery('cards', async () => {
		const response = await CardsAPI.get().getFlipPracticeData()

		return response.data
	})

	useEffect(() => {
		if (status !== 'success') {
			return
		}

		handleSetMaterialName(practiceData.materialName)
		handleSetCardsAtom(practiceData.cards)
	}, [handleSetCardsAtom, handleSetMaterialName, practiceData, status])

	return isLoading
}

export default FlipPractice