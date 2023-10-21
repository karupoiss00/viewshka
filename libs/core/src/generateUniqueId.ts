const CREATED_IDS = new Map<string, boolean>()

function generateUniqueId(): string {
	const value = `id${Math.random().toString(16).slice(2)}`


	if (CREATED_IDS.get(value)) {
		return generateUniqueId()
	}

	CREATED_IDS.set(value, true)

	return value
}

export {
	generateUniqueId,
}