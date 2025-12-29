import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModemBrandModel } from '../models/ModemBrandModel'

interface ModemBrandState {
  modemBrandList: ModemBrandModel[]
  isLoading: boolean
  isOperating: boolean
}

const initialState: ModemBrandState = {
  modemBrandList: [],
  isLoading: false,
  isOperating: false,
}

const modemBrandSlice = createSlice({
  name: 'modemBrand',
  initialState,
  reducers: {
    setModemBrandList: (state, action: PayloadAction<ModemBrandModel[]>) => {
      state.modemBrandList = action.payload
    },
    addModemBrandToList: (state, action: PayloadAction<ModemBrandModel>) => {
      state.modemBrandList.push(action.payload)
    },
    updateModemBrandInList: (state, action: PayloadAction<ModemBrandModel>) => {
      const index = state.modemBrandList.findIndex((m) => m.id === action.payload.id)
      if (index !== -1) {
        state.modemBrandList[index] = action.payload
      }
    },
    removeModemBrandFromList: (state, action: PayloadAction<number>) => {
      state.modemBrandList = state.modemBrandList.filter((m) => m.id !== action.payload)
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setIsOperating: (state, action: PayloadAction<boolean>) => {
      state.isOperating = action.payload
    },
    resetModemBrandState: () => initialState,
  },
})

export const {
  setModemBrandList,
  addModemBrandToList,
  updateModemBrandInList,
  removeModemBrandFromList,
  setIsLoading,
  setIsOperating,
  resetModemBrandState,
} = modemBrandSlice.actions

export default modemBrandSlice.reducer
