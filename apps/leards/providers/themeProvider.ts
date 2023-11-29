enum Theme {
    DARK = 'dark',
    LIGHT = 'light',
}

const DEFAULT_THEME = Theme.LIGHT

function isTheme(themeStr: string): themeStr is Theme {
	return !!Object.values(Theme).find(theme => themeStr === theme)
}

export {
	Theme,
	DEFAULT_THEME,
	isTheme,
}