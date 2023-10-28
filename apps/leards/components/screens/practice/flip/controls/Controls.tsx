import {useMessages} from '@leards/i18n/hooks/useMessages'
import {Button} from '@viewshka/uikit'
import React from 'react'
import styles from './Controls.module.css'

type BottomPanelProps = {
	incrementProgress: () => void
}
function Controls({incrementProgress}: BottomPanelProps) {
	const getMessage = useMessages()
	return (
		<div className={styles.bottomPanel}>
			<Button className={styles.repeatButton} type={'primary'} size={'large'} onClick={incrementProgress}>
				<span>{getMessage('Practice.Flip.Button.Repeat')}</span>
			</Button>
			<Button className={styles.hardButton} type={'primary'} size={'large'} onClick={incrementProgress}>
				<span>{getMessage('Practice.Flip.Button.Hard')}</span>
			</Button>
			<Button className={styles.goodButton} type={'primary'} size={'large'} onClick={incrementProgress}>
				<span>{getMessage('Practice.Flip.Button.Good')}</span>
			</Button>
			<Button className={styles.easyButton} type={'primary'} size={'large'} onClick={incrementProgress}>
				<span>{getMessage('Practice.Flip.Button.Easy')}</span>
			</Button>
		</div>
	)
}

export default Controls