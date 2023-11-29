import {User} from '@leards/api/generated'
import {goToAuth} from '@leards/components/screens/auth/Auth'
import UserProvider, {IUserProvider} from '@leards/providers/userProvider'
import {useAction} from '@reatom/npm-react'
import {useLayoutEffect} from '@viewshka/core'
import {NextComponentType} from 'next'
import React, {useState} from 'react'
import {userActions} from '../common/viewmodel/userAtom'
import LoadingPage from '../screens/loading/LoadingPage'

const withUser = (Component: NextComponentType) => () => {
	const [userLoaded, setUserLoaded] = useState(false)
	const handleSetUserAction = useAction(userActions.set)

	useLayoutEffect(() => {
		const user = loadLocalUserData(UserProvider)
		if (user) {
			handleSetUserAction({user})
			setUserLoaded(true)
		}
		else {
			goToAuth()
		}
	}, [handleSetUserAction])

	if (!userLoaded) {
		return <LoadingPage/>
	}

	return <Component/>
}

function loadLocalUserData(provider: IUserProvider): Omit<User, 'authToken'> | null {
	const userId = provider.getUserId()
	const email = provider.getEmail()
	const profileIcon = provider.getAvatarUrl()
	const rootFolderId = provider.getRootFolderId()
	const name = provider.getName()

	if (!email || !userId || !profileIcon || !rootFolderId || !name) {
		return null
	}

	return {
		userId,
		profileIcon,
		rootFolderId,
		name,
		email,
	}
}

export {
	withUser,
}