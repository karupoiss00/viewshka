import {withAuth} from '@leards/components/providers/withAuth'
import {withI18n} from '@leards/components/providers/withI18n'
import {withUser} from '@leards/components/providers/withUser'
import {FlipPractice} from '@leards/components/screens/practice/flip/FlipPractice'

export default withUser(withI18n(withAuth(FlipPractice)))