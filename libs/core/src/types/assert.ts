import {isNone, None} from './types'

function verify<T>(value: T | None, message = 'verify failed') {
	if (isNone(value)) {
		throw new Error(message)
	}

	return value
}

export {
	verify,
}