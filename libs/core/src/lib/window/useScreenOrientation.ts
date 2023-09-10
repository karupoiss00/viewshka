import {useWindowSize} from "./useWindowSize";

export type WindowOrientation = 'vertical' | 'horizontal'

export function useScreenOrientation() {
	const windowSize = useWindowSize()

	return windowSize.width > windowSize.height ? 'horizontal' : 'vertical'
}