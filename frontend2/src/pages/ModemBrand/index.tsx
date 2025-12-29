import React, { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '../../components/Common/Breadcrumb'
import Header from './components/Header'
import ContentTable from './components/ContentTable'
import ModalIndex from './modals/ModalIndex'
import { useModemBrand, useModemBrandFetch } from './hooks'
import {
  ModemBrandModel,
  CreateModemBrandPayload,
  UpdateModemBrandPayload,
  ModemBrandModalType,
} from './models/ModemBrandModel'

interface ModalState {
  open: boolean
  type: ModemBrandModalType
  size: 'sm' | 'md' | 'lg' | 'xl'
}

const ModemBrandPage: React.FC = () => {
  const { t } = useTranslation()

  // Hooks de ModemBrand
  const { modemBrandList } = useModemBrand()
  const { fetchModemBrands, createModemBrand, updateModemBrand, isLoading } = useModemBrandFetch()

  // Estado local UI
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedModemBrand, setSelectedModemBrand] = useState<ModemBrandModel | null>(null)
  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    type: 'Add',
    size: 'md',
  })

  // Cargar datos al montar el componente
  useEffect(() => {
    document.title = 'Síguelo | Marcas de módem'
    fetchModemBrands()
  }, [])

  // Filtrar modem brands localmente por término de búsqueda
  const filteredModemBrands = modemBrandList.filter((modemBrand) => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return (
      modemBrand.name?.toLowerCase().includes(term) ||
      modemBrand.detail?.toLowerCase().includes(term)
    )
  })

  // Handlers de modal
  const openModal = useCallback((type: ModemBrandModalType, modemBrand?: ModemBrandModel) => {
    if (modemBrand) {
      setSelectedModemBrand(modemBrand)
    }
    setModalState({
      open: true,
      type,
      size: 'md',
    })
  }, [])

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, open: false }))
    setSelectedModemBrand(null)
  }, [])

  // Handlers CRUD
  const handleCreate = async (payload: CreateModemBrandPayload): Promise<{ success: boolean; message: string }> => {
    const result = await createModemBrand(payload)
    return { success: result.success, message: result.message }
  }

  const handleUpdate = async (id: number, payload: UpdateModemBrandPayload): Promise<{ success: boolean; message: string }> => {
    const result = await updateModemBrand(id, payload)
    return { success: result.success, message: result.message }
  }

  // Handlers de acciones de tabla
  const handleEdit = useCallback((modemBrand: ModemBrandModel) => {
    openModal('Edit', modemBrand)
  }, [openModal])

  const handleAddClick = useCallback(() => {
    openModal('Add')
  }, [openModal])

  return (
    <React.Fragment>
      <div className="page-content mb-0 pb-0">
        <div className="container">
          <Breadcrumbs title="Cuadros de mando" breadcrumbItem={t('modem brands')} />

          <div className="card">
            <div className="card-body">
              <Header
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onAddClick={handleAddClick}
                t={t}
              />

              <ContentTable
                modemBrands={filteredModemBrands}
                isLoading={isLoading}
                onEdit={handleEdit}
                t={t}
              />
            </div>
          </div>
        </div>
      </div>

      <ModalIndex
        modalState={modalState}
        selectedModemBrand={selectedModemBrand}
        onClose={closeModal}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        t={t}
      />
    </React.Fragment>
  )
}

export default ModemBrandPage
