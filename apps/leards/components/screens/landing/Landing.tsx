import {Advantages} from '@leards/components/screens/landing/screens/advantages/Advantages'
import {Learning} from '@leards/components/screens/landing/screens/learning/Learning'
import {SignUp} from '@leards/components/screens/landing/screens/signup/SignUp'
import Start from '@leards/components/screens/landing/screens/start/Start'
import Router from 'next/router'
import React, {useRef} from 'react'
import styles from './Landing.module.css'

function Landing() {
	const learningBlockRef = useRef<HTMLDivElement>(null)
	const onGoLearn = () => {
		learningBlockRef.current?.scrollIntoView({
			behavior: 'smooth',
		})
	}

	return (
		<div className={styles.layout} data-theme="landing">
			<div className={styles.background}></div>
			<Start onGoLearn={onGoLearn}/>
			<Advantages/>
			<Learning ref={learningBlockRef}/>
			<SignUp/>
		</div>
	)
}

function goToLanding() {
	Router.push('/')
}

export {
	Landing,
	goToLanding,
}