import {useLatestRef} from '@viewshka/core'
import {useLayoutEffect, useState, useMemo, useCallback} from 'react'

const DEFAULT_BATCH_DELAY = 200

type BatchedListItemsArgs<ITEM> = {
	items: ITEM[],
	batchSize?: number,
	batchResetDependency?: unknown,
	batchDelay?: number,
}

type BatchedListItemsResult<ITEM> = {
	visibleItems: ITEM[],
	showPreloader: boolean,
	revealNextBatch: () => void,
}

function useBatchedListItems<ITEM>(props: BatchedListItemsArgs<ITEM>): BatchedListItemsResult<ITEM> {
	const {
		items,
		batchSize,
		batchDelay = DEFAULT_BATCH_DELAY,
		batchResetDependency,
	} = props
	const initialVisibleCount = batchSize || Number.MAX_SAFE_INTEGER
	const [visibleCount, setVisibleCount] = useState(initialVisibleCount)
	const visibleCountRef = useLatestRef(visibleCount)

	const visibleItems = useMemo(
		() => (items && batchSize
			? items.slice(0, visibleCount)
			: items),
		[items, batchSize, visibleCount],
	)

	useLayoutEffect(() => {
		if (batchResetDependency !== undefined && visibleCountRef.current !== initialVisibleCount) {
			setVisibleCount(initialVisibleCount)
		}
	}, [visibleCountRef, batchResetDependency, initialVisibleCount])

	const revealNextBatch = useCallback(
		() => batchSize && setTimeout(
			() => setVisibleCount(x => x + batchSize),
			batchDelay,
		),
		[batchSize, batchDelay],
	)

	console.log(batchSize, visibleCount, items.length)

	return {
		visibleItems,
		showPreloader: !!batchSize && visibleCount < items.length,
		revealNextBatch,
	}
}

export {
	useBatchedListItems,
}
