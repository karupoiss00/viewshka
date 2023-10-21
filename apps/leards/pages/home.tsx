import Home from '../components/screens/home/Home'
import {withAuth} from '../components/wrappers/withAuth'
import {withI18n} from '../components/wrappers/withI18n'
import {withLocalUser} from '../components/wrappers/withLocalUser'

export default withLocalUser(withI18n(withAuth(Home)))
