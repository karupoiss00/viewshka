import AuthProvider from './common/authProvider'
import {wrapApi} from './common/wrapApi'
import {AccountsApi} from './generated/api'
import {Configuration} from './generated/configuration'

export const AccountsAPI = wrapApi<AccountsApi>(() => {
	const baseAuth = AuthProvider.getBaseAuth()

	const config = new Configuration({
		// eslint-disable-next-line no-process-env
		basePath: process.env.NEXT_PUBLIC_API_URL,
		username: baseAuth.username,
		password: baseAuth.password,
	})

	return new AccountsApi(config)
})
