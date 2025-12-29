import React, { useState } from 'react'
import { Modal } from 'reactstrap'
import { showToast } from 'components/toast'
import ModalAdd from './ModalAdd'
import ModalEdit from './ModalEdit'
import ModalWifi from './ModalWifi'
import {
  PlatformModel,
  PlatformModalType,
  CreatePlatformPayload,
  UpdatePlatformPayload,
} from '../models/PlatformModel'

interface ModalState {
  open: boolean
  type: PlatformModalType
  size: 'sm' | 'md' | 'lg' | 'xl'
}

interface ModalIndexProps {
  modalState: ModalState
  selectedPlatform: PlatformModel | null
  onClose: () => void
  onCreate: (payload: CreatePlatformPayload) => Promise<{ success: boolean; message: string }>
  onUpdate: (id: number, payload: UpdatePlatformPayload) => Promise<{ success: boolean; message: string }>
  onDelete: (id: number) => Promise<{ success: boolean; message: string }>
  t: (key: string) => string
}

const ModalIndex: React.FC<ModalIndexProps> = ({
  modalState,
  selectedPlatform,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
  t,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toastMessages = {
    Add: { success: 'La plataforma ha sido añadida', error: 'No se pudo añadir la plataforma' },
    Edit: { success: 'La plataforma ha sido editada', error: 'No se pudo editar la plataforma' },
    Wifi: { success: 'Configuración de Wi-Fi guardada', error: 'No se pudo guardar la configuración' },
  }

  const handleOperation = async <T,>(
    operation: () => Promise<{ success: boolean; message: string }>,
    modalType: PlatformModalType
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

  const handleCreate = async (payload: CreatePlatformPayload) => {
    return handleOperation(() => onCreate(payload), 'Add')
  }

  const handleUpdate = async (id: number, payload: UpdatePlatformPayload) => {
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
        if (!selectedPlatform) return null
        return (
          <ModalEdit
            platform={selectedPlatform}
            onSubmit={handleUpdate}
            onClose={onClose}
            isSubmitting={isSubmitting}
            t={t}
          />
        )
      case 'Wifi':
        if (!selectedPlatform) return null
        return (
          <ModalWifi
            platform={selectedPlatform}
            onClose={onClose}
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
