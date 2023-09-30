import {render} from '@testing-library/react'
import Uikit from './uikit'

describe('Uikit', () => {
	it('should render successfully', () => {
		const {baseElement} = render(<Uikit />)
		expect(baseElement).toBeTruthy()
	})
})
