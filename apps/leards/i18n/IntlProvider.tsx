import {PropsWithChildren} from 'react'
import {IntlProvider as IncompatibleIntlProvider} from 'react-intl'
import {IntlConfig} from 'react-intl/src/types'

function IntlProvider(props: PropsWithChildren<IntlConfig>): JSX.Element {
	return (
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		<IncompatibleIntlProvider {...props} />
	)
}
export default IntlProvider