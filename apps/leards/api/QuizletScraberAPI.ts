import {wrapApi} from '@leards/api/common/wrapApi'
import {Configuration} from '@leards/api/generated'
import {BaseAPI} from '@leards/api/generated/base'

const BASE_URL = 'https://leards.space/api/v1/quizlet-scraber/parsecards?'

type QuizletCards = {
	front: string
	back: string
}

type ImportCardsResponse = {
	cards: Array<QuizletCards>
}

class QuizletScraberApi extends BaseAPI {
	async importCards(quizletDeckUrl: string): Promise<ImportCardsResponse> {
		try {
			const response = await fetch(BASE_URL + new URLSearchParams({
				url: quizletDeckUrl,
			}))
			const data = await response.json() as ImportCardsResponse
			return data
		}
		catch {
			return {
				cards: [],
			}
		}
	}
}

export const QuizletScraberAPI = wrapApi<QuizletScraberApi>(() => {
	const config = new Configuration({
		// eslint-disable-next-line no-process-env
		basePath: process.env.NEXT_PUBLIC_API_URL,
	})

	return new QuizletScraberApi(config)
})
