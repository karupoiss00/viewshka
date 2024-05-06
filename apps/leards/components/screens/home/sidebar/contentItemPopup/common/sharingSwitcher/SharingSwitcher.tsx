import {useMessages} from '@leards/i18n/hooks/useMessages'
import {Checkbox, PropsWithClassname, Switcher} from '@viewshka/uikit'
import classnames from 'classnames'
import React from 'react'
import styles from './SharingSwitcher.module.css'

type SharingSwitcherProps = PropsWithClassname & {
	initialValue: boolean
	onChange: (value: boolean) => void
}
function SharingSwitcher({className, initialValue, onChange}: SharingSwitcherProps) {
	const getMessage = useMessages()

	return (
		<div className={classnames(styles.container, className)}>
			<div className={styles.description}>
				<div className={styles.mainText}>
					{getMessage('ContentSettingsPopup.Material.Share')}
				</div>
				<div className={styles.subText}>
					{getMessage('ContentSettingsPopup.Material.Share.Description')}
				</div>
			</div>
			<Switcher initialValue={initialValue} onClick={onChange}/>
		</div>
	)
}

export {
	SharingSwitcher,
}