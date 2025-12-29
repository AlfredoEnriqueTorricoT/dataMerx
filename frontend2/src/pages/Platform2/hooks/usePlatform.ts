import { useSelector } from 'react-redux'
import { PlatformModel, WifiModel, PlatformModalType } from '../models/PlatformModel'

interface PlatformState {
  platformList: PlatformModel[]
  selectedPlatform: PlatformModel | null
  wifiList: WifiModel[]
  modalType: PlatformModalType
  isLoading: boolean
  isOperating: boolean
}

interface RootState {
  Platform2: PlatformState
}

export const usePlatform = () => {
  const platformList = useSelector((state: RootState) => state.Platform2.platformList)
  const selectedPlatform = useSelector((state: RootState) => state.Platform2.selectedPlatform)
  const wifiList = useSelector((state: RootState) => state.Platform2.wifiList)
  const modalType = useSelector((state: RootState) => state.Platform2.modalType)
  const isLoading = useSelector((state: RootState) => state.Platform2.isLoading)
  const isOperating = useSelector((state: RootState) => state.Platform2.isOperating)

  return {
    platformList,
    selectedPlatform,
    wifiList,
    modalType,
    isLoading,
    isOperating,
  }
}
