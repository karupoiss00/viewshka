import {PopupLayer} from '@viewshka/uikit'
import Auth from '../components/screens/auth/Auth'
import {withI18n} from '../components/wrappers/withI18n'
import Home from './home'

export function Index() {
	return (
		<Auth />
	)
}

export default withI18n(Index)
