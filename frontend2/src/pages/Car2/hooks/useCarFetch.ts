import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CarApiService } from '../services/CarApiService'
import {
  setCarList,
  addCar,
  updateCarInList,
  setCarDetails,
  setEventList,
  addEvent,
  setModemList,
  setWatchList,
  setPlatformList,
  setIsLoaded,
} from '../slices/carSlice'
import {
  UpdateCarPayload,
  AssignModemPayload,
  AssignWatchPayload,
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
    platformList: PlatformModel[]
    isLoaded: boolean
    status: number
    message: string
  }
}

export const useCarFetch = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isOperating, setIsOperating] = useState(false)
  const dispatch = useDispatch()
  const service = useMemo(() => new CarApiService(), [])

  const { platformList, isLoaded } = useSelector((state: RootState) => state.Car2)

  // Fetch all data (cars + platforms)
  const fetchAllData = async () => {
    if (isLoaded) {
      setIsLoading(false)
      return { success: true, message: 'Data already loaded' }
    }

    const [carsResult, platformsResult] = await Promise.all([
      service.getCars(setIsLoading),
      service.getPlatforms(),
    ])

    if (carsResult.data) {
      // Enrich cars with platform names
      const enrichedCars = carsResult.data.map((car) => {
        const platform = platformsResult.data?.find((p) => p.id === car.platformId)
        return {
          ...car,
          platformName: platform?.name || null,
        }
      })
      dispatch(setCarList(enrichedCars))
    }

    if (platformsResult.data) {
      dispatch(setPlatformList(platformsResult.data))
    }

    dispatch(setIsLoaded(true))

    return {
      success: carsResult.status === 200 && platformsResult.status === 200,
      message: carsResult.message || platformsResult.message,
    }
  }

  // Fetch only cars
  const fetchCars = async () => {
    const result = await service.getCars(setIsLoading)
    if (result.data) {
      // Enrich with platform names
      const enrichedCars = result.data.map((car) => {
        const platform = platformList.find((p) => p.id === car.platformId)
        return {
          ...car,
          platformName: platform?.name || null,
        }
      })
      dispatch(setCarList(enrichedCars))
    }
    return { success: result.status === 200, message: result.message }
  }

  // Search cars by placa
  const searchByPlaca = async (placa: string) => {
    // First ensure we have platforms loaded
    if (platformList.length === 0) {
      const platformsResult = await service.getPlatforms()
      if (platformsResult.data) {
        dispatch(setPlatformList(platformsResult.data))
      }
    }

    const result = await service.searchByPlaca(placa, setIsLoading)
    if (result.data) {
      // Get updated platform list
      const platforms = platformList.length > 0 ? platformList : (await service.getPlatforms()).data || []
      // Enrich with platform names
      const enrichedCars = result.data.map((car) => {
        const platform = platforms.find((p) => p.id === car.platformId)
        return {
          ...car,
          platformName: platform?.name || null,
        }
      })
      dispatch(setCarList(enrichedCars))
    }
    return { success: result.status === 200, message: result.message, data: result.data }
  }

  // Create car
  const createCar = async (formData: FormData) => {
    const result = await service.createCar(formData, setIsOperating)
    if (result.data) {
      // Enrich with platform name
      const platformId = result.data.platformId
      const platform = platformList.find((p) => p.id === platformId)
      const enrichedCar: CarModel = {
        ...result.data,
        platformName: platform?.name || null,
      }
      dispatch(addCar(enrichedCar))
    }
    return { success: result.status === 200 || result.status === 201, message: result.message }
  }

  // Update car
  const updateCar = async (payload: UpdateCarPayload) => {
    const result = await service.updateCar(payload, setIsOperating)
    if (result.data) {
      // Enrich with platform name
      const platform = platformList.find((p) => p.id === result.data!.platformId)
      const enrichedCar: CarModel = {
        ...result.data,
        platformName: platform?.name || null,
      }
      dispatch(updateCarInList(enrichedCar))
    }
    return { success: result.status === 200, message: result.message }
  }

  // Get car details
  const fetchCarDetails = async (id: number) => {
    const result = await service.getCarDetails(id, setIsOperating)
    if (result.data) {
      dispatch(setCarDetails(result.data))
    }
    return { success: result.status === 200, message: result.message, data: result.data }
  }

  // Search modems by IMEI
  const searchModems = async (imei: string) => {
    const result = await service.searchModemsByImei(imei, setIsOperating)
    if (result.data) {
      dispatch(setModemList(result.data))
    }
    return { success: result.status === 200, message: result.message, data: result.data }
  }

  // Assign modem to car
  const assignModem = async (payload: AssignModemPayload) => {
    const result = await service.assignModem(payload, setIsOperating)
    return { success: result.status === 200, message: result.message, status: result.status }
  }

  // Remove modem from car
  const removeModem = async (modemId: number) => {
    const result = await service.removeModem(modemId, setIsOperating)
    return { success: result.status === 200, message: result.message }
  }

  // Fetch car events
  const fetchCarEvents = async (carId: number) => {
    const result = await service.getCarEvents(carId, setIsOperating)
    if (result.data) {
      dispatch(setEventList(result.data))
    }
    return { success: result.status === 200, message: result.message }
  }

  // Create car event
  const createCarEvent = async (formData: FormData) => {
    const result = await service.createCarEvent(formData, setIsOperating)
    if (result.data) {
      dispatch(addEvent(result.data))
    }
    return { success: result.status === 200 || result.status === 201, message: result.message }
  }

  // Upload images
  const uploadImages = async (carId: number, formData: FormData) => {
    const result = await service.uploadImages(carId, formData, setIsOperating)
    return { success: result.status === 200, message: result.message }
  }

  // Search watches by IMEI
  const searchWatches = async (imei: string) => {
    const result = await service.searchWatchesByImei(imei, setIsOperating)
    if (result.data) {
      dispatch(setWatchList(result.data))
    }
    return { success: result.status === 200, message: result.message, data: result.data }
  }

  // Assign watch to car
  const assignWatch = async (payload: AssignWatchPayload) => {
    const result = await service.assignWatch(payload, setIsOperating)
    return { success: result.status === 200, message: result.message, status: result.status }
  }

  // Remove watch from car
  const removeWatch = async (carId: number) => {
    const result = await service.removeWatch(carId, setIsOperating)
    return { success: result.status === 200, message: result.message }
  }

  return {
    isLoading,
    isOperating,
    fetchAllData,
    fetchCars,
    searchByPlaca,
    createCar,
    updateCar,
    fetchCarDetails,
    searchModems,
    assignModem,
    removeModem,
    searchWatches,
    assignWatch,
    removeWatch,
    fetchCarEvents,
    createCarEvent,
    uploadImages,
  }
}
