import {useAtom} from '@reatom/npm-react'
import {NextComponentType} from 'next'
import React, {useEffect} from 'react'
import {settingsAtom} from '../common/viewmodel/settingsAtom'

const THEME_DATA_KEY = 'data-theme'

const withTheme = (Component: NextComponentType) => () => {
	const [settings] = useAtom(settingsAtom)

	useEffect(() => {
		document.body.setAttribute(THEME_DATA_KEY, settings.theme)
	}, [settings])
	return <Component />
}

export {
	withTheme,
}