import {MutableRefObject, useEffect, useState} from 'react'

interface Dimensions {
	width: number;
	height: number;
}

function useResizeObserver(targetRef: MutableRefObject<Element>): Dimensions {
	const [dimensions, setDimensions] = useState<Dimensions>({width: 0, height: 0})

	useEffect(() => {
		const resizeObserver = new ResizeObserver(entries => {
			if (entries && entries.length > 0) {
				const {width, height} = entries[0].contentRect
				setDimensions({width, height})
			}
		})

		if (targetRef.current) {
			resizeObserver.observe(targetRef.current)
		}

		return () => {
			resizeObserver.disconnect()
		}
	}, [])

	return dimensions
}

export {
	useResizeObserver,
}