import {DecksAPI} from '@leards/api/DecksAPI'
import {FoldersAPI} from '@leards/api/FoldersAPI'
import {Card} from '@leards/api/generated'
import {goToHome} from '@leards/components/screens/home/Home'
import {StorageType} from '@leards/components/screens/home/viewmodel/selection/Selection'
import {Practice} from '@leards/components/screens/practice/flip/practice/Practice'
import {IntermediateResult} from '@leards/components/screens/practice/flip/results/IntermediateResult'
import {TotalResult} from '@leards/components/screens/practice/flip/results/TotalResult'
import {cardsAtom} from '@leards/components/screens/practice/flip/viewmodel/cardsAtom'
import {
	currentProgressAtom,
	practiceActions,
	practiceAtom,
} from '@leards/components/screens/practice/flip/viewmodel/practiceAtom'
import {useCardsQuery} from '@leards/hooks/useCardsQuery'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAction, useAtom} from '@reatom/npm-react'
import {Button, SystemIconArrowLeft} from '@viewshka/uikit'
import Router, {useRouter} from 'next/router'
import React, {useCallback, useEffect, useState} from 'react'
import {useQuery} from 'react-query'
import LoadingPage from '../../loading/LoadingPage'
import ProgressBar from '../common/progressBar/ProgressBar'
import PracticeTopPanel from '../common/topPanel/PracticeTopPanel'
import styles from './FlipPractice.module.css'

function FlipPractice() {
	const router = useRouter()
	const getMessage = useMessages()
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

	const contentMap = {
		'start': null,
		'in-progress': <Practice/>,
		'intermediate-result': <IntermediateResult onExit={() => router.back()}/>,
		'result': <TotalResult onExit={() => router.back()}/>,
	}

	return (
		<div className={styles.layout}>
			<PracticeTopPanel materialName={materialName} />
			<ProgressBar progress={progress} />
			<div className={styles.content}>
				<Button type={'link'} size={'medium'} onClick={() => router.back()} className={styles.exit}>
					<div className={styles.exitContent}>
						<SystemIconArrowLeft/>
						{getMessage('Practice.Flip.Button.Exit')}
					</div>
				</Button>
				{contentMap[practice.status]}
			</div>
		</div>
	)
}

function useLoadData(onMaterialNameLoad: (name: string) => void, onCardsLoad: (cards: Array<Card>) => void) {
	const router = useRouter()
	const {slug} = router.query
	const storageType = slug[0] as StorageType
	const storageId = slug[1]

	const {cards, isLoading: isCardsLoading}
		= useCardsQuery(storageType, storageId)
	const {title, isLoading: isTitleLoading} = useTitleQuery(storageType, storageId)

	useEffect(() => {
		if (title) {
			onMaterialNameLoad(title)
		}
	}, [title, onMaterialNameLoad])

	useEffect(() => {
		if (!cards) {
			goToHome()
			return
		}

		if (cards.length) {
			onCardsLoad(cards)
		}
	}, [cards, onCardsLoad, router])

	return isTitleLoading || isCardsLoading
}

function useTitleQuery(storageType: string, storageId: string) {
	const [title, setTitle] = useState('')

	const {data, isSuccess, isLoading} = useQuery([
		'practice-title', storageType, storageId,
	], async () => {
		const storage = storageType === 'folder'
			? (await FoldersAPI.get().getFolderById(storageId)).data.folder
			: (await DecksAPI.get().getDeckById(storageId)).data.deck

		return storage.name
	}, {
		retry: false,
	})

	useEffect(() => {
		if (isSuccess) {
			setTitle(data)
		}
	}, [data, isSuccess])

	return {title, isLoading}
}

type FlipPracticePagePayload = {
	storageType: StorageType,
	storageId: string,
}
function goToFlipPractice({storageType, storageId}: FlipPracticePagePayload) {
	Router.push(`/practice/flip/${storageType}/${storageId || ''}`)
}

export {
	FlipPractice,
	goToFlipPractice,
}