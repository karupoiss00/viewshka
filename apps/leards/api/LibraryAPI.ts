import {wrapApi} from '@leards/api/common/wrapApi'
import {
	Configuration, LibraryApi,
} from '@leards/api/generated'
import AuthProvider from '@leards/providers/authProvider'
import {mockAPI} from "@leards/api/common/mockApi";
import {BaseAPI} from "@leards/api/generated/base";

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

type DeckInfo = {
	id: string,
	name: string,
	type: 'deck',
}

type FavoriteStoragesResponse = {
	data: {
		favoriteStorages: DeckInfo[]
	}
}

type MockedLibraryApi = {
	getFavoriteStorages: (userId: string) => FavoriteStoragesResponse;
	addStorageToFavorite: (userId: string, storageType: 'deck' | 'folder', deckId: string) => FavoriteStoragesResponse
}

let counter = 0

const MOCKED_DECKS_TO_ADD: DeckInfo[] = [
	{
		id: 'ea859b2f-60a3-41e7-bc4a-bc396edb0429',
		name: 'мокнутая дека 2',
		type: 'deck',
	},
	{
		id: '6f3c62b7-d09d-4d52-916b-bfe667e72d92',
		name: 'мокнутая дека 3',
		type: 'deck',
	},
	{
		id: '6ebd4637-d370-4597-b43d-4b3bda4fd046',
		name: 'мокнутая дека 4',
		type: 'deck',
	},
	{
		id: '2316f527-54f8-48d1-869c-d0a0bf17e923',
		name: 'мокнутая дека 5',
		type: 'deck',
	},
]

const MOCKED_FAVORITES: DeckInfo[] = [
	{
		id: '159b1108-0d6b-48b0-b1d7-c325aa26401e',
		name: 'мокнутая дека 1',
		type: 'deck',
	},
]

export const LibraryAPI = mockAPI<MockedLibraryApi, BaseAPI>(wrappedApi, {
	getFavoriteStorages: () => ({
		data: {
			favoriteStorages: MOCKED_FAVORITES,
		},
	}),
	addStorageToFavorite: () => {
		MOCKED_FAVORITES.push(MOCKED_DECKS_TO_ADD[counter % MOCKED_DECKS_TO_ADD.length])
		counter++
		return {
			data: {
				favoriteStorages: MOCKED_FAVORITES,
			},
		}
	}
})