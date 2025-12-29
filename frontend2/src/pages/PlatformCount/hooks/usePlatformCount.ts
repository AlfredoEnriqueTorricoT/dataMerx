import { useSelector } from 'react-redux'
import { PlatformCountModel } from '../models/PlatformCountModel'

interface RootState {
  PlatformCount: {
    platformCountList: PlatformCountModel[]
    status: number
    message: string
  }
}

export const usePlatformCount = () => {
  const state = useSelector((state: RootState) => state.PlatformCount)

  const getTotalCount = (): number => {
    return state.platformCountList.reduce((sum, item) => sum + item.count, 0)
  }

  const getPlatformByName = (name: string): PlatformCountModel | undefined => {
    return state.platformCountList.find((item) => item.name === name)
  }

  return {
    platformCounts: state.platformCountList,
    status: state.status,
    message: state.message,
    getTotalCount,
    getPlatformByName,
  }
}
