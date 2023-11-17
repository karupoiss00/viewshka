import {mockAPI} from '@leards/api/common/mockApi'
import {wrapApi} from '@leards/api/common/wrapApi'
import {FoldersAPI} from '@leards/api/FoldersAPI'
import {
	Configuration,
	Content, Deck, Folder,
} from '@leards/api/generated'
import {BaseAPI} from '@leards/api/generated/base'
import AuthProvider from '@leards/providers/authProvider'

const wrappedApi = wrapApi<BaseAPI>(() => {
	const baseAuth = AuthProvider.getBaseAuth()
	const config = new Configuration({
		// eslint-disable-next-line no-process-env
		basePath: process.env.NEXT_PUBLIC_API_URL,
		username: baseAuth.username,
		password: baseAuth.password,
		baseOptions: {
			headers: {
				Authorization: `Bearer ${AuthProvider.getAuthToken()}`,
			},
		},
	})

	return new BaseAPI(config)
})

const SAVED_DECKS: Array<Content> = []

type MockLibraryApi = {
	getPopularStorage: (userId: string) => Promise<Folder>;
	getFavoriteStorages: (userId: string) => Promise<Folder>;
	addStorageToFavorite: (userId: string, storageId: string, storageType: 'deck' | 'folder') => Promise<Folder>
};

const MOCK_SAVED_DECKS_FOLDER_ID = '948ee479-4be9-4d9f-80da-62bd9a300c2b'
const MOCK_MOST_POPULAR_DECKS_FOLDER_ID = '0fd270b8-7f55-43aa-8638-b099b9d5d9b7'

const getFavoriteStorages = async (userId: string) => {
	const response = await FoldersAPI.get().getFolderById(MOCK_SAVED_DECKS_FOLDER_ID)
	response.data.folder.content.push(...SAVED_DECKS)
	return Promise.resolve(response.data.folder)
}

export const LibraryAPI = mockAPI<MockLibraryApi, BaseAPI>(wrappedApi, {
	getFavoriteStorages,
	getPopularStorage: async () => {
		const response = await FoldersAPI.get().getFolderById(MOCK_MOST_POPULAR_DECKS_FOLDER_ID)
		response.data.folder.content.push(...SAVED_DECKS)
		return Promise.resolve(response.data.folder)
	},
	addStorageToFavorite: async (userId: string, storageId: string, storageType: 'deck' | 'folder') => {
		SAVED_DECKS.push({
			id: storageId,
			name: 'favorite deck',
			type: storageType,
		})
		return getFavoriteStorages(userId)
	},
})
