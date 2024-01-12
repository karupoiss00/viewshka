import {mockAPI} from '@leards/api/common/mockApi'
import {Configuration} from '@leards/api/generated'
import {BaseAPI} from '@leards/api/generated/base'
import AuthProvider from '../providers/authProvider'
import {wrapApi} from './common/wrapApi'

const wrappedAPI = wrapApi<BaseAPI>(() => {
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

type AnswerType = 'repeat' | 'hard' | 'good' | 'easy'

const cards = [
	{
		id: 'uniqueId1',
		frontSide: 'grace',
		backSide: 'благодать',
	},
	{
		id: 'uniqueId2',
		frontSide: 'happiness',
		backSide: 'счастье',
	},
	{
		id: 'uniqueId3',
		frontSide: 'discord',
		backSide: 'разлад',
	},
	{
		id: 'uniqueId4',
		frontSide: 'beautiful',
		backSide: 'прекрасны',
	},
	null,
]

const SpaceRepetitionAPI = mockAPI(wrappedAPI, {
	getNextCard: (userId: string, storageType: string, storageId: string) => Promise.resolve({
		data: {
			card: cards[Math.floor(Math.random() * cards.length)],
		},
	}),

	answerCard: (userId: string, cardId: string, answer: AnswerType) => Promise.resolve({
		status: 200,
	}),
})

export {
	SpaceRepetitionAPI,
	type AnswerType,
}