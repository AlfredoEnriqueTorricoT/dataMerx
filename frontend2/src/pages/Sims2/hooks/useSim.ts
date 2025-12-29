import { useSelector } from 'react-redux'
import { SimModel, SimDetailsModel, SimEventModel } from '../models/SimModel'

interface RootState {
  Sims2: {
    simList: SimModel[]
    simDetails: SimDetailsModel | null
    eventList: SimEventModel[]
    isLoaded: boolean
    status: number
    message: string
  }
}

export const useSim = () => {
  const state = useSelector((state: RootState) => state.Sims2)

  // Helpers
  const getTotalSims = (): number => {
    return state.simList.length
  }

  const getSimById = (id: number): SimModel | undefined => {
    return state.simList.find((s) => s.id === id)
  }

  const getActiveSims = (): SimModel[] => {
    return state.simList.filter((s) => s.active === 1)
  }

  const getInactiveSims = (): SimModel[] => {
    return state.simList.filter((s) => s.active === 0)
  }

  const getSimByImei = (imei: string): SimModel | undefined => {
    return state.simList.find((s) => s.imei === imei)
  }

  const getSimByNumber = (number: string): SimModel | undefined => {
    return state.simList.find((s) => s.number === number)
  }

  return {
    // Estado
    simList: state.simList,
    simDetails: state.simDetails,
    eventList: state.eventList,
    isLoaded: state.isLoaded,
    status: state.status,
    message: state.message,

    // Alias más cortos
    sims: state.simList,
    details: state.simDetails,
    events: state.eventList,

    // Helpers
    getTotalSims,
    getSimById,
    getActiveSims,
    getInactiveSims,
    getSimByImei,
    getSimByNumber,
  }
}
