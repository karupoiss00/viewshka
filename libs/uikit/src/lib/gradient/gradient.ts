function generateRandomColor(username: string) {
	let hash = 0
	username.split('').forEach(char => {
		hash = char.charCodeAt(0) + ((hash << 5) - hash)
	})
	let color = '#'
	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xff
		color += value.toString(16).padStart(2, '0')
	}
	return color
}

function generateGradient(startColor: string, endColor: string) {
	return `linear-gradient(180deg, ${startColor}, ${endColor})`
}

function generateRandomGradient(username: string) {
	let color1 = ''
	let color2 = ''

	color1 = generateRandomColor(username)
	color2 = generateRandomColor(username.length < 4 ? username + username : username.substring(0, 4))

	return generateGradient(color1, color2)
}

export {
	generateGradient,
	generateRandomGradient,
}