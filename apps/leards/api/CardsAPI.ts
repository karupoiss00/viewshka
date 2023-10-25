import {mockAPI} from '@leards/api/common/mockApi'
import {wrapApi} from '@leards/api/common/wrapApi'
import {DecksAPI} from '@leards/api/DecksAPI'
import {CardsApi, Configuration} from '@leards/api/generated'
import AuthProvider from '@leards/providers/authProvider'

function timeout(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

export const CardsAPI = mockAPI(wrapApi<CardsApi>(() => {
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

	return new CardsApi(config)
}), {
	getFlipPracticeData: async () => {
		const cardsResponse = await CardsAPI.get().getCardsByDeckId('f5b3ad07-b5f6-4325-a3c1-8eccc6bd27c0', 'dad3f688-1474-4fd1-a0bb-7248122d6011')
		const deckResponse = await DecksAPI.get().getDeckById('f5b3ad07-b5f6-4325-a3c1-8eccc6bd27c0', 'dad3f688-1474-4fd1-a0bb-7248122d6011')
		await timeout(3000)

		return Promise.resolve({
			data: {
				materialName: deckResponse.data.deck.name,
				cards: cardsResponse.data.cards,
			},
		})
	},
})