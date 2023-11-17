function getRandomNumber(min: number, max: number) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function clampNumber(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max)
}

export {
	getRandomNumber,
	clampNumber,
}

