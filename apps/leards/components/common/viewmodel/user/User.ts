type UserData = {
	id: string
	name: string
	email: string
	avatarUrl: string
	rootFolderId: string
}

interface CreateUserPayload {
	id: string
	name: string
	email: string
	avatarUrl: string
	rootFolderId: string
}
function createUser({
	id,
	name,
	email,
	avatarUrl,
	rootFolderId,
}: CreateUserPayload): UserData {
	return {
		id,
		name,
		email,
		avatarUrl,
		rootFolderId,
	}
}

export type {
	UserData,
}

export {
	createUser,
}