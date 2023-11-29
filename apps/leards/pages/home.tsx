import {withAuth} from '@leards/components/providers/withAuth'
import {withI18n} from '@leards/components/providers/withI18n'
import {withSettings} from '@leards/components/providers/withSettings'
import {withUser} from '@leards/components/providers/withUser'
import {Home} from '../components/screens/home/Home'

export default withUser(withAuth(withSettings(withI18n(Home))))
