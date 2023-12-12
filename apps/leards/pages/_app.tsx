import {createCtx} from '@reatom/core'
import {reatomContext} from '@reatom/npm-react'
import {PopoverLayer, PopupLayer} from '@viewshka/uikit'
import {AppProps} from 'next/app'
import Head from 'next/head'
import {QueryClientProvider} from 'react-query'
import {createQueryClient} from '../queries/createQueryClient'
import './styles.css'

const ctx = createCtx()
const queryClient = createQueryClient()

function LeardsApplication({Component, pageProps}: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<reatomContext.Provider value={ctx}>
				<Head>
					<title>Leards</title>
					<link rel="icon" href="/favicon.png" sizes="any"/>
					<meta name="theme-color" content="#95D17F"/>
				</Head>
				<Component {...pageProps}/>
				<PopupLayer/>
				<PopoverLayer/>
			</reatomContext.Provider>
		</QueryClientProvider>
	)
}

export default LeardsApplication
