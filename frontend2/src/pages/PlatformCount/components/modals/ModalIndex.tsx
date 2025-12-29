import React, { useState } from 'react'
import { Modal } from 'reactstrap'
import { showToast } from 'components/toast'
import ModalAdd from './ModalAdd'
import { CreatePlatformCountPayload, ModalState } from '../../models/PlatformCountModel'

interface ModalIndexProps {
  modalState: ModalState
  onClose: () => void
  onCreate: (payload: CreatePlatformCountPayload) => Promise<{ success: boolean; message: string }>
  t: (key: string) => string
}

const ModalIndex: React.FC<ModalIndexProps> = ({
  modalState,
  onClose,
  onCreate,
  t,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toastMessages = {
    Add: { success: 'La plataforma ha sido añadida', error: 'No se pudo añadir la plataforma' },
  }

  const handleOperation = async (
    operation: () => Promise<{ success: boolean; message: string }>,
    modalType: keyof typeof toastMessages
  ): Promise<{ success: boolean; message: string }> => {
    setIsSubmitting(true)
    const result = await operation()

    const messages = toastMessages[modalType]
    if (messages) {
      showToast({
        type: result.success ? 'success' : 'warning',
        title: result.success ? t('Success') : t('Error'),
        message: result.success ? messages.success : messages.error,
      })
    }

    setIsSubmitting(false)
    return result
  }

  const handleCreate = async (payload: CreatePlatformCountPayload) => {
    return handleOperation(() => onCreate(payload), 'Add')
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
