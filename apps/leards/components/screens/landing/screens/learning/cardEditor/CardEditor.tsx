import React, {useEffect, useState} from 'react'
import styles from './CardEditor.module.css'

type CardData = {
	word: string
	translation: string
}

type CardEditorProps = {
	initialState: CardData,
	onCardChange: (data: CardData) => void
}
function CardEditor({initialState, onCardChange}: CardEditorProps) {
	const [state, setState] = useState(() => initialState)

	useEffect(() => {
		onCardChange(state)
	}, [onCardChange, state])

	return (
		<div className={styles.container}>
			<input
				className={styles.editableField}
				value={state.word}
				placeholder="слово"
				onChange={e => setState(state => ({
					...state,
					word: e.target.value,
				}))}
			/>
			<div className={styles.divider}></div>
			<input
				className={styles.editableField}
				value={state.translation}
				placeholder="перевод"
				onChange={e => setState(state => ({
					...state,
					translation: e.target.value,
				}))}
			/>
		</div>
	)
}

export {
	CardEditor,
}