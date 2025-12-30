import React, { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import { Modal } from 'reactstrap'
import { useMediaQuery } from 'react-responsive'

import Breadcrumbs from '../../components/Common/Breadcrumb'
import { Header, ContentTable, EventsTable } from './components'
import { ModalIndex } from './modals'
import { useModem, useModemFetch } from './hooks'
import { ModemModel, ModalType, FilterItem } from './models/ModemModel'

interface ModemPageProps {
  t: (key: string) => string
}

const _crudName = { single: 'modem', multiple: 'modems', cod: 'modem' }

type TableMode = 'modems' | 'events'

const ModemPage: React.FC<ModemPageProps> = ({ t }) => {
  // State for table mode and filters
  const [tableMode, setTableMode] = useState<TableMode>('modems')
  const [lastSearch, setLastSearch] = useState<'my' | 'imei' | 'filter'>('my')
  const [filters, setFilters] = useState<FilterItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [modalType, setModalType] = useState<ModalType | null>(null)
  const [selectedModem, setSelectedModem] = useState<ModemModel | null>(null)

  // Events state
  const [eventModem, setEventModem] = useState<ModemModel | null>(null)
  const [eventsLoading, setEventsLoading] = useState(false)
  const [eventsError, setEventsError] = useState(false)

  // Hooks
  const { modemList, eventList, isLoaded } = useModem()
  const { fetchAllData, fetchModems, searchByImei, fetchModemEvents, isLoading } = useModemFetch()

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 760px)' })

  // Initial data fetch - skip if already loaded
  useEffect(() => {
    document.title = 'Síguelo | Módems'
    if (!isLoaded) {
      fetchAllData()
    }
  }, [isLoaded])

  // Open modal handler
  const handleOpenModal = (type: ModalType, modem?: ModemModel) => {
    setModalType(type)
    setSelectedModem(modem || null)

    // Set modal size based on type
    if (type === 'Events') {
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
    setSelectedModem(null)
  }

  // Apply filter handler
  const handleApplyFilter = (newFilters: FilterItem[], search: 'my' | 'filter') => {
    setFilters(newFilters)
    setLastSearch(search)
  }

  // Remove filter handler
  const handleRemoveFilter = (filter: FilterItem) => {
    setFilters(filters.filter((f) => f !== filter))
  }


  // Search handlers
  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term)
    if (term) {
      setLastSearch('imei')
    } else {
      setLastSearch('my')
    }
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setLastSearch('my')
  }

  const handleSearch = async () => {
    if (searchTerm) {
      await searchByImei(searchTerm)
      setLastSearch('imei')
    }
  }

  // Events view handlers
  const handleViewEvents = async (modem: ModemModel) => {
    setEventModem(modem)
    setTableMode('events')
    setEventsLoading(true)
    setEventsError(false)

    const result = await fetchModemEvents(modem.id)
    setEventsLoading(false)

    if (!result.success) {
      setEventsError(true)
    }
  }

  const handleBackToModems = () => {
    setTableMode('modems')
    setEventModem(null)
  }

  const handleRetryEvents = async () => {
    if (!eventModem) return

    setEventsLoading(true)
    setEventsError(false)

    const result = await fetchModemEvents(eventModem.id)
    setEventsLoading(false)

    if (!result.success) {
      setEventsError(true)
    }
  }

  return (
    <>
      <div className="page-content mb-0 pb-0">
        <div className="container">
          <Breadcrumbs title="Cuadros de mando" breadcrumbItem={t(_crudName.multiple)} />

          <div className="tab-content">
            {/* Modems Tab */}
            <div className={`tab-pane fade ${tableMode === 'modems' ? 'show active' : ''}`}>
              <div className="card">
                <div className="card-body">
                  <div className="card-title mb-4 h4">
                    {t('List of') + ' ' + t(_crudName.multiple)}
                  </div>

                  <Header
                    filters={filters}
                    isLoading={isLoading}
                    lastSearch={lastSearch}
                    isTabletOrMobile={isTabletOrMobile}
                    searchTerm={searchTerm}
                    onSearchTermChange={handleSearchTermChange}
                    onSearch={handleSearch}
                    onClearSearch={handleClearSearch}
                    onOpenFilter={() => handleOpenModal('Filter')}
                    onAddClick={() => handleOpenModal('Add')}
                    onRemoveFilter={handleRemoveFilter}
                    t={t}
                  />

                  <ContentTable
                    modems={modemList}
                    isLoading={isLoading}
                    onOpenModal={handleOpenModal}
                    t={t}
                  />
                </div>
              </div>
            </div>

            {/* Events Tab */}
            <div className={`tab-pane fade ${tableMode === 'events' ? 'show active' : ''}`}>
              {eventModem && (
                <EventsTable
                  events={eventList}
                  isLoading={eventsLoading}
                  isError={eventsError}
                  modemCode={eventModem.code}
                  onRetry={handleRetryEvents}
                  onBack={handleBackToModems}
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
          selectedModem={selectedModem}
          isTabletOrMobile={isTabletOrMobile}
          onClose={handleCloseModal}
          onApplyFilter={handleApplyFilter}
          t={t}
        />
      </Modal>
    </>
  )
}

export default withTranslation()(ModemPage)
