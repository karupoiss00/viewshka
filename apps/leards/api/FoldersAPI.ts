import {wrapApi} from '@leards/api/common/wrapApi'
import {
	Configuration,
	FoldersApi,
} from '@leards/api/generated'
import AuthProvider from '@leards/providers/authProvider'

export const FoldersAPI = wrapApi<FoldersApi>(() => {
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

