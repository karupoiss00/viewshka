import {DEFAULT_LOCALE} from '@leards/providers/localeProvider'
import {atom} from '@reatom/core'
import {userAtom} from './userAtom'

const localeAtom = atom(ctx => {
	const user = ctx.spy(userAtom)

	return user?.settings?.locale || DEFAULT_LOCALE
})

export {
	localeAtom,
}