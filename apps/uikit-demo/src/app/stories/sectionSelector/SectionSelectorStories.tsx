import {SectionSelector, SystemIconFolder} from '@viewshka/uikit'
import ComponentStory, {StoryColumn} from '../../common/ComponentStory'
import {addStory} from '../../stories'


function SectionSelectorStories() {
	return (
		<ComponentStory>
			<StoryColumn>
				<SectionSelector onItemSelect={console.log}>
					<SectionSelector.Item id={'1'}>
						<SystemIconFolder/>
                        Первый
					</SectionSelector.Item>
					<SectionSelector.Item id={'2'}>
                        Второй
					</SectionSelector.Item>
					<SectionSelector.Item id={'3'}>
                        Первый
						<SystemIconFolder/>
					</SectionSelector.Item>
				</SectionSelector>
			</StoryColumn>
		</ComponentStory>
	)
}

addStory('SectionSelector', SectionSelectorStories)