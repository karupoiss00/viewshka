import {useState} from 'react'
import styles from './Checkbox.module.css'

type CheckboxProps = {
	initialState: boolean
	onChange: (value: boolean) => void
}

function Checkbox({initialState, onChange}: CheckboxProps) {
	const [selected, setSelected] = useState(initialState)
	const onClick = () => {
		setSelected(!selected)
		onChange(!selected)
	}

	return (
		<div className={styles['checkbox-container']} onClick={onClick}>
			<div className={styles['checkbox']} hidden={!selected}/>
		</div>
	)
}

export {
	Checkbox,
}