import React from 'react'

type DeckProps = {
	id: string
	name: string
}
function Deck({id, name}: DeckProps) {
	return (
		<div>
			{name}
		</div>
	)
}

export {
	Deck,
}