import Auth from '../components/screens/auth/Auth'
import {withI18n} from '../components/wrappers/withI18n'

export function Index() {
	return (
		<Auth />
	)
}

export default withI18n(Index)
