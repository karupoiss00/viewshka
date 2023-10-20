import {DEFAULT_LOCALE, isLocale, Locale} from '@leards/providers/localeProvider'

type UserData = {
	id: string
	name: string
	email: string
	avatarUrl: string
	rootFolderId: string
	settings: UserSettings
}

type UserSettings = {
	locale: Locale
}

interface CreateUserPayload {
	id: string
	name: string
	email: string
	avatarUrl: string
	rootFolderId: string
	locale: string
}
function createUser({
	id,
	name,
	email,
	avatarUrl,
	rootFolderId,
	locale,
}: CreateUserPayload): UserData {
	return {
		id,
		name,
		email,
		avatarUrl,
		rootFolderId,
		settings: {
			locale: isLocale(locale) ? locale : DEFAULT_LOCALE,
		},
	}
}

export type {
	UserData,
}

export {
	createUser,
}