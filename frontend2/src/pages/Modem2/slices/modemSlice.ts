import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModemModel, ModemMarkModel, PlatformModel, SimModel, ModemEventModel } from '../models/ModemModel'

interface ModemState {
  modemList: ModemModel[]
  modemMarkList: ModemMarkModel[]
  platformList: PlatformModel[]
  simList: SimModel[]
  eventList: ModemEventModel[]
  isLoaded: boolean
  status: number
  message: string
}

const initialState: ModemState = {
  modemList: [],
  modemMarkList: [],
  platformList: [],
  simList: [],
  eventList: [],
  isLoaded: false,
  status: 200,
  message: '',
}

interface SetStatusPayload {
  status: number
  message?: string
}

const modemSlice = createSlice({
  name: 'modem',
  initialState,
  reducers: {
    // Modems
    setModemList: (state, action: PayloadAction<ModemModel[]>) => {
      state.modemList = action.payload
    },
    addModem: (state, action: PayloadAction<ModemModel>) => {
      state.modemList.push(action.payload)
    },
    updateModemInList: (state, action: PayloadAction<ModemModel>) => {
      const index = state.modemList.findIndex((m) => m.id === action.payload.id)
      if (index !== -1) {
        state.modemList[index] = action.payload
      }
    },
    removeModem: (state, action: PayloadAction<number>) => {
      state.modemList = state.modemList.filter((m) => m.id !== action.payload)
    },

    // Datos relacionados
    setModemMarkList: (state, action: PayloadAction<ModemMarkModel[]>) => {
      state.modemMarkList = action.payload
    },
    setPlatformList: (state, action: PayloadAction<PlatformModel[]>) => {
      state.platformList = action.payload
    },
    setSimList: (state, action: PayloadAction<SimModel[]>) => {
      state.simList = action.payload
    },

    // Eventos
    setEventList: (state, action: PayloadAction<ModemEventModel[]>) => {
      state.eventList = action.payload
    },
    addEvent: (state, action: PayloadAction<ModemEventModel>) => {
      state.eventList.push(action.payload)
    },

    // Status
    setStatus: (state, action: PayloadAction<SetStatusPayload>) => {
      state.status = action.payload.status
      state.message = action.payload.message || ''
    },
    resetStatus: (state) => {
      state.status = 200
      state.message = ''
    },

    // Loaded flag
    setIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload
    },
  },
})

export const {
  setModemList,
  addModem,
  updateModemInList,
  removeModem,
  setModemMarkList,
  setPlatformList,
  setSimList,
  setEventList,
  addEvent,
  setStatus,
  resetStatus,
  setIsLoaded,
} = modemSlice.actions

export default modemSlice.reducer
