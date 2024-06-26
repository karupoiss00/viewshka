import {FlipCard, FlipCardActiveSide} from '@leards/components/screens/practice/common/flipCards/flipCard/FlipCard'
import {repetitionStateAtom} from '@leards/components/screens/practice/space-repetition/viewmodel/repetitionStateAtom'
import {useAtom} from '@reatom/npm-react'
import {addHookDeps} from '@viewshka/core'
import React, {useEffect, useState} from 'react'
import Controls from '../../controls/Controls'

function CardScreen() {
	const [repetition] = useAtom(repetitionStateAtom)
	const [activeSide, setActiveSide] = useState<FlipCardActiveSide>('front')

	useEffect(() => {
		setActiveSide('front')
		addHookDeps(repetition)
	}, [repetition])

	if (repetition.state !== 'in-progress') {
		return null
	}

	const card = repetition.card

	return (
		<div>
			<FlipCard
				activeSide={activeSide}
				setActiveSide={setActiveSide}
				frontSideText={card.frontSide}
				backSideText={card.backSide}
			/>
			<Controls cardId={card.cardId}/>
		</div>
	)
}

export {
	CardScreen,
}