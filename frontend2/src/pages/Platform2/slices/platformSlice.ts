import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlatformModel, WifiModel, PlatformModalType } from '../models/PlatformModel'

interface PlatformState {
  platformList: PlatformModel[]
  selectedPlatform: PlatformModel | null
  wifiList: WifiModel[]
  modalType: PlatformModalType
  isLoading: boolean
  isOperating: boolean
}

const initialState: PlatformState = {
  platformList: [],
  selectedPlatform: null,
  wifiList: [],
  modalType: null,
  isLoading: false,
  isOperating: false,
}

const platformSlice = createSlice({
  name: 'platform2',
  initialState,
  reducers: {
    setPlatformList: (state, action: PayloadAction<PlatformModel[]>) => {
      state.platformList = action.payload
    },
    addPlatformToList: (state, action: PayloadAction<PlatformModel>) => {
      state.platformList.push(action.payload)
    },
    updatePlatformInList: (state, action: PayloadAction<PlatformModel>) => {
      const index = state.platformList.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.platformList[index] = action.payload
      }
    },
    removePlatformFromList: (state, action: PayloadAction<number>) => {
      state.platformList = state.platformList.filter((p) => p.id !== action.payload)
    },
    setSelectedPlatform: (state, action: PayloadAction<PlatformModel | null>) => {
      state.selectedPlatform = action.payload
    },
    setWifiList: (state, action: PayloadAction<WifiModel[]>) => {
      state.wifiList = action.payload
    },
    addWifiToList: (state, action: PayloadAction<WifiModel>) => {
      state.wifiList.push(action.payload)
    },
    updateWifiInList: (state, action: PayloadAction<WifiModel>) => {
      const index = state.wifiList.findIndex((w) => w.id === action.payload.id)
      if (index !== -1) {
        state.wifiList[index] = action.payload
      }
    },
    removeWifiFromList: (state, action: PayloadAction<number>) => {
      state.wifiList = state.wifiList.filter((w) => w.id !== action.payload)
    },
    setModalType: (state, action: PayloadAction<PlatformModalType>) => {
      state.modalType = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setIsOperating: (state, action: PayloadAction<boolean>) => {
      state.isOperating = action.payload
    },
    resetPlatformState: () => initialState,
  },
})

export const {
  setPlatformList,
  addPlatformToList,
  updatePlatformInList,
  removePlatformFromList,
  setSelectedPlatform,
  setWifiList,
  addWifiToList,
  updateWifiInList,
  removeWifiFromList,
  setModalType,
  setIsLoading,
  setIsOperating,
  resetPlatformState,
} = platformSlice.actions

export default platformSlice.reducer
