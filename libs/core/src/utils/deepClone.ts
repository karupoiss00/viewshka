import {isDef} from '../types/types'

function deepClone<T>(obj: T) {
	return isDef(structuredClone)
		? structuredClone(obj)
		: JSON.parse(JSON.stringify(obj))
}

export {
	deepClone,
}