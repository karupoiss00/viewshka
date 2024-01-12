import {Switcher} from '@viewshka/uikit'
import ComponentStory, {StoryColumn} from '../../common/ComponentStory'
import {addStory} from '../../stories'

function SwitcherStory() {
	return (
		<ComponentStory>
			<StoryColumn width={200}>
				<Switcher onClick={console.log} initialValue={true}/>
			</StoryColumn>
		</ComponentStory>
	)
}

addStory('Switcher', SwitcherStory)