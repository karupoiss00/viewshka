import {Content} from '@leards/api/generated'
import {atom} from '@reatom/core'

const favoritesAtom = atom<Content[]>([])

export {
	favoritesAtom,
}