import {TextField} from '@viewshka/uikit'
import React from 'react'
import {addStory} from '../../stories'
import ComponentStory, {StoryColumn} from '../common/ComponentStory'

function TextFieldStory() {
	return (
		<ComponentStory>
			<StoryColumn width={400} name={'Default'}>
				<TextField onChange={console.log} />
				<TextField placeholder={'Введите текст'} onChange={console.log} />
			</StoryColumn>
			<StoryColumn width={400} name={'Error'}>
				<TextField
					onChange={console.log}
					valid={false}
					onValidate={() => false}
				/>
				<TextField
					onChange={console.log}
					placeholder={'Введите текст'}
					valid={false}
					errorMessage={'С сообщенем об ошибке'}
					onValidate={() => false}
				/>
			</StoryColumn>
			<StoryColumn width={400} name={'Hidden content'}>
				<TextField
					placeholder={'Введите текст'}
					onChange={console.log}
					contentHidden={true}
				/>
				<TextField
					placeholder={'Введите текст'}
					onChange={console.log}
					contentHidden={true}
					initialValue={'initial value'}
				/>
			</StoryColumn>
		</ComponentStory>
	)
}

addStory('TextField', TextFieldStory)