import React from 'react'
import {DeckSettingsPopup} from './deckPopup/DeckSettingsPopup'
import {FolderSettingsPopup} from './folderPopup/FolderSettingsPopup'

type ContentSettingsPopupProps = {
	contentType: string
	contentId: string
	contentName: string
}
function ContentSettingsPopup({contentType, contentId, contentName}: ContentSettingsPopupProps) {

	if (contentType === 'deck') {
		return <DeckSettingsPopup deckId={contentId} deckName={contentName}/>
	}

	if (contentType === 'folder') {
		return <FolderSettingsPopup folderId={contentId} folderName={contentName}/>
	}

	console.error(`Unknown content type: ${contentType}`)

	return null
}

export {
	ContentSettingsPopup,
}