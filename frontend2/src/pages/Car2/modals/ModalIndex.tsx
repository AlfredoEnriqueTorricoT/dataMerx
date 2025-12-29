import React from 'react'
import ModalAdd from './ModalAdd'
import ModalEdit from './ModalEdit'
import ModalDetails from './ModalDetails'
import ModalModem from './ModalModem'
import ModalAddEvent from './ModalAddEvent'
import ModalAddImages from './ModalAddImages'
import ModalEvents from './ModalEvents'
import { CarModel, ModalType } from '../models/CarModel'

interface ModalIndexProps {
  modalType: ModalType | null
  selectedCar: CarModel | null
  onClose: () => void
  t: (key: string) => string
}

const ModalIndex: React.FC<ModalIndexProps> = ({ modalType, selectedCar, onClose, t }) => {
  const renderModal = () => {
    switch (modalType) {
      case 'Add':
        return <ModalAdd onClose={onClose} t={t} />

      case 'Edit':
        if (!selectedCar) return null
        return <ModalEdit car={selectedCar} onClose={onClose} t={t} />

      case 'Details':
        if (!selectedCar) return null
        return <ModalDetails car={selectedCar} onClose={onClose} t={t} />

      case 'Modem':
        if (!selectedCar) return null
        return <ModalModem car={selectedCar} onClose={onClose} t={t} />

      case 'AddEvent':
        if (!selectedCar) return null
        return <ModalAddEvent car={selectedCar} onClose={onClose} t={t} />

      case 'AddImages':
        if (!selectedCar) return null
        return <ModalAddImages car={selectedCar} onClose={onClose} t={t} />

      case 'Events':
        if (!selectedCar) return null
        return <ModalEvents car={selectedCar} onClose={onClose} t={t} />

      default:
        return null
    }
  }

  return <>{renderModal()}</>
}

export default ModalIndex
