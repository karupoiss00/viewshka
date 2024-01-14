import {SpaceRepetitionAPI} from '@leards/api/SpaceRepetitionAPI'
import {EmptyPlaceholder} from '@leards/components/common/placeholder/EmptyPlaceholder'
import {settingsAtom} from '@leards/components/common/viewmodel/settingsAtom'
import {userAtom} from '@leards/components/common/viewmodel/userAtom'
import {currentFolderAtom} from '@leards/components/screens/home/viewmodel/currentFolderAtom'
import {StorageType} from '@leards/components/screens/home/viewmodel/selection/Selection'
import {selectionAtom} from '@leards/components/screens/home/viewmodel/selectionAtom'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAtom} from '@reatom/npm-react'
import {useEffect, useState} from 'react'
import {Chart} from 'react-google-charts'
import {useQuery} from 'react-query'

type StorageStatsProps = {
	storageType: StorageType
	storageId: string
	pieHole?: number
}
function StorageStats({storageType, storageId, pieHole = 0.6}: StorageStatsProps) {
	const [settings] = useAtom(settingsAtom)
	const getMessage = useMessages()
	const stats = useStorageStatsQuery(storageType, storageId)
	const options = {
		pieHole,
		backgroundColor: 'transparent',
		slices: {
			0: {
				color: '#9b9b9b',
			},
			1: {
				color: '#FFC56F',
			},
			2: {
				color: '#95D17F',
			},
			3: {
				color: '#FB6C55',
			},
		},
		legend: {
			textStyle: {
				color: settings.theme === 'dark' ? '#ddd' : '#000',
			},
		},
	}

	if (!stats || Object.values(stats).every(count => count === 0)) {
		return <EmptyPlaceholder text={getMessage('ContentArea.Stats.Placeholder')}/>
	}

	return (
		<Chart
			chartType="PieChart"
			width="100%"
			height="100%"
			data={[
				['CardStatus', 'Count'],
				[getMessage('SpaceRepetition.Stats.New'), stats.new],
				[getMessage('SpaceRepetition.Stats.Learning'), stats.learning],
				[getMessage('SpaceRepetition.Stats.Review'), stats.review],
				[getMessage('SpaceRepetition.Stats.Repeat'), stats.relearning],
			]}
			options={options}
		/>
	)
}


function useStorageStatsQuery(storageType: StorageType, storageId: string) {
	const [user] = useAtom(userAtom)
	const [selection] = useAtom(selectionAtom)
	const [currentFolder] = useAtom(currentFolderAtom)
	const [stats, setStats] = useState(null)
	const {data, isSuccess} = useQuery(['stats', selection.content?.id, storageId, storageType, currentFolder?.content?.length], async () => {
		const response = await SpaceRepetitionAPI.get().getStorageStats(user.id, storageType, storageId)
		return response.data
	})

	useEffect(() => {
		if (isSuccess) {
			setStats(data)
		}
	}, [data, isSuccess])

	return stats
}
export {
	StorageStats,
}