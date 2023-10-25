import {useAtom} from '@reatom/npm-react'
import {Button} from '@viewshka/uikit'
import React, {useCallback} from 'react'
import {cardsAtom} from '../viewmodel/cardsAtom'
import {progressAtom} from '../viewmodel/progressAtom'
import styles from './BottomPanel.module.css'

function BottomPanel() {
	const [progress, handleSetProgress] = useAtom(progressAtom)
	const [cards] = useAtom(cardsAtom)

	const setProgress = useCallback(() => {
		if (progress + 1 >= cards.length) {
			handleSetProgress(0)
			return
		}

		handleSetProgress(progress + 1)
	}, [cards, handleSetProgress, progress])

	return (
		<div className={styles.bottomPanel}>
			<Button type={'secondary'} size={'small'} onClick={setProgress}>
				<span>Next</span>
			</Button>
		</div>
	)
}

export default BottomPanel