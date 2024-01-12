import classnames from 'classnames'
import {useCallback, useState} from 'react'
import styles from './Switcher.module.css'

type SwitcherProps = {
	onClick: (value: boolean) => void
	initialValue?: boolean
}

function Switcher({onClick, initialValue = false}: SwitcherProps) {
	const [switchState, setSwitchState] = useState(initialValue)

	const onSwitch = useCallback(() => {
		onClick(!switchState)
		setSwitchState(!switchState)
	}, [onClick, switchState])

	const switcherClassName = classnames(styles['switcher'], {
		[styles['switcher--off']]: !switchState,
		[styles['switcher--on']]: switchState,
	})

	return (
		<div className={styles['switcher-container']} onClick={onSwitch}>
			<div className={switcherClassName}/>
		</div>
	)
}

export {
	Switcher,
}
