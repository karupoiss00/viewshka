import {withI18n} from '@leards/components/providers/withI18n'
import {Auth} from '../components/screens/auth/Auth'

export function Index() {
	return (
		<Auth />
	)
}

export default withI18n(Index)
