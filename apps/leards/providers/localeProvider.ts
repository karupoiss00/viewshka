enum Locale {
	ENGLISH = 'en-US',
	RUSSIAN = 'ru-RU',
}

interface ILocaleProvider {
	getLocale(): Locale
	setLocale(locale: Locale): void
}

const LOCALE_STORAGE_KEY = 'locale'
const DEFAULT_LOCALE = Locale.RUSSIAN

function isLocale(localeStr: string): localeStr is Locale {
	return !!Object.values(Locale).find(locale => locale === localeStr)
}

const LocaleProvider: ILocaleProvider = {
	getLocale: (): Locale => {
		const storageValue = window.localStorage.getItem(LOCALE_STORAGE_KEY)
		if (storageValue && isLocale(storageValue)) {
			return storageValue
		}

		const browserLocale = window.navigator.language
		if (isLocale(browserLocale)) {
			window.localStorage.setItem(LOCALE_STORAGE_KEY, browserLocale)
			return browserLocale
		}

		window.localStorage.setItem(LOCALE_STORAGE_KEY, DEFAULT_LOCALE)
		return DEFAULT_LOCALE
	},
	setLocale: (locale: Locale) => {
		window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
	},
}

export {
	Locale,
	isLocale,
	LocaleProvider,
	DEFAULT_LOCALE,
}