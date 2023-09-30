import './styles.css'
import {createCtx} from '@reatom/core'
import {reatomContext} from '@reatom/npm-react'
import {AppProps} from 'next/app'
import Head from 'next/head'
import {QueryClient, QueryClientProvider} from 'react-query'

const ctx = createCtx()
const queryClient = new QueryClient()

function LeardsApplication({Component, pageProps}: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<reatomContext.Provider value={ctx}>
				<Head>
					<title>Leards</title>
				</Head>
				<Component {...pageProps} />
			</reatomContext.Provider>
		</QueryClientProvider>
	)
}

export default LeardsApplication
