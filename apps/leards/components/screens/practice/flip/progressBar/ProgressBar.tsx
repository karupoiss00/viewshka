import {useAtom} from '@reatom/npm-react'
import React from 'react'
import {cardsAtom} from '../viewmodel/cardsAtom'
import {progressAtom} from '../viewmodel/progressAtom'
import styles from './ProgressBar.module.css'

function ProgressBar() {
	const [cards] = useAtom(cardsAtom)
	const [progress] = useAtom(progressAtom)

	return (
		<div className={styles.container}>
			<div className={styles.progress} style={{
				width: `${100 * progress / cards.length}%`,
			}} />
		</div>
	)
}

export default ProgressBar