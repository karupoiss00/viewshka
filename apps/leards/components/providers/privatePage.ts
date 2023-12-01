import {withAuth} from '@leards/components/providers/withAuth'
import {withI18n} from '@leards/components/providers/withI18n'
import {withSettings} from '@leards/components/providers/withSettings'
import {withTheme} from '@leards/components/providers/withTheme'
import {withUser} from '@leards/components/providers/withUser'
import {NextComponentType} from 'next'

const privatePage = (Component: NextComponentType) => withUser(withAuth(withSettings(withTheme(withI18n(Component)))))

export {
	privatePage,
}