import {goToAuth} from '@leards/components/screens/auth/Auth'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {Button} from '@viewshka/uikit'
import React, {useState} from 'react'
import styles from './Landing.module.css'

function Landing() {
	const getMessage = useMessages()
	const [loading, setLoading] = useState(false)


	return (
		<div className={styles.layout}>
			<Button
				className={styles.button}
				type={'primary'}
				size={'large'}
				state={loading ? 'loading' : 'default'}
				onClick={() => {
					setLoading(true)
					setTimeout(() => goToAuth(), 500)
				}}
			>
				{getMessage('Landing.Button.Start')}
			</Button>
		</div>
	)
}

export default Landing