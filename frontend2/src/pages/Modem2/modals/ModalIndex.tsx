import React from 'react'
import { ModemModel, ModalType, FilterItem } from '../models/ModemModel'

import ModalAdd from './ModalAdd'
import ModalEdit from './ModalEdit'
import ModalDetails from './ModalDetails'
import ModalSim from './ModalSim'
import ModalTransfer from './ModalTransfer'
import ModalCancelTransfer from './ModalCancelTransfer'
import ModalTransferRequest from './ModalTransferRequest'
import ModalChangeStatus from './ModalChangeStatus'
import ModalFilter from './ModalFilter'
import ModalAddEvent from './ModalAddEvent'
import ModalAddImages from './ModalAddImages'
import ModalEvents from './ModalEvents'

interface ModalIndexProps {
  modalType: ModalType | null
  selectedModem: ModemModel | null
  isTabletOrMobile: boolean
  onClose: () => void
  onApplyFilter: (filters: FilterItem[], lastSearch: 'my' | 'filter') => void
  t: (key: string) => string
}

const ModalIndex: React.FC<ModalIndexProps> = ({
  modalType,
  selectedModem,
  isTabletOrMobile,
  onClose,
  onApplyFilter,
  t,
}) => {
  if (!modalType) return null

  switch (modalType) {
    case 'Add':
      return <ModalAdd onClose={onClose} t={t} />

    case 'Edit':
      if (!selectedModem) return null
      return <ModalEdit modem={selectedModem} onClose={onClose} t={t} />

    case 'Details':
      if (!selectedModem) return null
      return <ModalDetails modem={selectedModem} onClose={onClose} />

    case 'Sim':
      if (!selectedModem) return null
      return <ModalSim modem={selectedModem} onClose={onClose} />

    case 'Transfer':
      if (!selectedModem) return null
      return <ModalTransfer modem={selectedModem} onClose={onClose} t={t} />

    case 'CancelTransfer':
      if (!selectedModem) return null
      return <ModalCancelTransfer modem={selectedModem} onClose={onClose} t={t} />

    case 'TransferRequest':
      if (!selectedModem) return null
      return <ModalTransferRequest modem={selectedModem} onClose={onClose} t={t} />

    case 'ChangeStatus':
      if (!selectedModem) return null
      return <ModalChangeStatus modem={selectedModem} onClose={onClose} t={t} />

    case 'Filter':
      return (
        <ModalFilter
          isTabletOrMobile={isTabletOrMobile}
          onClose={onClose}
          onApplyFilter={onApplyFilter}
          t={t}
        />
      )

    case 'AddEvent':
      if (!selectedModem) return null
      return <ModalAddEvent modem={selectedModem} onClose={onClose} t={t} />

    case 'AddImages':
      if (!selectedModem) return null
      return <ModalAddImages modem={selectedModem} onClose={onClose} t={t} />

    case 'Events':
      if (!selectedModem) return null
      return <ModalEvents modem={selectedModem} onClose={onClose} t={t} />

    default:
      return null
  }
}

export default ModalIndex
