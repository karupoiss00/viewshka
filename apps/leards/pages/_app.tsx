import {createCtx} from '@reatom/core'
import {reatomContext} from '@reatom/npm-react'
import {AppProps} from 'next/app'
import Head from 'next/head'
import {QueryClient, QueryClientProvider} from 'react-query'
import {useLocale} from '../i18n/hooks/useLocale'
import {i18n} from '../i18n/i18n'
import IntlProvider from '../i18n/IntlProvider'
import './styles.css'

const ctx = createCtx()
const queryClient = new QueryClient()

function LeardsApplication({Component, pageProps}: AppProps) {
	const locale = useLocale()

	return (
		<QueryClientProvider client={queryClient}>
			<IntlProvider locale={locale} messages={i18n[locale]}>
				<reatomContext.Provider value={ctx}>
					<Head>
						<title>Leards</title>
					</Head>
					<Component {...pageProps} />
				</reatomContext.Provider>
			</IntlProvider>
		</QueryClientProvider>
	)
}

export default LeardsApplication
