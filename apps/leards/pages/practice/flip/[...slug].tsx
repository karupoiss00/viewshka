import FlipPractice from '../../../components/screens/practice/flip/FlipPractice'
import {withAuth} from '../../../components/wrappers/withAuth'
import {withI18n} from '../../../components/wrappers/withI18n'
import {withUser} from '../../../components/wrappers/withUser'

export default withUser(withI18n(withAuth(FlipPractice)))