import {userAtom} from '@leards/components/common/viewmodel/userAtom'
import {useAtom} from '@reatom/npm-react'
import {isUndefined} from '@viewshka/core'
import {Avatar} from '@viewshka/uikit'
import React from 'react'
import {ProfilePopupState} from '../UserProfile'
import styles from './PersonInfo.module.css'

type PersonInfoProps = {
	currentProfileState: ProfilePopupState
}

function PersonInfo({currentProfileState}: PersonInfoProps) {
	const [user] = useAtom(userAtom)

	if (currentProfileState === 'settings') {
		return (
			<div className={styles['person-info']}>
				<div title={user.email} className={styles['person-info-email']}>
					{user.email}
				</div>
				{
					isUndefined(user.avatarUrl) || !user.avatarUrl
						? <Avatar size="small" type="gradient" name={user.name}/>
						: <Avatar size="small" type="image" avatarUrl={user.avatarUrl}/>
				}
			</div>
		)
	}
}

export type {
	PersonInfoProps,
}

export {
	PersonInfo,
}