import {useEffect, useState} from 'react'
import {DEFAULT_LOCALE, LocaleProvider} from '../../providers/localeProvider'

function useLocale() {
	const [locale, setLocale] = useState(DEFAULT_LOCALE)

	useEffect(() => {
		setLocale(LocaleProvider.getLocale())
	}, [])

	return locale
}

export {
	useLocale,
}