import {Content} from '@leards/api/generated'
import {atom} from '@reatom/core'

const searchStringAtom = atom<string>('')

export {
	searchStringAtom,
}