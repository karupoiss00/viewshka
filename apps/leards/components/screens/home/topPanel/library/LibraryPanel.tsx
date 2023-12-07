import {DecksAPI} from '@leards/api/DecksAPI'
import {selectedDeckIdAtom} from '@leards/components/screens/home/viewmodel/selectionAtom'
import {useAtom} from '@reatom/npm-react'
import React, {useState} from 'react'
import {useQuery} from 'react-query'
import styles from './LibraryPanel.module.css'

function LibraryPanel() {
	const name = useSelectedDeckName()

	return (
		<div>
			<div className={styles.selectedDeckName}>
				<span className={styles.text}>{name}</span>
			</div>
		</div>
	)
}

function useSelectedDeckName() {
	const [selectedDeckId] = useAtom(selectedDeckIdAtom)
	const [name, setName] = useState('')

	useQuery(['selectedLibraryDeckId', selectedDeckId], async () => {
		if (!selectedDeckId) {
			setName('')
			return
		}

		const response = await DecksAPI.get().getDeckById(selectedDeckId)
		setName(response.data.deck.name)
	})

	return name
}

export {
	LibraryPanel,
}