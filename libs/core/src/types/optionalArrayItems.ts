import {Falsy, isTruthy} from './types'

function optionalArrayItems<T>(arr: (T | Falsy)[]): T[] {
	return arr.filter(isTruthy)
}

export {
	optionalArrayItems,
}