import { useSelector } from 'react-redux'
import { WatchLogModel } from '../models/WatchLogModel'

interface RootState {
  WatchLog: {
    watchLogList: WatchLogModel[]
    status: number
    message: string
  }
}

export const useWatchLog = () => {
  const watchLogState = useSelector((state: RootState) => state.WatchLog)

  const getTotalLogs = (): number => {
    return watchLogState.watchLogList.length
  }

  const getLogById = (id: number): WatchLogModel | undefined => {
    return watchLogState.watchLogList.find((log) => log.id === id)
  }

  return {
    logs: watchLogState.watchLogList,
    status: watchLogState.status,
    message: watchLogState.message,
    getTotalLogs,
    getLogById,
  }
}
