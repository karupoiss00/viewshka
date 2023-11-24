import Home from '../components/screens/home/Home'
import {withAuth} from '../components/wrappers/withAuth'
import {withI18n} from '../components/wrappers/withI18n'
import {withSettings} from '../components/wrappers/withSettings'
import {withUser} from '../components/wrappers/withUser'

export default withUser(withAuth(withSettings(withI18n(Home))))
