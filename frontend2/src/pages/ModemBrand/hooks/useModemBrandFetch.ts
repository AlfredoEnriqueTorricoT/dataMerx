import { useDispatch } from 'react-redux'
import { useModemBrand } from './useModemBrand'
import { ModemBrandApiService } from '../services/ModemBrandApiService'
import {
  setModemBrandList,
  addModemBrandToList,
  updateModemBrandInList,
  removeModemBrandFromList,
  setIsLoading,
  setIsOperating,
} from '../slices/modemBrandSlice'
import { CreateModemBrandPayload, UpdateModemBrandPayload } from '../models/ModemBrandModel'

export const useModemBrandFetch = () => {
  const dispatch = useDispatch()
  const { isLoading, isOperating } = useModemBrand()
  const service = new ModemBrandApiService()

  const fetchModemBrands = async () => {
    dispatch(setIsLoading(true))
    const response = await service.getModemBrands()
    dispatch(setIsLoading(false))

    if (response.status === 200 && response.data) {
      dispatch(setModemBrandList(response.data))
      return { success: true, data: response.data }
    }
    return { success: false, data: null }
  }

  const createModemBrand = async (payload: CreateModemBrandPayload) => {
    dispatch(setIsOperating(true))
    const response = await service.createModemBrand(payload)
    dispatch(setIsOperating(false))

    if (response.status === 200 && response.data) {
      dispatch(addModemBrandToList(response.data))
      return { success: true, data: response.data, message: 'Marca creada' }
    }
    return { success: false, data: null, message: 'Error al crear' }
  }

  const updateModemBrand = async (id: number, payload: UpdateModemBrandPayload) => {
    dispatch(setIsOperating(true))
    const response = await service.updateModemBrand(id, payload)
    dispatch(setIsOperating(false))

    if (response.status === 200 && response.data) {
      dispatch(updateModemBrandInList(response.data))
      return { success: true, data: response.data, message: 'Marca actualizada' }
    }
    return { success: false, data: null, message: 'Error al actualizar' }
  }

  const deleteModemBrand = async (id: number) => {
    dispatch(setIsOperating(true))
    const response = await service.deleteModemBrand(id)
    dispatch(setIsOperating(false))

    if (response.status === 200) {
      dispatch(removeModemBrandFromList(id))
      return { success: true, message: 'Marca eliminada' }
    }
    return { success: false, message: 'Error al eliminar' }
  }

  return {
    isLoading,
    isOperating,
    fetchModemBrands,
    createModemBrand,
    updateModemBrand,
    deleteModemBrand,
  }
}
