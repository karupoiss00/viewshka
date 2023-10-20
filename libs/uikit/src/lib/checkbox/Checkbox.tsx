import {useState} from 'react'
import styles from './Checkbox.module.css'

type CheckboxProps = {
	initialState: boolean
	selectCheckbox: (value: boolean) => void
}

function Checkbox({initialState, selectCheckbox}: CheckboxProps) {
	const [selected, setSelected] = useState(initialState)
	const onClick = () => {
		setSelected(!selected)
		selectCheckbox(selected)
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