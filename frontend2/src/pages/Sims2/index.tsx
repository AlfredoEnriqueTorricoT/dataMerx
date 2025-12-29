import React, { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import { Modal } from 'reactstrap'

import Breadcrumbs from '../../components/Common/Breadcrumb'
import { Header, ContentTable } from './components'
import { ModalIndex } from './modals'
import { useSim, useSimFetch } from './hooks'
import { SimModel, ModalType } from './models/SimModel'

interface SimPageProps {
  t: (key: string) => string
}

const _crudName = { single: 'sim', multiple: 'sims', cod: 'sim' }

const SimPage: React.FC<SimPageProps> = ({ t }) => {
  // Search state
  const [searchTerm, setSearchTerm] = useState('')

  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [modalType, setModalType] = useState<ModalType | null>(null)
  const [selectedSim, setSelectedSim] = useState<SimModel | null>(null)

  // Hooks
  const { simList, isLoaded } = useSim()
  const { fetchAllData, searchSimByImei, isLoading } = useSimFetch()

  // Initial data fetch - skip if already loaded
  useEffect(() => {
    document.title = 'Síguelo | SIMs'
    if (!isLoaded) {
      fetchAllData()
    }
  }, [isLoaded])

  // Open modal handler
  const handleOpenModal = (type: ModalType, sim?: SimModel) => {
    setModalType(type)
    setSelectedSim(sim || null)

    // Set modal size based on type
    if (type === 'Events' || type === 'Details') {
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
    setSelectedSim(null)
  }

  // Filtrar sims localmente por IMEI
  const filteredSims = simList.filter((sim) => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return sim.imei?.toLowerCase().includes(term) || sim.number?.toLowerCase().includes(term)
  })

  // Search handlers
  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term)
  }

  const handleSearch = () => {
    if (searchTerm) {
      searchSimByImei(searchTerm)
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

              <ContentTable
                sims={filteredSims}
                isLoading={isLoading}
                onOpenModal={handleOpenModal}
                t={t}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} size={modalSize}>
        <ModalIndex
          modalType={modalType}
          selectedSim={selectedSim}
          onClose={handleCloseModal}
          t={t}
        />
      </Modal>
    </>
  )
}

export default withTranslation()(SimPage)
