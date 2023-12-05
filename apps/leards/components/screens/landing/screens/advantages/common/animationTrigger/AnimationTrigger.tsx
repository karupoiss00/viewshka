import React, {forwardRef} from 'react'
import styles from './AnimationTrigger.module.css'

const AnimationTrigger = forwardRef<HTMLDivElement>(
	(_, ref) => <div className={styles.animationTriggerContainer} ref={ref}/>,
)

export {
	AnimationTrigger,
}