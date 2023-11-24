import {i18n} from '@leards/i18n/i18n'
import IntlProvider from '@leards/i18n/IntlProvider'
import {useAtom} from '@reatom/npm-react'
import {NextComponentType} from 'next'
import {settingsAtom} from '../common/viewmodel/settingsAtom'

export const withI18n = (Component: NextComponentType) => () => {
	const [{locale}] = useAtom(settingsAtom)

	return (
		<IntlProvider locale={locale} messages={i18n[locale]}>
			<Component/>
		</IntlProvider>
	)
}