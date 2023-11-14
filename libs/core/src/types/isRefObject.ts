import {RefObject} from 'react'

function isRefObject<T>(obj: unknown): obj is RefObject<T> {
	return !!obj && typeof obj === 'object' && obj.hasOwnProperty('current')
}

export {
	isRefObject,
}