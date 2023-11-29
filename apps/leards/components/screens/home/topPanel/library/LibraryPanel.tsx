import styles from '@leards/components/screens/home/topPanel/TopPanel.module.css'
import {selectedDeckIdAtom} from '@leards/components/screens/home/viewmodel/selectionAtom'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAtom} from '@reatom/npm-react'
import React from 'react'

function LibraryPanel() {
	const [selectedDeckId] = useAtom(selectedDeckIdAtom)
	const getMessage = useMessages()
	return (
		<div className={styles.libraryPanel}>
			{}
		</div>
	)
}
export {
	LibraryPanel,
}