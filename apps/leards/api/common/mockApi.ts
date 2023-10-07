import {WrappedAPI} from '@leards/api/common/wrapApi'
import {BaseAPI} from '../generated/base'

export type MockedAPI<M, A extends BaseAPI> = WrappedAPI<A & M>;

export function mockAPI<M, A extends BaseAPI>(
	wrappedAPI: WrappedAPI<A>,
	mock: M,
): MockedAPI<M, A> {
	return {
		get: () => ({
			...mock,
			...wrappedAPI.get(),
		}),
	}
}
