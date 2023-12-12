import {useAtom} from '@reatom/npm-react'
import {getCssVariable} from '@viewshka/core'
import {NextComponentType} from 'next'
import React, {useEffect} from 'react'
import {settingsAtom} from '../common/viewmodel/settingsAtom'

const THEME_DATA_KEY = 'data-theme'
const THEME_META_ELEMENT_SELECTOR = 'meta[name="theme-color"]'

const withTheme = (Component: NextComponentType) => () => {
	const [settings] = useAtom(settingsAtom)

	useEffect(() => {
		const accentColor = getCssVariable('--accent-color')
		const themeMetaElement = document.querySelector(THEME_META_ELEMENT_SELECTOR)
		themeMetaElement?.setAttribute('content', accentColor)
		document.body.setAttribute(THEME_DATA_KEY, settings.theme)
	}, [settings])
	return <Component />
}

export {
	withTheme,
}