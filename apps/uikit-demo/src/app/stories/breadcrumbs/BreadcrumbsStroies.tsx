import {Breadcrumbs} from '@viewshka/uikit'
import React from 'react'
import ComponentStory, {StoryColumn} from '../../common/ComponentStory'
import {addStory} from '../../stories'

function BreadcrumbsStories() {
	return (
		<ComponentStory>
			<StoryColumn>
				<Breadcrumbs onItemClick={console.log}>
					<Breadcrumbs.Item id={'1'}>
						Root
					</Breadcrumbs.Item>
					<Breadcrumbs.Item id={'2'}>
						Child
					</Breadcrumbs.Item>
					<Breadcrumbs.Item id={'3'}>
						Child of child
					</Breadcrumbs.Item>
					<Breadcrumbs.Item id={'3'}>
						Child of child of child
					</Breadcrumbs.Item>
				</Breadcrumbs>
				<Breadcrumbs onItemClick={console.log}>
					<Breadcrumbs.Item id={'1'}>
						Root
					</Breadcrumbs.Item>
					<Breadcrumbs.Item id={'2'}>
						Child
					</Breadcrumbs.Item>
					<Breadcrumbs.Item id={'3'}>
						Child of child
					</Breadcrumbs.Item>
				</Breadcrumbs>
				<Breadcrumbs onItemClick={console.log}>
					<Breadcrumbs.Item id={'1'}>
						Root
					</Breadcrumbs.Item>
					<Breadcrumbs.Item id={'2'}>
						Child
					</Breadcrumbs.Item>
				</Breadcrumbs>
				<Breadcrumbs onItemClick={console.log}>
					<Breadcrumbs.Item id={'1'}>
						Root
					</Breadcrumbs.Item>
				</Breadcrumbs>
			</StoryColumn>
		</ComponentStory>
	)
}

addStory('Breadcrumbs', BreadcrumbsStories)