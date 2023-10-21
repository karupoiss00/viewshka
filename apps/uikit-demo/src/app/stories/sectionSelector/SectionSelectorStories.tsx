import {SectionSelector, SystemIconCloseEye, SystemIconDeck, SystemIconFolder} from '@viewshka/uikit'
import ComponentStory, {StoryColumn} from '../../common/ComponentStory'
import {addStory} from '../../stories'


function SectionSelectorStories() {
	return (
		<ComponentStory>
			<StoryColumn>
				<SectionSelector onItemSelect={console.log}>
					<SectionSelector.Item id={'1'}>
                        Первый
					</SectionSelector.Item>
					<SectionSelector.Item id={'2'}>
                        Второй
					</SectionSelector.Item>
					<SectionSelector.Item id={'3'}>
                        Третий
					</SectionSelector.Item>
				</SectionSelector>
			</StoryColumn>
			<StoryColumn>
				<SectionSelector onItemSelect={console.log}>
					<SectionSelector.Item id={'1'}>
						<SystemIconFolder/>
					</SectionSelector.Item>
					<SectionSelector.Item id={'2'}>
						<SystemIconCloseEye/>
					</SectionSelector.Item>
					<SectionSelector.Item id={'3'}>
						<SystemIconDeck/>
					</SectionSelector.Item>
				</SectionSelector>
			</StoryColumn>
			<StoryColumn>
				<SectionSelector onItemSelect={console.log}>
					<SectionSelector.Item id={'1'}>
						<SystemIconFolder/>
                        Первый
					</SectionSelector.Item>
					<SectionSelector.Item id={'2'}>
						<SystemIconCloseEye/>
                        Второй
					</SectionSelector.Item>
					<SectionSelector.Item id={'3'}>
						<SystemIconDeck/>
                        Третий
					</SectionSelector.Item>
				</SectionSelector>
			</StoryColumn>
		</ComponentStory>
	)
}

addStory('SectionSelector', SectionSelectorStories)