import {SpaceRepetitionAPI, StorageStatistics} from '@leards/api/SpaceRepetitionAPI'
import {EmptyPlaceholder} from '@leards/components/common/placeholder/EmptyPlaceholder'
import {settingsAtom} from '@leards/components/common/viewmodel/settingsAtom'
import {userAtom} from '@leards/components/common/viewmodel/userAtom'
import {StorageType} from '@leards/components/screens/home/viewmodel/selection/Selection'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAtom} from '@reatom/npm-react'
import {useEffect, useState} from 'react'
import {Chart} from 'react-google-charts'
import {useQuery} from 'react-query'

type StorageStatsProps = {
	storageType: StorageType
	storageId: string
}
function StorageStats({storageType, storageId}: StorageStatsProps) {
	const [settings] = useAtom(settingsAtom)
	const getMessage = useMessages()
	const stats = useStorageStatsQuery(storageType, storageId)
	const options = {
		pieHole: 0.6,
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

	if (!stats) {
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
	const [stats, setStats] = useState<StorageStatistics>(null)
	const {data, isSuccess} = useQuery(['stats', storageId, storageType], async () => {
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