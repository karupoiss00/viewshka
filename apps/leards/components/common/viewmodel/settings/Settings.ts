import {DEFAULT_LOCALE, isLocale, Locale} from '@leards/providers/localeProvider'
import {DEFAULT_THEME, isTheme, Theme} from '@leards/providers/themeProvider'

type SettingsData = {
    locale: Locale
    theme: Theme
}

interface CreateSettingsPayload {
    locale: string
    theme: string
}

function createSettings({
	locale,
	theme,
}: CreateSettingsPayload): SettingsData {
	return {
		locale: isLocale(locale) ? locale : DEFAULT_LOCALE,
		theme: isTheme(theme) ? theme : DEFAULT_THEME,
	}
}

export type {
	SettingsData,
}

export {
	createSettings,
}