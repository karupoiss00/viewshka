function merge<T>(a: Array<T>, b: Array<T>, predicate = (a: T, b: T) => a === b) {
	const c = [...a] // copy to avoid side effects
	// add all items from B to copy C if they're not already present
	b.forEach(bItem => (c.some(cItem => predicate(bItem, cItem)) ? null : c.push(bItem)))
	return c
}

export {
	merge,
}