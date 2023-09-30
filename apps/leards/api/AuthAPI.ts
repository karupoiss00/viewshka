import AuthProvider from '../providers/authProvider'
import {wrapApi} from './common/wrapApi'
import {AuthApi} from './generated/api'
import {Configuration} from './generated/configuration'

export const AuthAPI = wrapApi<AuthApi>(() => {
	const baseAuth = AuthProvider.getBaseAuth()
	const config = new Configuration({
		// eslint-disable-next-line no-process-env
		basePath: process.env.NEXT_PUBLIC_API_URL,
		username: baseAuth.username,
		password: baseAuth.password,
		baseOptions: {
			headers: {
				crossOrigin: 'anonymous',
				Authorization: `Bearer ${AuthProvider.getAuthToken()}`,
			},
		},
	})

	return new AuthApi(config)
})
