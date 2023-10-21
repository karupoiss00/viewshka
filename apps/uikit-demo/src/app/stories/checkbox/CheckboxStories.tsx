import {Checkbox} from '@viewshka/uikit'
import ComponentStory, {StoryColumn} from '../../common/ComponentStory'
import {addStory} from '../../stories'

function CheckboxStories() {
	return (
		<ComponentStory>
			<StoryColumn>
				<Checkbox initialState={true} onChange={console.log}/>
			</StoryColumn>
		</ComponentStory>
	)
}

addStory('Checkbox', CheckboxStories)