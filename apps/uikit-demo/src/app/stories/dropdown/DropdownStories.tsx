import {Dropdown} from '@viewshka/uikit'
import ComponentStory, {StoryColumn} from '../../common/ComponentStory'
import {addStory} from '../../stories'

function DropdownStories() {
	return (
		<ComponentStory>
			<StoryColumn width={200}>
				<Dropdown onItemSelect={console.log} placeholder="Выберите">
					<Dropdown.Item id="1" value="Первый"/>
					<Dropdown.Item id="2" value="Второй"/>
					<Dropdown.Item id="3" value="Третий"/>
				</Dropdown>
			</StoryColumn>
		</ComponentStory>
	)
}

addStory('Dropdown', DropdownStories)