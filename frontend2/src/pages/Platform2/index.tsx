import React, { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '../../components/Common/Breadcrumb'
import Header from './components/Header'
import ContentTable from './components/ContentTable'
import ModalIndex from './modals/ModalIndex'
import { usePlatform, usePlatformFetch } from './hooks'
import {
  PlatformModel,
  CreatePlatformPayload,
  UpdatePlatformPayload,
  PlatformModalType,
} from './models/PlatformModel'

interface ModalState {
  open: boolean
  type: PlatformModalType
  size: 'sm' | 'md' | 'lg' | 'xl'
}

const PlatformPage: React.FC = () => {
  const { t } = useTranslation()

  // Hooks de Platform
  const { platformList } = usePlatform()
  const { fetchPlatforms, createPlatform, updatePlatform, deletePlatform, isLoading } = usePlatformFetch()

  // Estado local UI
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformModel | null>(null)
  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    type: 'Add',
    size: 'md',
  })

  // Cargar datos al montar el componente
  useEffect(() => {
    document.title = 'Síguelo | Plataformas'
    fetchPlatforms()
  }, [])

  // Filtrar platforms localmente por término de búsqueda
  const filteredPlatforms = platformList.filter((platform) => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return (
      platform.name?.toLowerCase().includes(term) ||
      platform.detail?.toLowerCase().includes(term) ||
      platform.email?.toLowerCase().includes(term)
    )
  })

  // Handlers de modal
  const openModal = useCallback((type: PlatformModalType, platform?: PlatformModel) => {
    if (platform) {
      setSelectedPlatform(platform)
    }
    setModalState({
      open: true,
      type,
      size: 'md',
    })
  }, [])

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, open: false }))
    setSelectedPlatform(null)
  }, [])

  // Handlers CRUD
  const handleCreate = async (payload: CreatePlatformPayload): Promise<{ success: boolean; message: string }> => {
    const result = await createPlatform(payload)
    return { success: result.success, message: result.success ? 'Plataforma creada' : 'Error al crear' }
  }

  const handleUpdate = async (id: number, payload: UpdatePlatformPayload): Promise<{ success: boolean; message: string }> => {
    const result = await updatePlatform(id, payload)
    return { success: result.success, message: result.success ? 'Plataforma actualizada' : 'Error al actualizar' }
  }

  const handleDelete = async (id: number): Promise<{ success: boolean; message: string }> => {
    const result = await deletePlatform(id)
    return { success: result.success, message: result.success ? 'Plataforma eliminada' : 'Error al eliminar' }
  }

  // Handlers de acciones de tabla
  const handleEdit = useCallback((platform: PlatformModel) => {
    openModal('Edit', platform)
  }, [openModal])

  const handleWifi = useCallback((platform: PlatformModel) => {
    openModal('Wifi', platform)
  }, [openModal])

  const handleAddClick = useCallback(() => {
    openModal('Add')
  }, [openModal])

  return (
    <React.Fragment>
      <div className="page-content mb-0 pb-0">
        <div className="container">
          <Breadcrumbs title="Cuadros de mando" breadcrumbItem={t('Platforms')} />

          <div className="card">
            <div className="card-body">
              <Header
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onAddClick={handleAddClick}
                t={t}
              />

              <ContentTable
                platforms={filteredPlatforms}
                isLoading={isLoading}
                onEdit={handleEdit}
                onWifi={handleWifi}
                t={t}
              />
            </div>
          </div>
        </div>
      </div>

      <ModalIndex
        modalState={modalState}
        selectedPlatform={selectedPlatform}
        onClose={closeModal}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        t={t}
      />
    </React.Fragment>
  )
}

export default PlatformPage
