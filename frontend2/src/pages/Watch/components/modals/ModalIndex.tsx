import React, { useState } from 'react'
import { Modal } from 'reactstrap'
import { showToast } from 'components/toast'
import ModalAdd from './ModalAdd'
import ModalEdit from './ModalEdit'
import ModalDelete from './ModalDelete'
import ModalSettings from './ModalSettings'
import { WatchModel, CreateWatchPayload, UpdateWatchPayload, ConfigureWatchPayload } from '../../models/WatchModel'

type ModalType = 'Add' | 'Edit' | 'Delete' | 'Settings' | 'Details'

interface ModalState {
  open: boolean
  type: ModalType
  size: 'sm' | 'md' | 'lg' | 'xl'
}

interface ModalIndexProps {
  modalState: ModalState
  selectedWatch: WatchModel | null
  onClose: () => void
  onCreate: (payload: CreateWatchPayload) => Promise<{ success: boolean; message: string }>
  onUpdate: (id: number, payload: UpdateWatchPayload) => Promise<{ success: boolean; message: string }>
  onDelete: (id: number) => Promise<{ success: boolean; message: string }>
  onConfigure: (payload: ConfigureWatchPayload) => Promise<{ success: boolean; message: string }>
  t: (key: string) => string
}

const ModalIndex: React.FC<ModalIndexProps> = ({
  modalState,
  selectedWatch,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
  onConfigure,
  t,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toastMessages = {
    Add: { success: 'El reloj ha sido añadido', error: 'No se pudo añadir el reloj' },
    Edit: { success: 'El reloj ha sido editado', error: 'No se pudo editar el reloj' },
    Delete: { success: 'El reloj ha sido eliminado', error: 'No se pudo eliminar el reloj' },
    Settings: { success: 'El reloj ha sido configurado', error: 'No se pudo configurar el reloj' },
  }

  const handleOperation = async <T,>(
    operation: () => Promise<{ success: boolean; message: string }>,
    modalType: ModalType
  ): Promise<{ success: boolean; message: string }> => {
    setIsSubmitting(true)
    const result = await operation()

    const messages = toastMessages[modalType as keyof typeof toastMessages]
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

  const handleCreate = async (payload: CreateWatchPayload) => {
    return handleOperation(() => onCreate(payload), 'Add')
  }

  const handleUpdate = async (id: number, payload: UpdateWatchPayload) => {
    return handleOperation(() => onUpdate(id, payload), 'Edit')
  }

  const handleDelete = async (id: number) => {
    return handleOperation(() => onDelete(id), 'Delete')
  }

  const handleConfigure = async (payload: ConfigureWatchPayload) => {
    return handleOperation(() => onConfigure(payload), 'Settings')
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
        if (!selectedWatch) return null
        return (
          <ModalEdit
            watch={selectedWatch}
            onSubmit={handleUpdate}
            onClose={onClose}
            isSubmitting={isSubmitting}
            t={t}
          />
        )
      case 'Delete':
        if (!selectedWatch) return null
        return (
          <ModalDelete
            watch={selectedWatch}
            onSubmit={handleDelete}
            onClose={onClose}
            isSubmitting={isSubmitting}
            t={t}
          />
        )
      case 'Settings':
        if (!selectedWatch) return null
        return (
          <ModalSettings
            watch={selectedWatch}
            onSubmit={handleConfigure}
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
