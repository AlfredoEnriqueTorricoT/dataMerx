import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  CarModel,
  CarDetailsModel,
  CarEventModel,
  ModemModel,
  PlatformModel,
} from '../models/CarModel'

interface CarState {
  carList: CarModel[]
  carDetails: CarDetailsModel | null
  eventList: CarEventModel[]
  modemList: ModemModel[]
  platformList: PlatformModel[]
  isLoaded: boolean
  status: number
  message: string
}

const initialState: CarState = {
  carList: [],
  carDetails: null,
  eventList: [],
  modemList: [],
  platformList: [],
  isLoaded: false,
  status: 0,
  message: '',
}

const carSlice = createSlice({
  name: 'car2',
  initialState,
  reducers: {
    setCarList: (state, action: PayloadAction<CarModel[]>) => {
      state.carList = action.payload
    },
    addCar: (state, action: PayloadAction<CarModel>) => {
      state.carList.push(action.payload)
    },
    updateCarInList: (state, action: PayloadAction<CarModel>) => {
      const index = state.carList.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) {
        state.carList[index] = action.payload
      }
    },
    removeCar: (state, action: PayloadAction<number>) => {
      state.carList = state.carList.filter((item) => item.id !== action.payload)
    },
    setCarDetails: (state, action: PayloadAction<CarDetailsModel | null>) => {
      state.carDetails = action.payload
    },
    setEventList: (state, action: PayloadAction<CarEventModel[]>) => {
      state.eventList = action.payload
    },
    addEvent: (state, action: PayloadAction<CarEventModel>) => {
      state.eventList.unshift(action.payload)
    },
    setModemList: (state, action: PayloadAction<ModemModel[]>) => {
      state.modemList = action.payload
    },
    setPlatformList: (state, action: PayloadAction<PlatformModel[]>) => {
      state.platformList = action.payload
    },
    setIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload
    },
    setStatus: (state, action: PayloadAction<{ status: number; message?: string }>) => {
      state.status = action.payload.status
      state.message = action.payload.message || ''
    },
  },
})

export const {
  setCarList,
  addCar,
  updateCarInList,
  removeCar,
  setCarDetails,
  setEventList,
  addEvent,
  setModemList,
  setPlatformList,
  setIsLoaded,
  setStatus,
} = carSlice.actions

export default carSlice.reducer
