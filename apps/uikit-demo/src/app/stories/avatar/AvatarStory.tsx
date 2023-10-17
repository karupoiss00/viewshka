import {Avatar} from '@viewshka/uikit'
import ComponentStory, {StoryColumn} from '../../common/ComponentStory'
import {addStory} from '../../stories'
import styles from './Avatar.module.css'


function AvatarStory() {
	return (
		<ComponentStory>
			<StoryColumn>
				<div className={styles['size-container']}>
					<Avatar username={'Артемий Арсибеков'} size={'large'}/>
					<Avatar username={'Ростислав Глизерин'} size={'large'}/>
					<Avatar username={'Даниил Худяков'} size={'large'}/>
					<Avatar username={'leards'} size={'large'}/>
				</div>
				<div className={styles['size-container']}>
					<Avatar username={'Артемий Арсибеков'} size={'small'}/>
					<Avatar username={'Ростислав Глизерин'} size={'small'}/>
					<Avatar username={'Даниил Худяков'} size={'small'}/>
					<Avatar username={'leards'} size={'small'}/>
				</div>
			</StoryColumn>
		</ComponentStory>
	)
}

addStory('Avatar', AvatarStory)