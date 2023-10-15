import {Avatar} from '@viewshka/uikit'
import ComponentStory, {StoryColumn} from '../../common/ComponentStory'
import {addStory} from '../../stories'


function AvatarStory() {
	return (
		<ComponentStory>
			<StoryColumn>
				<Avatar username={'qwerty'} size={'large'} />
			</StoryColumn>
		</ComponentStory>
	)
}

addStory('Avatar', AvatarStory)