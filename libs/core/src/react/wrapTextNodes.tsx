import {PropsWithChildren, ReactNode} from 'react'
import * as React from 'react'

function wrapTextNodes(node: ReactNode, Wrapper: React.FC<PropsWithChildren>) {
	const wrappedTextChildren: Array<JSX.Element> = []
	if (isIterable(node)) {
		for (const child of node) {
			if (typeof child === 'string') {
				wrappedTextChildren.push((
					<Wrapper>
						{child}
					</Wrapper>
				))
			}
			else {
				wrappedTextChildren.push((
					<>
						{child}
					</>
				))
			}
		}
	}

	return wrappedTextChildren
}

function isIterable(input: unknown): input is Iterable<unknown> {
	if (input === null || input === undefined) {
		return false
	}

	if (typeof input !== 'object') {
		return false
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return typeof input[Symbol.iterator] === 'function'
}

export {
	wrapTextNodes,
}