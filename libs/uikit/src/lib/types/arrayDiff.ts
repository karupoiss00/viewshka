function arrayDiff<T>(arr1: T[], arr2: T[], isEqual: (lhs: T, rhs: T) => boolean) {
	const added: T[] = []
	const removed: T[] = []

	arr2.forEach(elToFind => {
		let found = false

		arr1.forEach(elToCompare => {
			if (isEqual(elToFind, elToCompare)) {
				found = true
			}
		})

		if (!found) {
			added.push(elToFind)
		}
	})

	arr1.forEach(elToFind => {
		let found = false

		arr2.forEach(elToCompare => {
			if (isEqual(elToFind, elToCompare)) {
				found = true
			}
		})

		if (!found) {
			removed.push(elToFind)
		}
	})

	return {
		added,
		removed,
	}
}

export {
	arrayDiff,
}