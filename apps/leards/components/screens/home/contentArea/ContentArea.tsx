import {useAtom} from '@reatom/npm-react'
import {PropsWithClassname} from '@viewshka/uikit'
import classnames from 'classnames'
import React from 'react'
import {selectedDeckIdAtom, selectedFolderIdAtom, selectionAtom} from '../viewmodel/selectionAtom'
import styles from './ContentArea.module.css'
import {LibraryContent} from './library/LibraryContent'
import {UserContent} from './userContent/UserContent'

function ContentArea({className}: PropsWithClassname) {
	const [selection] = useAtom(selectionAtom)
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)
	const [selectedDeckId] = useAtom(selectedDeckIdAtom)
	return (
		<div className={classnames(styles.contentArea, className)}>
			{
				selection.type === 'user-content'
					&& <UserContent folderId={selectedFolderId} deckId={selectedDeckId}/>
			}
			{
				selection.type === 'library'
					&& <LibraryContent selectedContent={selection.content}/>
			}
		</div>
	)
}

export default ContentArea