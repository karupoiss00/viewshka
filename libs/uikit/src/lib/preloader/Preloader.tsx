import {useIntersectionObserver} from '@viewshka/core'
import {PropsWithClassname} from '@viewshka/uikit'
import classnames from 'classnames'
import React, {forwardRef, useRef} from 'react'
import styles from './Preloader.module.css'

function Preloader() {
	return (
		<div className={styles['preloader']}/>
	)
}

const PreloaderContainer = forwardRef<HTMLDivElement, PropsWithClassname>(({className}: PropsWithClassname, ref) => (
	<div className={classnames(styles['container'], className)} ref={ref}>
		<Preloader/>
	</div>
))

type ReachablePreloaderContainerProps = PropsWithClassname & {
	onPreloaderReached: () => void
}
function ReachablePreloaderContainer({className, onPreloaderReached}: ReachablePreloaderContainerProps) {
	const ref = useRef<HTMLDivElement>(null)

	useIntersectionObserver({
		ref,
		onIntersect: onPreloaderReached,
	})

	return (
		<PreloaderContainer className={className} ref={ref}/>
	)
}

export {
	Preloader,
	PreloaderContainer,
	ReachablePreloaderContainer,
}