function sequentalAsync<T>(fn: () => Promise<T>): () => Promise<T> {
	let promise: Promise<T> | undefined

	return () => {
		if (!promise) {
			promise = fn().finally(() => {
				promise = undefined
			})
		}

		return promise
	}
}

export {
	sequentalAsync,
}