import { useSelector } from 'react-redux'
import {
  CarModel,
  CarDetailsModel,
  CarEventModel,
  ModemModel,
  WatchModel,
  PlatformModel,
} from '../models/CarModel'

interface RootState {
  Car2: {
    carList: CarModel[]
    carDetails: CarDetailsModel | null
    eventList: CarEventModel[]
    modemList: ModemModel[]
    watchList: WatchModel[]
    platformList: PlatformModel[]
    isLoaded: boolean
    status: number
    message: string
  }
}

export const useCar = () => {
  const state = useSelector((state: RootState) => state.Car2)

  return {
    carList: state.carList,
    carDetails: state.carDetails,
    eventList: state.eventList,
    modemList: state.modemList,
    watchList: state.watchList,
    platformList: state.platformList,
    isLoaded: state.isLoaded,
    status: state.status,
    message: state.message,

    // Helpers
    getTotalCars: () => state.carList.length,
    getCarById: (id: number) => state.carList.find((car) => car.id === id),
    getCarsByPlatform: (platformId: number) =>
      state.carList.filter((car) => car.platformId === platformId),
    getCarsWithModem: () => state.carList.filter((car) => car.modemId !== null),
    getCarsWithoutModem: () => state.carList.filter((car) => car.modemId === null),
    getCarsWithWatch: () => state.carList.filter((car) => car.watchId !== null),
    getCarsWithoutWatch: () => state.carList.filter((car) => car.watchId === null),
  }
}
