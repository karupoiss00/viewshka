import {FC} from 'react'

const STORIES_MAP = new Map<string, FC>()

function addStory(name: string, story: FC) {
	STORIES_MAP.set(name, story)
}

function getStory(name: string): FC | undefined {
	return STORIES_MAP.get(name)
}

function getAllStories(): Readonly<Map<string, FC>> {
	return STORIES_MAP
}

export {
	addStory,
	getStory,
	getAllStories,
}