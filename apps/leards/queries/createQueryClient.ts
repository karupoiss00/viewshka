import {goToAuth} from '@leards/components/screens/auth/Auth'
import {MutationCache, QueryCache, QueryClient} from 'react-query'

const UNAUTHORIZED_CODE = 401

type ErrorWithResponse = {
	response?: {
		status?: number
	}
}


function createQueryClient() {
	const onError = (error: ErrorWithResponse) => {
		if (error.response?.status === UNAUTHORIZED_CODE) {
			goToAuth()
		}
	}

	const queryCache = new QueryCache({
		onError,
	})

	const mutationCache = new MutationCache({
		onError,
	})

	return new QueryClient({
		queryCache,
		mutationCache,
	})
}

export {
	createQueryClient,
}