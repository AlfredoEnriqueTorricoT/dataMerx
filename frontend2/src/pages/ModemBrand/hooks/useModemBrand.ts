import { useSelector } from 'react-redux'
import { ModemBrandModel } from '../models/ModemBrandModel'

interface ModemBrandState {
  modemBrandList: ModemBrandModel[]
  isLoading: boolean
  isOperating: boolean
}

interface RootState {
  ModemBrand: ModemBrandState
}

export const useModemBrand = () => {
  const modemBrandList = useSelector((state: RootState) => state.ModemBrand.modemBrandList)
  const isLoading = useSelector((state: RootState) => state.ModemBrand.isLoading)
  const isOperating = useSelector((state: RootState) => state.ModemBrand.isOperating)

  return {
    modemBrandList,
    isLoading,
    isOperating,
  }
}
