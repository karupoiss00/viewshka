type None = null | undefined
type Falsy = false | None

function isDef<T>(value: T | undefined): value is T {
	return value !== undefined
}
function isUndef<T>(value: T | undefined): value is undefined {
	return value === undefined
}
function isNotNull<T>(value: T | null): value is T {
	return value !== null
}
function isNull<T>(value: T | null): value is null {
	return value === null
}
function isSome<T>(value: T | None): value is T {
	return isDef(value) && isNotNull(value)
}
function isNone<T>(value: T | None): value is None {
	return isUndef(value) || isNull(value)
}
function isTruthy<T>(value: T | Falsy): value is T {
	return !isFalsy(value)
}
function isFalsy<T>(value: T | Falsy): value is Falsy {
	return value === false || isNone(value)
}
function isBoolean(value: unknown): value is boolean {
	return typeof value === 'boolean'
}
function isNumber(value: unknown): value is number {
	return typeof value === 'number'
}
function isString(value: unknown): value is string {
	return typeof value === 'string'
}
// eslint-disable-next-line @typescript-eslint/ban-types
function isObject(value: unknown): value is object {
	return typeof value === 'object'
}
// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction(value: unknown): value is Function {
	return typeof value === 'function'
}

export type {
	None,
	Falsy,
}

export {
	isDef, isUndef, isNotNull, isNull,
	isSome, isNone, isTruthy, isFalsy,
	isBoolean,
	isNumber, isString,
	isObject, isFunction,
}