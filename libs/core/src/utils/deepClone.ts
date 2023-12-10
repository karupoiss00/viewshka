import {isDef} from '../types/types'

function deepClone<T>(obj: T) {
	const nativeDeepClone = window['structuredClone']
	return isDef(nativeDeepClone)
		? nativeDeepClone(obj)
		: JSON.parse(JSON.stringify(obj))
}

export {
	deepClone,
}