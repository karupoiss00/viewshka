import {User} from '@leards/api/generated'
import UserProvider from '@leards/providers/userProvider'
import {action, atom} from '@reatom/core'
import {createUser, UserData} from './user/User'

const userAtom = atom<UserData>(null as UserData)

interface SetUserPayload {
	user: Omit<User, 'authToken'>
}
const set = action((ctx, {user}: SetUserPayload) => {
	userAtom(ctx, createUser({
		id: user.userId,
		name: user.name,
		email: user.email,
		avatarUrl: user.profileIcon,
		rootFolderId: user.rootFolderId,
	}))

	ctx.schedule(() => {
		UserProvider.setUserId(user.userId)
		UserProvider.setName(user.name)
		UserProvider.setEmail(user.email)
		UserProvider.setAvatarUrl(user.profileIcon)
		UserProvider.setRootFolderId(user.rootFolderId)
	})
})

const setAvatar = action((ctx, avatarUrl: string) => {
	const user = ctx.get(userAtom)
	userAtom(ctx, {
		...user,
		avatarUrl,
	})

	ctx.schedule(() => {
		UserProvider.setAvatarUrl(avatarUrl)
	})
})

const userActions = {
	set,
	setAvatar,
} as const

export {
	userAtom,
	userActions,
}
