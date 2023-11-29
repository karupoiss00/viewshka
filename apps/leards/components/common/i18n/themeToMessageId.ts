import {Theme} from '@leards/providers/themeProvider'

export function themeToId(theme: Theme) {
	switch (theme) {
		case Theme.DARK:
			return 'Theme.Dark'
		case Theme.LIGHT:
			return 'Theme.Light'
	}
}