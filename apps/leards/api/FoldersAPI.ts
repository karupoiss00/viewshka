import {mockAPI} from '@leards/api/common/mockApi'
import {wrapApi, WrappedAPI} from '@leards/api/common/wrapApi'
import {
	Configuration,
	FoldersApi,
	HttputilsFolderResponse,
} from '@leards/api/generated'
import AuthProvider from '@leards/providers/authProvider'

const wrappedApi = wrapApi<FoldersApi>(() => {
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

	return new FoldersApi(config)
})

type MockFolderApi = {
	rootFolderGet: (userId: string) => Promise<HttputilsFolderResponse>;
};

export const FoldersAPI = mockAPI<MockFolderApi, FoldersApi>(wrappedApi, {
	rootFolderGet: async (userId: string) => {
		const response = await FoldersAPI.get().foldersIdGet('f5b3ad07-b5f6-4325-a3c1-8eccc6bd27c0')
		return response.data
	},
})
