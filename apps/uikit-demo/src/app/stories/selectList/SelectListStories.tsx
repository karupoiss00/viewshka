import {Button, Popover, SelectList, SystemIconFolder} from '@viewshka/uikit'
import React, {useRef} from 'react'
import ComponentStory, {StoryColumn} from '../../common/ComponentStory'
import {addStory} from '../../stories'
import styles from './SelectListStories.module.css'

function SelectListStories() {
	const triggerRef = useRef<HTMLButtonElement>(null)
	return (
		<ComponentStory>
			<StoryColumn width={600} name={'Default'}>
				<SelectList className={styles['list-example']} onItemSelect={console.log}>
					<SelectList.Item id={'first'}>
						<SystemIconFolder/>
						Первый пункт
					</SelectList.Item>
					<SelectList.Item id={'second'}>
						<SystemIconFolder/>
						Второй пункт
					</SelectList.Item>
					<SelectList.Item id={'third'}>
						<SystemIconFolder/>
						Третий пункт
					</SelectList.Item>
				</SelectList>
			</StoryColumn>
			<StoryColumn width={600} name={'With scroll'}>
				<SelectList className={styles['list-scroll']} onItemSelect={console.log}>
					<SelectList.Item id={'1'}>
						Первый пункт
					</SelectList.Item>
					<SelectList.Item id={'2'}>
						Второй пункт
					</SelectList.Item>
					<SelectList.Item id={'3'}>
						Третий пункт
					</SelectList.Item>
					<SelectList.Item id={'4'}>
						Четвертый пункт
					</SelectList.Item>
					<SelectList.Item id={'5'}>
						Пятый пункт
					</SelectList.Item>
					<SelectList.Item id={'6'}>
						Шестой пункт
					</SelectList.Item>
					<SelectList.Item id={'7'}>
						Седьмой пункт
					</SelectList.Item>
					<SelectList.Item id={'8'}>
						Восьмой пункт
					</SelectList.Item>
					<SelectList.Item id={'9'}>
						Девятый пункт
					</SelectList.Item>
				</SelectList>
			</StoryColumn>
			<StoryColumn width={200} name={'In popover'}>
				<Button
					className={styles['button']}
					type={'primary'}
					size={'small'}
					onClick={console.log}
					ref={triggerRef}
				>
					Открыть список
				</Button>
				<Popover preferredPosition={'bottom-center'} triggerRef={triggerRef} onClose={() => {}}>
					<Popover.Content>
						<SelectList onItemSelect={console.log}>
							<SelectList.Item id={'1'}>
									Первый пункт
							</SelectList.Item>
							<SelectList.Item id={'2'}>
								Второй пункт
							</SelectList.Item>
							<SelectList.Item id={'3'}>
								Третий пункт
							</SelectList.Item>
							<SelectList.Item id={'4'}>
								Четвертый пункт
							</SelectList.Item>
							<SelectList.Item id={'5'}>
								Пятый пункт
							</SelectList.Item>
							<SelectList.Item id={'6'}>
								Шестой пункт
							</SelectList.Item>
							<SelectList.Item id={'7'}>
								Седьмой пункт
							</SelectList.Item>
							<SelectList.Item id={'8'}>
								Восьмой пункт
							</SelectList.Item>
							<SelectList.Item id={'9'}>
								Девятый пункт
							</SelectList.Item>
						</SelectList>
					</Popover.Content>
				</Popover>
			</StoryColumn>
		</ComponentStory>
	)
}

addStory('SelectList', SelectListStories)