
import {SpaceRepetition} from '@leards/components/screens/practice/space-repetition/SpaceRepetition'
import {withAuth} from '@leards/components/wrappers/withAuth'
import {withI18n} from '@leards/components/wrappers/withI18n'
import {withUser} from '@leards/components/wrappers/withUser'

export default withUser(withI18n(withAuth(SpaceRepetition)))