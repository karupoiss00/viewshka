import {useEffect} from 'react'

function useFormReset(resetFn: () => void, trigger: boolean) {
	useEffect(() => {
		if (!trigger) {
			resetFn()
		}
	}, [resetFn, trigger])
}

export {
	useFormReset,
}