import {wrapApi} from './common/wrapApi'
import {AccountsApi} from './generated/api'
import {Configuration} from './generated/configuration'

export const AccountsAPI = wrapApi<AccountsApi>(() => {
	const config = new Configuration({
		basePath: 'http://localhost:8080/api/v1',
	})

	return new AccountsApi(config)
})
