import {useCallback, useState} from 'react'

function useRerender(): () => void {
	const [, setState] = useState(Number.MIN_SAFE_INTEGER)
	return useCallback(() => setState(x => x + 1), [])
}

export {
	useRerender,
}
