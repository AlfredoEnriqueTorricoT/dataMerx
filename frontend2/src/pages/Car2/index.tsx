import React, { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import { Modal } from 'reactstrap'

import Breadcrumbs from '../../components/Common/Breadcrumb'
import { Header, ContentTable } from './components'
import { ModalIndex } from './modals'
import { useCar, useCarFetch } from './hooks'
import { CarModel, ModalType } from './models/CarModel'

interface CarPageProps {
  t: (key: string) => string
}

const _crudName = { single: 'car', multiple: 'cars', cod: 'car' }

const CarPage: React.FC<CarPageProps> = ({ t }) => {
  // Search state
  const [searchTerm, setSearchTerm] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [modalType, setModalType] = useState<ModalType | null>(null)
  const [selectedCar, setSelectedCar] = useState<CarModel | null>(null)

  // Hooks
  const { carList } = useCar()
  const { searchByPlaca, isLoading } = useCarFetch()

  // Set page title
  useEffect(() => {
    document.title = 'Síguelo | Vehículos'
  }, [])

  // Open modal handler
  const handleOpenModal = (type: ModalType, car?: CarModel) => {
    setModalType(type)
    setSelectedCar(car || null)

    // Set modal size based on type
    if (type === 'Events' || type === 'Details' || type === 'Modem') {
      setModalSize('lg')
    } else {
      setModalSize('md')
    }

    setModalOpen(true)
  }

  // Close modal handler
  const handleCloseModal = () => {
    setModalOpen(false)
    setModalType(null)
    setSelectedCar(null)
  }

  // Search handlers
  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term)
  }

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      await searchByPlaca(searchTerm.trim())
      setHasSearched(true)
    }
  }

  return (
    <>
      <div className="page-content mb-0 pb-0">
        <div className="container">
          <Breadcrumbs title="Cuadros de mando" breadcrumbItem={t(_crudName.multiple)} />

          <div className="card">
            <div className="card-body">
              <div className="card-title mb-4 h4">
                {t('List of') + ' ' + t(_crudName.multiple)}
              </div>

              <Header
                isLoading={isLoading}
                searchTerm={searchTerm}
                onSearchTermChange={handleSearchTermChange}
                onSearch={handleSearch}
                onAddClick={() => handleOpenModal('Add')}
                t={t}
              />

              {!hasSearched ? (
                <div className="text-center py-5">
                  <i className="fas fa-search fa-3x text-muted mb-3"></i>
                  <h5 className="text-muted">Ingrese una placa para buscar vehículos</h5>
                  <p className="text-muted small">Escriba la placa y presione Enter o el botón de búsqueda</p>
                </div>
              ) : (
                <ContentTable
                  cars={carList}
                  isLoading={isLoading}
                  onOpenModal={handleOpenModal}
                  t={t}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} size={modalSize}>
        <ModalIndex
          modalType={modalType}
          selectedCar={selectedCar}
          onClose={handleCloseModal}
          t={t}
        />
      </Modal>
    </>
  )
}

export default withTranslation()(CarPage)
