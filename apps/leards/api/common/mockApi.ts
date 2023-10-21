import {WrappedAPI} from '@leards/api/common/wrapApi'
import {BaseAPI} from '../generated/base'

export type MockedAPI<M, A extends BaseAPI> = WrappedAPI<A & M>;

export function mockAPI<M, A extends BaseAPI>(
	wrappedAPI: WrappedAPI<A>,
	mock: M,
): MockedAPI<M, A> {
	return {
		get: () => {
			const api = wrappedAPI.get()

			Object.keys(mock).forEach(key => {
				api[key] = mock[key]
			})

			return api as (A & M)
		},
	}
}
