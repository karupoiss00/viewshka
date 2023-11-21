import {withAuth} from '@leards/components/providers/withAuth'
import {withI18n} from '@leards/components/providers/withI18n'
import {withUser} from '@leards/components/providers/withUser'
import Home from '../components/screens/home/Home'

export default withUser(withI18n(withAuth(Home)))
