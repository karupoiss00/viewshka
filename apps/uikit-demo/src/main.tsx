import {StrictMode} from 'react'
import * as ReactDOM from 'react-dom/client'
import Demo from './app/Demo'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)

root.render(
	<StrictMode>
		<Demo />
	</StrictMode>,
)
