import {LeardsLogo} from '@leards/components/common/Logo'
import {goToAuth} from '@leards/components/screens/auth/Auth'
import {LandingButton} from '@leards/components/screens/landing/common/button/LandingButton'
import {Button} from '@viewshka/uikit'
import React from 'react'
import {Card} from '../../common/card/Card'
import styles from './Start.module.css'

function Start({onGoLearn}: {
	onGoLearn: () => void,
}) {
	return (
		<div className={styles.layout}>
			<div className={styles.cardsContainer}>
				<Card size="large" className={styles.learningCard}>
					Обучение
				</Card>
				<Card size="large" className={styles.wordCard}>
					Слово
				</Card>
				<Card size="large" className={styles.languageCard}>
					Иностарнный язык
				</Card>
				<Card size="large" className={styles.fastCard}>
					Быстрый
				</Card>
				<Card size="large" className={styles.logoCard}>
					<LeardsLogo className={styles.logo}/>
				</Card>
			</div>
			<div className={styles.buttonsContainer}>
				<LandingButton type="primary" size="large" onClick={onGoLearn}>
					<span className={styles.startButtonText}>
					Создай свою колоду
					</span>
				</LandingButton>
				<Button type="link" size="medium" onClick={goToAuth}>
					У меня есть аккаунт
				</Button>
			</div>
		</div>
	)
}

export default Start