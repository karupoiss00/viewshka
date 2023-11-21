import {i18n} from '@leards/i18n/i18n'
import IntlProvider from '@leards/i18n/IntlProvider'
import {useAtom} from '@reatom/npm-react'
import {NextComponentType} from 'next'
import {localeAtom} from '../common/viewmodel/localeAtom'

export const withI18n = (Component: NextComponentType) => () => {
	const [locale] = useAtom(localeAtom)

	return (
		<IntlProvider locale={locale} messages={i18n[locale]}>
			<Component/>
		</IntlProvider>
	)
}