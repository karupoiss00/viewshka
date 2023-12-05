enum Locale {
	ENGLISH = 'en-US',
	RUSSIAN = 'ru-RU',
	MARI = 'chm-RU'
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

export {
	Locale,
	isLocale,
	DEFAULT_LOCALE,
}