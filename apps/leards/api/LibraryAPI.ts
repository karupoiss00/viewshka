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
	getMostPopularDecks: (userId: string) => Promise<Folder>;
	getSavedDecks: (userId: string) => Promise<Folder>;
	saveDeck: (userId: string, deck: Deck) => Promise<Folder>
};

const MOCK_SAVED_DECKS_FOLDER_ID = '948ee479-4be9-4d9f-80da-62bd9a300c2b'
const MOCK_MOST_POPULAR_DECKS_FOLDER_ID = '0fd270b8-7f55-43aa-8638-b099b9d5d9b7'

const getSavedDecks = async (userId: string) => {
	const response = await FoldersAPI.get().foldersIdGet(MOCK_SAVED_DECKS_FOLDER_ID)
	response.data.folder.content.push(...SAVED_DECKS)
	return response.data
}

export const LibraryAPI = mockAPI<MockLibraryApi, BaseAPI>(wrappedApi, {
	getSavedDecks,
	getMostPopularDecks: async () => {
		const response = await FoldersAPI.get().foldersIdGet(MOCK_MOST_POPULAR_DECKS_FOLDER_ID)
		response.data.folder.push(...SAVED_DECKS)
		return response.data
	},
	saveDeck: async (userId: string, deck: Deck) => {
		SAVED_DECKS.push({
			id: deck.deckId,
			name: deck.name,
			type: 'deck',
		})
		return getSavedDecks(userId)
	},
})
