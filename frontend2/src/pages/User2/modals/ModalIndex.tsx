import React from 'react'
import { UserModel, ModalType } from '../models/UserModel'
import ModalAdd from './ModalAdd'
import ModalEdit from './ModalEdit'
import ModalPermissions from './ModalPermissions'

interface ModalIndexProps {
  modalType: ModalType | null
  selectedUser: UserModel | null
  onClose: () => void
  t: (key: string) => string
}

const ModalIndex: React.FC<ModalIndexProps> = ({ modalType, selectedUser, onClose, t }) => {
  switch (modalType) {
    case 'Add':
      return <ModalAdd onClose={onClose} t={t} />

    case 'Edit':
      if (!selectedUser) return null
      return <ModalEdit user={selectedUser} onClose={onClose} t={t} />

    case 'Permissions':
      if (!selectedUser) return null
      return <ModalPermissions user={selectedUser} onClose={onClose} t={t} />

    default:
      return null
  }
}

export default ModalIndex
