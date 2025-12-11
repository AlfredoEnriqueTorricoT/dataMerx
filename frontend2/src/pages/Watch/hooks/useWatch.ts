import { useSelector } from 'react-redux'
import { WatchModel } from '../models/WatchModel'

interface RootState {
  Watch: {
    watchList: WatchModel[]
    status: number
    message: string
  }
}

export const useWatch = () => {
  const watchState = useSelector((state: RootState) => state.Watch)

  // Helpers
  const getTotalWatches = (): number => {
    return watchState.watchList.length
  }

  const getWatchById = (id: number): WatchModel | undefined => {
    return watchState.watchList.find((w) => w.id === id)
  }

  const getPendingWatches = (): WatchModel[] => {
    return watchState.watchList.filter((w) => w.isPending)
  }

  const getConfiguredWatches = (): WatchModel[] => {
    return watchState.watchList.filter((w) => !w.isPending)
  }

  return {
    // Estado
    watches: watchState.watchList,
    status: watchState.status,
    message: watchState.message,

    // Helpers
    getTotalWatches,
    getWatchById,
    getPendingWatches,
    getConfiguredWatches,
  }
}
