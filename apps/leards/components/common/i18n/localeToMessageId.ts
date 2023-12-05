import {Locale} from '@leards/providers/localeProvider'

export function localeToId(locale: Locale) {
	switch (locale) {
		case Locale.ENGLISH:
			return 'Language.English'
		case Locale.RUSSIAN:
			return 'Language.Russian'
		case Locale.MARI:
			return 'Language.Mari'
	}
}