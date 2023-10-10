import {DependencyList, EffectCallback, useEffect, useRef} from 'react'

function useDidUpdateEffect(effect: EffectCallback, deps: DependencyList) {
	const didMountRef = useRef(false)

	useEffect(() => {
		if (didMountRef.current) {
			return effect()
		}
		didMountRef.current = true
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...deps])
}

export {
	useDidUpdateEffect,
}