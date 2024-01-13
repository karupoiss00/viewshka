import {SpaceRepetitionAPI} from '@leards/api/SpaceRepetitionAPI'
import {userAtom} from '@leards/components/common/viewmodel/userAtom'
import {StorageType} from '@leards/components/screens/home/viewmodel/selection/Selection'
import {Practice} from '@leards/components/screens/practice/flip/practice/Practice'
import {IntermediateResult} from '@leards/components/screens/practice/flip/results/IntermediateResult'
import {TotalResult} from '@leards/components/screens/practice/flip/results/TotalResult'
import Controls from '@leards/components/screens/practice/space-repetition/controls/Controls'
import {useStorageParams} from '@leards/components/screens/practice/space-repetition/hooks/useStorageParams'
import {FinishScreen} from '@leards/components/screens/practice/space-repetition/states/finish/FinishScreen'
import {CardScreen} from '@leards/components/screens/practice/space-repetition/states/inProgress/CardScreen'
import {StartScreen} from '@leards/components/screens/practice/space-repetition/states/start/StartScreen'
import {
	repetitionActions,
	repetitionStateAtom,
} from '@leards/components/screens/practice/space-repetition/viewmodel/repetitionStateAtom'
import {useStorageNameQuery} from '@leards/hooks/useStorageNameQuery'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAction, useAtom} from '@reatom/npm-react'
import {Button, SystemIconArrowLeft} from '@viewshka/uikit'
import Router, {useRouter} from 'next/router'
import React, {useEffect} from 'react'
import {useQuery} from 'react-query'
import LoadingPage from '../../loading/LoadingPage'
import PracticeTopPanel from '../common/topPanel/PracticeTopPanel'
import styles from './SpaceRepetition.module.css'

function SpaceRepetition() {
	const [repetition] = useAtom(repetitionStateAtom)
	const {isLoading, title, firstCard} = useStartupData()

	if (isLoading) {
		return <LoadingPage/>
	}

	const contentMap = {
		'start': <StartScreen firstCard={firstCard}/>,
		'in-progress': <CardScreen/>,
		'finished': <FinishScreen/>,
	}

	return (
		<div className={styles.layout}>
			<PracticeTopPanel materialName={title} />
			<div className={styles.cardsContainer}>
				<ExitButton/>
				{contentMap[repetition.state]}
			</div>
		</div>
	)
}

function ExitButton() {
	const router = useRouter()
	const getMessage = useMessages()

	return (
		<Button type="link" size="medium" onClick={() => router.back()} className={styles.exit}>
			<div className={styles.exitContent}>
				<SystemIconArrowLeft/>
				{getMessage('Practice.Flip.Button.Exit')}
			</div>
		</Button>
	)
}

function useStartupData() {
	const {storageType, storageId} = useStorageParams()
	const [user] = useAtom(userAtom)

	const handleFinishSpaceRepetition = useAction(repetitionActions.finishRepetition)
	const {name: title, isLoading: nameLoading} = useStorageNameQuery(storageType, storageId)
	const {data: firstCard, status, isLoading: firstCardLoading} = useQuery('space-repetition-init', async () => {
		const response = await SpaceRepetitionAPI.get().getNextCard(
			user.id,
			storageType,
			storageId,
		)

		return response.data.card
	},
	)

	useEffect(() => {
		if (status !== 'success') {
			return
		}
		if (!firstCard) {
			handleFinishSpaceRepetition()
		}
	}, [handleFinishSpaceRepetition, firstCard, status])

	return {
		isLoading: nameLoading || firstCardLoading,
		title,
		firstCard,
	}
}

type SpaceRepetitionPagePayload = {
	storageType: StorageType,
	storageId: string,
}
function goToSpaceRepetition({storageType, storageId}: SpaceRepetitionPagePayload) {
	Router.push(`/practice/spacerepetition/${storageType}/${storageId || ''}`)
}

export {
	SpaceRepetition,
	goToSpaceRepetition,
}