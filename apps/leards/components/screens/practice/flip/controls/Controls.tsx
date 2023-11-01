import {useMessages} from '@leards/i18n/hooks/useMessages'
import {Button} from '@viewshka/uikit'
import React from 'react'
import styles from './Controls.module.css'

type BottomPanelProps = {
	onRepeat: () => void
	onEasy: () => void
}
function Controls({onEasy, onRepeat}: BottomPanelProps) {
	const getMessage = useMessages()
	return (
		<div className={styles.controlsContainer}>
			<Button className={styles.repeatButton} type={'primary'} size={'large'} onClick={onRepeat}>
				<span>{getMessage('Practice.Flip.Button.Repeat')}</span>
			</Button>
			<Button className={styles.easyButton} type={'primary'} size={'large'} onClick={onEasy}>
				<span>{getMessage('Practice.Flip.Button.Easy')}</span>
			</Button>
		</div>
	)
}

export default Controls