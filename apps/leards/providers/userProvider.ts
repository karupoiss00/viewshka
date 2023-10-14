interface IUserProvider {
	getUserId(): string | null;

	setUserId(id: string): void;

	getEmail(): string | null;

	setEmail(email: string): void;

	getName(): string | null;

	setName(name: string): void;

	getAvatarUrl(): string | null;

	setAvatarUrl(avatarUrl: string): void;

	getRootFolderId(): string | null;

	setRootFolderId(id: string): void;
}

const USER_ID_KEY = 'uid'
const USER_EMAIL_KEY = 'ue'
const USER_AVATAR_URL_KEY = 'uau'
const USER_ROOT_FOLDER_ID_KEY = 'urfi'
const USER_NAME_KEY = 'un'

const UserProvider: IUserProvider = {
	getUserId: () => window.localStorage.getItem(USER_ID_KEY),
	setUserId: (id: string) => window.localStorage.setItem(USER_ID_KEY, id),
	getName: () => window.localStorage.getItem(USER_NAME_KEY),
	setName: (name: string) => window.localStorage.setItem(USER_NAME_KEY, name),
	getEmail: () => window.localStorage.getItem(USER_EMAIL_KEY),
	setEmail: (email: string) => window.localStorage.setItem(USER_EMAIL_KEY, email),
	getAvatarUrl: () => window.localStorage.getItem(USER_AVATAR_URL_KEY),
	setAvatarUrl: (avatarUrl: string) => window.localStorage.setItem(USER_AVATAR_URL_KEY, avatarUrl),
	getRootFolderId: () => window.localStorage.getItem(USER_ROOT_FOLDER_ID_KEY),
	setRootFolderId: (id: string) => window.localStorage.setItem(USER_ROOT_FOLDER_ID_KEY, id),
}

export type {
	IUserProvider,
}

export default UserProvider