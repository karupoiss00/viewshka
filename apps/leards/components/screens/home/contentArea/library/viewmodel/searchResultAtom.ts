import {Content} from '@leards/api/generated'
import {atom} from '@reatom/core'

const searchResultAtom = atom<Content[]>([])

export {
	searchResultAtom,
}