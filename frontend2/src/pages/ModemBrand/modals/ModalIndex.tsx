import React, { useState } from 'react'
import { Modal } from 'reactstrap'
import { showToast } from 'components/toast'
import ModalAdd from './ModalAdd'
import ModalEdit from './ModalEdit'
import {
  ModemBrandModel,
  ModemBrandModalType,
  CreateModemBrandPayload,
  UpdateModemBrandPayload,
} from '../models/ModemBrandModel'

interface ModalState {
  open: boolean
  type: ModemBrandModalType
  size: 'sm' | 'md' | 'lg' | 'xl'
}

interface ModalIndexProps {
  modalState: ModalState
  selectedModemBrand: ModemBrandModel | null
  onClose: () => void
  onCreate: (payload: CreateModemBrandPayload) => Promise<{ success: boolean; message: string }>
  onUpdate: (id: number, payload: UpdateModemBrandPayload) => Promise<{ success: boolean; message: string }>
  t: (key: string) => string
}

const ModalIndex: React.FC<ModalIndexProps> = ({
  modalState,
  selectedModemBrand,
  onClose,
  onCreate,
  onUpdate,
  t,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toastMessages = {
    Add: { success: 'La marca de módem ha sido añadida', error: 'No se pudo añadir la marca de módem' },
    Edit: { success: 'La marca de módem ha sido editada', error: 'No se pudo editar la marca de módem' },
  }

  const handleOperation = async (
    operation: () => Promise<{ success: boolean; message: string }>,
    modalType: ModemBrandModalType
  ): Promise<{ success: boolean; message: string }> => {
    setIsSubmitting(true)
    const result = await operation()

    if (modalType) {
      const messages = toastMessages[modalType as keyof typeof toastMessages]
      if (messages) {
        showToast({
          type: result.success ? 'success' : 'warning',
          title: result.success ? t('Success') : t('Error'),
          message: result.success ? messages.success : messages.error,
        })
      }
    }

    setIsSubmitting(false)
    return result
  }

  const handleCreate = async (payload: CreateModemBrandPayload) => {
    return handleOperation(() => onCreate(payload), 'Add')
  }

  const handleUpdate = async (id: number, payload: UpdateModemBrandPayload) => {
    return handleOperation(() => onUpdate(id, payload), 'Edit')
  }

  const renderModal = () => {
    switch (modalState.type) {
      case 'Add':
        return (
          <ModalAdd
            onSubmit={handleCreate}
            onClose={onClose}
            isSubmitting={isSubmitting}
            t={t}
          />
        )
      case 'Edit':
        if (!selectedModemBrand) return null
        return (
          <ModalEdit
            modemBrand={selectedModemBrand}
            onSubmit={handleUpdate}
            onClose={onClose}
            isSubmitting={isSubmitting}
            t={t}
          />
        )
      default:
        return null
    }
  }

  return (
    <Modal isOpen={modalState.open} toggle={onClose} size={modalState.size} centered>
      {renderModal()}
    </Modal>
  )
}

export default ModalIndex
