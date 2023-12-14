import {Configuration, SharingApi} from '@leards/api/generated'
import AuthProvider from '../providers/authProvider'
import {wrapApi} from './common/wrapApi'

export const SharingAPI = wrapApi<SharingApi>(() => {
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

	return new SharingApi(config)
})
