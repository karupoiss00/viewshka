import {Avatar} from '@viewshka/uikit'
import ComponentStory, {StoryColumn} from '../../common/ComponentStory'
import {addStory} from '../../stories'
import styles from './Avatar.module.css'


function AvatarStory() {
	return (
		<ComponentStory>
			<StoryColumn>
				<div className={styles['size-container']}>
					<Avatar type={'gradient'} name={'Артемий Арсибеков'} size={'large'}/>
					<Avatar type={'gradient'} name={'Ростислав Глизерин'} size={'large'}/>
					<Avatar type={'gradient'} name={'Даниил Худяков'} size={'large'}/>
					<Avatar type={'gradient'} name={'Павел Данилов'} size={'large'}/>
					<Avatar type={'gradient'} name={'owner'} size={'large'}/>
				</div>
				<div className={styles['size-container']}>
					<Avatar type={'gradient'} name={'Артемий Арсибеков'} size={'medium'}/>
					<Avatar type={'gradient'} name={'Ростислав Глизерин'} size={'medium'}/>
					<Avatar type={'gradient'} name={'Даниил Худяков'} size={'medium'}/>
					<Avatar type={'gradient'} name={'Павел Данилов'} size={'medium'}/>
					<Avatar type={'gradient'} name={'owner'} size={'medium'}/>
				</div>
				<div className={styles['size-container']}>
					<Avatar type={'gradient'} name={'Артемий Арсибеков'} size={'small'}/>
					<Avatar type={'gradient'} name={'Ростислав Глизерин'} size={'small'}/>
					<Avatar type={'gradient'} name={'Даниил Худяков'} size={'small'}/>
					<Avatar type={'gradient'} name={'Павел Данилов'} size={'small'}/>
					<Avatar type={'gradient'} name={'owner'} size={'small'}/>
				</div>
				<div className={styles['size-container']}>
					<Avatar type={'image'} avatarUrl={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqEIgRH5aLHIFsWn-XS9gu-R6kCJB0q5vKOaRvVHMK&s'} size={'large'}/>
					<Avatar type={'image'} avatarUrl={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqEIgRH5aLHIFsWn-XS9gu-R6kCJB0q5vKOaRvVHMK&s'} size={'medium'}/>
					<Avatar type={'image'} avatarUrl={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqEIgRH5aLHIFsWn-XS9gu-R6kCJB0q5vKOaRvVHMK&s'} size={'small'}/>
				</div>
				<div className={styles['size-container']}>
					<Avatar type={'image'} avatarUrl={'https://sun9-24.userapi.com/impg/gxMec7Xo1ppZAmJhW_jKT5ibW9Y1MuBCPFC7Fw/CthnM_yqYc0.jpg?size=604x604&quality=96&sign=479d45da0c5bd45373a4231b16fbb995&type=album'} size={'large'}/>
					<Avatar type={'image'} avatarUrl={'https://sun9-24.userapi.com/impg/gxMec7Xo1ppZAmJhW_jKT5ibW9Y1MuBCPFC7Fw/CthnM_yqYc0.jpg?size=604x604&quality=96&sign=479d45da0c5bd45373a4231b16fbb995&type=album'} size={'medium'}/>
					<Avatar type={'image'} avatarUrl={'https://sun9-24.userapi.com/impg/gxMec7Xo1ppZAmJhW_jKT5ibW9Y1MuBCPFC7Fw/CthnM_yqYc0.jpg?size=604x604&quality=96&sign=479d45da0c5bd45373a4231b16fbb995&type=album'} size={'small'}/>
				</div>
			</StoryColumn>
		</ComponentStory>
	)
}

addStory('Avatar', AvatarStory)