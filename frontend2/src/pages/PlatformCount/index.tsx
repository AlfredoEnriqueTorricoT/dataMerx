import React, { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '../../components/Common/Breadcrumb'
import Header from './components/Header'
import ContentTable from './components/ContentTable'
import ModalIndex from './components/modals/ModalIndex'
import { usePlatformCount, usePlatformCountFetch } from './hooks'
import { CreatePlatformCountPayload, ModalType, ModalState, PlatformCountModel } from './models/PlatformCountModel'

const PlatformCountPage: React.FC = () => {
  const { t } = useTranslation()

  // Hooks de PlatformCount
  const { platformCounts, modemImeiList } = usePlatformCount()
  const { fetchPlatformCounts, createPlatformCount, fetchModemsByPlatform, isLoading } = usePlatformCountFetch()

  // Estado local UI
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformCountModel | null>(null)
  const [isLoadingModems, setIsLoadingModems] = useState(false)
  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    type: 'Add',
    size: 'md',
  })

  // Cargar datos al montar el componente
  useEffect(() => {
    document.title = 'Síguelo | Conteo de Plataformas'
    fetchPlatformCounts()
  }, [])

  // Filtrar localmente por término de búsqueda
  const filteredPlatformCounts = platformCounts.filter((item) => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return item.name.toLowerCase().includes(term)
  })

  // Handlers de modal
  const openModal = useCallback((type: ModalType) => {
    setModalState({
      open: true,
      type,
      size: 'md',
    })
  }, [])

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, open: false }))
  }, [])

  // Handlers CRUD
  const handleCreate = async (payload: CreatePlatformCountPayload): Promise<{ success: boolean; message: string }> => {
    return await createPlatformCount(payload)
  }

  const handleAddClick = useCallback(() => {
    openModal('Add')
  }, [openModal])

  const handleViewModems = useCallback(async (platform: PlatformCountModel) => {
    setSelectedPlatform(platform)
    setIsLoadingModems(true)
    openModal('ModemList')
    await fetchModemsByPlatform(platform.id)
    setIsLoadingModems(false)
  }, [openModal, fetchModemsByPlatform])

  return (
    <React.Fragment>
      <div className="page-content mb-0 pb-0">
        <div className="container">
          <Breadcrumbs title="Cuadros de mando" breadcrumbItem={t('Conteo de dispositivos')} />

          <div className="card">
            <div className="card-body">
              <Header
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onAddClick={handleAddClick}
                t={t}
              />

              <ContentTable
                platformCounts={filteredPlatformCounts}
                isLoading={isLoading}
                onViewModems={handleViewModems}
                t={t}
              />
            </div>
          </div>
        </div>
      </div>

      <ModalIndex
        modalState={modalState}
        onClose={closeModal}
        onCreate={handleCreate}
        selectedPlatform={selectedPlatform}
        modemImeiList={modemImeiList}
        isLoadingModems={isLoadingModems}
        t={t}
      />
    </React.Fragment>
  )
}

export default PlatformCountPage
