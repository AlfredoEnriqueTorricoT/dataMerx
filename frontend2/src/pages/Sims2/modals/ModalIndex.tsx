import React from 'react'
import ModalAdd from './ModalAdd'
import ModalEdit from './ModalEdit'
import ModalDetails from './ModalDetails'
import ModalChangeStatus from './ModalChangeStatus'
import ModalAddImages from './ModalAddImages'
import ModalAddEvent from './ModalAddEvent'
import ModalEvents from './ModalEvents'
import { SimModel, ModalType } from '../models/SimModel'

interface ModalIndexProps {
  modalType: ModalType | null
  selectedSim: SimModel | null
  onClose: () => void
  t: (key: string) => string
}

const ModalIndex: React.FC<ModalIndexProps> = ({ modalType, selectedSim, onClose, t }) => {
  const renderModal = () => {
    switch (modalType) {
      case 'Add':
        return <ModalAdd onClose={onClose} t={t} />

      case 'Edit':
        if (!selectedSim) return null
        return <ModalEdit sim={selectedSim} onClose={onClose} t={t} />

      case 'Details':
        if (!selectedSim) return null
        return <ModalDetails sim={selectedSim} onClose={onClose} t={t} />

      case 'ChangeStatus':
        if (!selectedSim) return null
        return <ModalChangeStatus sim={selectedSim} onClose={onClose} t={t} />

      case 'AddImages':
        if (!selectedSim) return null
        return <ModalAddImages sim={selectedSim} onClose={onClose} t={t} />

      case 'AddEvent':
        if (!selectedSim) return null
        return <ModalAddEvent sim={selectedSim} onClose={onClose} t={t} />

      case 'Events':
        if (!selectedSim) return null
        return <ModalEvents sim={selectedSim} onClose={onClose} t={t} />

      default:
        return null
    }
  }

  return <>{renderModal()}</>
}

export default ModalIndex
