import {useAtom} from '@reatom/npm-react'
import {isUndefined} from '@viewshka/core'
import {Avatar} from '@viewshka/uikit'
import React from 'react'
import {userAtom} from '../../../common/viewmodel/userAtom'
import styles from './PersonInfo.module.css'
import {ProfilePopupState} from './UserProfile'

type PersonInfoProps = {
	currentProfileState: ProfilePopupState
}

function PersonInfo({currentProfileState}: PersonInfoProps) {
	const [user] = useAtom(userAtom)

	if (currentProfileState === 'settings') {
		return (
			<div className={styles['person-info']}>
				{
					isUndefined(user.avatarUrl) || !user.avatarUrl
						? <Avatar size={'small'} type={'gradient'} name={user.name}/>
						: <Avatar size={'small'} type={'image'} avatarUrl={user.avatarUrl}/>
				}
				<div>
					{user.email}
				</div>
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