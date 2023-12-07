import {DEFAULT_LOCALE} from '@leards/providers/localeProvider'
import {DEFAULT_THEME} from '@leards/providers/themeProvider'
import {action, atom} from '@reatom/core'
import {createSettings, SettingsData} from './settings/Settings'

const settingsAtom = atom<SettingsData>({
	locale: DEFAULT_LOCALE,
	theme: DEFAULT_THEME,
} as SettingsData)

const set = action((ctx, settings: SettingsData) => {
	settingsAtom(ctx, createSettings({
		theme: settings.theme,
		locale: settings.locale,
	}))
})

const reset = action(ctx => {
	const settingsData = ctx.get(settingsAtom)
	settingsAtom(ctx, null)

	set(ctx, {
		locale: settingsData.locale,
		theme: DEFAULT_THEME,
	})
})

const settingsAction = {
	set,
	reset,
} as const

export {
	settingsAtom,
	settingsAction,
}