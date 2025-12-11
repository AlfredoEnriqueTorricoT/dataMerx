import React, { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '../../components/Common/Breadcrumb'
import Header from './components/Header'
import ContentTable from './components/ContentTable'
import ModalIndex from './components/modals/ModalIndex'
import { useWatch, useWatchFetch } from './hooks'
import {
  WatchModel,
  CreateWatchPayload,
  UpdateWatchPayload,
  ConfigureWatchPayload,
  ModalType,
  ModalState,
} from './models/WatchModel'

const WatchPage: React.FC = () => {
  const { t } = useTranslation()

  // Hooks de Watch
  const { watches } = useWatch()
  const { fetchWatches, createWatch, updateWatch, deleteWatch, configureWatch, isLoading } = useWatchFetch()

  // Estado local UI
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedWatch, setSelectedWatch] = useState<WatchModel | null>(null)
  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    type: 'Add',
    size: 'md',
  })

  // Cargar datos al montar el componente
  useEffect(() => {
    document.title = 'Síguelo | Relojes'
    fetchWatches()
  }, [])

  // Filtrar watches localmente por término de búsqueda
  const filteredWatches = watches.filter((watch) => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return (
      watch.imei?.toLowerCase().includes(term) ||
      watch.code?.toLowerCase().includes(term) ||
      watch.id.toString().includes(term)
    )
  })

  // Handlers de modal
  const openModal = useCallback((type: ModalType, watch?: WatchModel) => {
    if (watch) {
      setSelectedWatch(watch)
    }
    setModalState({
      open: true,
      type,
      size: type === 'Delete' ? 'sm' : 'md',
    })
  }, [setSelectedWatch])

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, open: false }))
    setSelectedWatch(null)
  }, [setSelectedWatch])

  // Handlers CRUD - Redux ya se actualiza directamente en useWatchFetch
  const handleCreate = async (payload: CreateWatchPayload): Promise<{ success: boolean; message: string }> => {
    return await createWatch(payload)
  }

  const handleUpdate = async (id: number, payload: UpdateWatchPayload): Promise<{ success: boolean; message: string }> => {
    return await updateWatch(id, payload)
  }

  const handleDelete = async (id: number): Promise<{ success: boolean; message: string }> => {
    return await deleteWatch(id)
  }

  const handleConfigure = async (payload: ConfigureWatchPayload): Promise<{ success: boolean; message: string }> => {
    return await configureWatch(payload)
  }

  // Handlers de acciones de tabla
  const handleEdit = useCallback((watch: WatchModel) => {
    openModal('Edit', watch)
  }, [openModal])

  const handleDeleteClick = useCallback((watch: WatchModel) => {
    openModal('Delete', watch)
  }, [openModal])

  const handleSettings = useCallback((watch: WatchModel) => {
    openModal('Settings', watch)
  }, [openModal])

  const handleAddClick = useCallback(() => {
    openModal('Add')
  }, [openModal])

  return (
    <React.Fragment>
      <div className="page-content mb-0 pb-0">
        <div className="container">
          <Breadcrumbs title="Cuadros de mando" breadcrumbItem={t('watches')} />

          <div className="card">
            <div className="card-body">
              <Header
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onAddClick={handleAddClick}
                t={t}
              />

              <ContentTable
                watches={filteredWatches}
                isLoading={isLoading}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                onSettings={handleSettings}
                t={t}
              />
            </div>
          </div>
        </div>
      </div>

      <ModalIndex
        modalState={modalState}
        selectedWatch={selectedWatch}
        onClose={closeModal}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onConfigure={handleConfigure}
        t={t}
      />
    </React.Fragment>
  )
}

export default WatchPage
