import {Card} from '@leards/api/generated'
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
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAction, useAtom} from '@reatom/npm-react'
import {Button, SystemIconArrowLeft} from '@viewshka/uikit'
import Router, {useRouter} from 'next/router'
import React, {useCallback, useState} from 'react'
import LoadingPage from '../../loading/LoadingPage'
import ProgressBar from '../common/progressBar/ProgressBar'
import PracticeTopPanel from '../common/topPanel/PracticeTopPanel'
import styles from './FlipPractice.module.css'

type NameLoadedHandler = (name: string) => void
type CardsLoadedHandler = (cards: Array<Card>) => void

type FlipPracticeProps = {
	loadCards: (onNameLoaded: NameLoadedHandler, onCardsLoaded: CardsLoadedHandler) => boolean
}

function FlipPractice({loadCards}: FlipPracticeProps) {
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
	const isLoading = loadCards(setMaterialName, onCardsLoaded)

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