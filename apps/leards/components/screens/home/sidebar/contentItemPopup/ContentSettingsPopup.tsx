import React from 'react'
import {DeckSettingsPopup} from './deckPopup/DeckSettingsPopup'
import {FolderSettingsPopup} from './folderPopup/FolderSettingsPopup'

type ContentSettingsPopupProps = {
	contentType: string
	contentId: string
}
function ContentSettingsPopup({contentType, contentId}: ContentSettingsPopupProps) {

	if (contentType === 'deck') {
		return <DeckSettingsPopup deckId={contentId}/>
	}

	if (contentType === 'folder') {
		return <FolderSettingsPopup folderId={contentId}/>
	}

	console.error(`Unknown content type: ${contentType}`)

	return null
}

export {
	ContentSettingsPopup,
}