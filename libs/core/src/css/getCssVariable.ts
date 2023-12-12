function getCssVariable(name: string): string {
	const computedStyle = getComputedStyle(document.documentElement)
	return computedStyle.getPropertyValue(name)
}

export {
	getCssVariable,
}