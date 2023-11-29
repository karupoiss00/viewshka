import {UserSettingsAPI} from '@leards/api/UserSettingsAPI'
import {DEFAULT_LOCALE, isLocale} from '@leards/providers/localeProvider'
import {DEFAULT_THEME, isTheme} from '@leards/providers/themeProvider'
import {useAction, useAtom} from '@reatom/npm-react'
import {useLayoutEffect} from '@viewshka/core'
import {NextComponentType} from 'next'
import {useRouter} from 'next/router'
import React from 'react'
import {useMutation} from 'react-query'
import {settingsAction} from '../common/viewmodel/settingsAtom'
import {userAtom} from '../common/viewmodel/userAtom'
import LoadingPage from '../screens/loading/LoadingPage'

const withSettings = (Component: NextComponentType) => () => {
	const router = useRouter()
	const {status, data, mutate} = useSettingsMutation()
	const handleSetUserAction = useAction(settingsAction.set)

	useLayoutEffect(() => {
		mutate()
	}, [mutate])

	useLayoutEffect(() => {
		if (status === 'success') {
			const locale = isLocale(data.settings.locale) ? data.settings.locale : DEFAULT_LOCALE
			const theme = isTheme(data.settings.theme) ? data.settings.theme : DEFAULT_THEME
			handleSetUserAction({
				locale: locale,
				theme: theme,
			})
		}
		if (status === 'error') {
			router.replace('/')
		}
	})

	if (status === 'success') {
		return <Component />
	}

	return <LoadingPage />
}

function useSettingsMutation() {
	const [user] = useAtom(userAtom)

	return useMutation('auth', async () => {
		const response = await UserSettingsAPI.get().getUserSettings(user.id)
		return response.data
	})
}

export {
	withSettings,
}