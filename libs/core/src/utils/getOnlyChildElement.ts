import {Children, isValidElement, ReactElement, ReactNode} from 'react'

function getOnlyChildElement(children: ReactNode): ReactElement | null {
	try {
		const child = Children.only(children)
		if (isValidElement(child)) {
			return child
		}
	}
	catch (_) {}

	return null
}

export {
	getOnlyChildElement,
}