import { useSelector } from 'react-redux'
import { ModemModel, ModemMarkModel, PlatformModel, SimModel, ModemEventModel } from '../models/ModemModel'

interface RootState {
  Modem2: {
    modemList: ModemModel[]
    modemMarkList: ModemMarkModel[]
    platformList: PlatformModel[]
    simList: SimModel[]
    eventList: ModemEventModel[]
    isLoaded: boolean
    status: number
    message: string
  }
}

export const useModem = () => {
  const state = useSelector((state: RootState) => state.Modem2)

  // Helpers
  const getTotalModems = (): number => {
    return state.modemList.length
  }

  const getModemById = (id: number): ModemModel | undefined => {
    return state.modemList.find((m) => m.id === id)
  }

  const getActiveModems = (): ModemModel[] => {
    return state.modemList.filter((m) => m.active === 1)
  }

  const getInactiveModems = (): ModemModel[] => {
    return state.modemList.filter((m) => m.active === 0)
  }

  const getPendingModems = (): ModemModel[] => {
    return state.modemList.filter((m) => m.isPending === 1)
  }

  const getModemsByPlatform = (platformId: number): ModemModel[] => {
    return state.modemList.filter((m) => m.platformId === platformId)
  }

  const getModemsByMark = (markId: number): ModemModel[] => {
    return state.modemList.filter((m) => m.markId === markId)
  }

  const getAvailableSims = (): SimModel[] => {
    const usedSimIds = state.modemList.filter((m) => m.simId).map((m) => m.simId)
    return state.simList.filter((s) => !usedSimIds.includes(s.id))
  }

  const getMarkById = (id: number): ModemMarkModel | undefined => {
    return state.modemMarkList.find((m) => m.id === id)
  }

  const getPlatformById = (id: number): PlatformModel | undefined => {
    return state.platformList.find((p) => p.id === id)
  }

  return {
    // Estado (nombres originales para compatibilidad)
    modemList: state.modemList,
    modemMarkList: state.modemMarkList,
    platformList: state.platformList,
    simList: state.simList,
    eventList: state.eventList,
    isLoaded: state.isLoaded,
    status: state.status,
    message: state.message,

    // Alias más cortos
    modems: state.modemList,
    modemMarks: state.modemMarkList,
    platforms: state.platformList,
    sims: state.simList,
    events: state.eventList,

    // Helpers
    getTotalModems,
    getModemById,
    getActiveModems,
    getInactiveModems,
    getPendingModems,
    getModemsByPlatform,
    getModemsByMark,
    getAvailableSims,
    getMarkById,
    getPlatformById,
  }
}
