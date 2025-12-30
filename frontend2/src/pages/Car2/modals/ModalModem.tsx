import React, { useEffect, useState } from 'react'
import { SearchBar, SpinnerL } from 'components/components'
import { ErrorTable } from 'components/tableElements'
import { showToast } from 'components/toast'
import { Modal } from 'reactstrap'
import { useCarFetch, useCar } from '../hooks'
import { CarModel, ModemModel } from '../models/CarModel'

interface ModalModemProps {
  car: CarModel
  onClose: () => void
  t: (key: string) => string
}

const ModalModem: React.FC<ModalModemProps> = ({ car, onClose, t }) => {
  const [imei, setImei] = useState('')
  const [carName, setCarName] = useState('')
  const [selectedModemId, setSelectedModemId] = useState(0)
  const [detailsStatus, setDetailsStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [searchStatus, setSearchStatus] = useState<'init' | 'loading' | 'success' | 'error'>('init')
  const [hasModem, setHasModem] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  const { fetchCarDetails, searchModems, assignModem, removeModem, isOperating } = useCarFetch()
  const { carDetails, modemList } = useCar()

  useEffect(() => {
    loadDetails()
  }, [])

  const loadDetails = async () => {
    setDetailsStatus('loading')
    const result = await fetchCarDetails(car.id)
    if (result.success && result.data) {
      setDetailsStatus('success')
      setCarName(result.data.car.name || '')
      setHasModem(!!result.data.modem)
    } else {
      setDetailsStatus('error')
    }
  }

  const handleSearch = async () => {
    if (!imei) return
    setSearchStatus('loading')
    const result = await searchModems(imei)
    if (result.success) {
      setSearchStatus('success')
    } else {
      setSearchStatus('error')
    }
  }

  const handleAssignModem = async (confirm = false) => {
    const result = await assignModem({
      id: car.id,
      modem_id: selectedModemId,
      name: carName,
      confirm,
    })

    if (result.success) {
      showToast({ type: 'success', title: 'Éxito', message: 'El módem ha sido vinculado' })
      onClose()
    } else if (result.status === 232) {
      // Modem already assigned to another car
      setConfirmModalOpen(true)
    } else if (result.status === 432) {
      showToast({ type: 'info', title: 'Aviso', message: result.message })
    } else {
      showToast({
        type: 'warning',
        title: t('Error'),
        message: 'El módem no pudo ser vinculado',
      })
    }
  }

  const handleRemoveModem = async () => {
    if (!carDetails?.modem) return

    const result = await removeModem(carDetails.modem.id)
    if (result.success) {
      showToast({ type: 'success', title: 'Éxito', message: 'El módem ha sido desvinculado' })
      setHasModem(false)
    } else {
      showToast({
        type: 'warning',
        title: t('Error'),
        message: 'El módem no pudo ser desvinculado',
      })
    }
  }

  const renderCurrentModem = () => {
    if (detailsStatus === 'loading') return <SpinnerL />
    if (detailsStatus === 'error')
      return <ErrorTable cod={500} retryFunction={loadDetails} />

    if (hasModem && carDetails?.modem) {
      return (
        <div className="bg-secondary bg-soft row mb-3">
          <div className="col-2">
            <center>
              <i className="fas fa-hdd mt-3"></i>
            </center>
          </div>
          <div className="col-8">
            <b>Imei: {carDetails.modem.imei}</b>
            <br />
            <p className="my-0">
              <b>Marca: </b>
              {carDetails.modem.markName || 'N/A'} <b>Código: </b>
              {carDetails.modem.code}
            </p>
          </div>
          <div className="col-2">
            <center>
              <button
                className="btn"
                disabled={isOperating}
                onClick={handleRemoveModem}
                type="button"
                title="Desvincular módem"
              >
                <i className="fas fa-times"></i>
              </button>
            </center>
          </div>
        </div>
      )
    }

    return (
      <center>
        <h4 className="text-secondary mb-3">Sin módem asignado</h4>
      </center>
    )
  }

  const renderModemList = () => {
    if (searchStatus === 'init') return null
    if (searchStatus === 'loading') return <SpinnerL />
    if (searchStatus === 'error') return <ErrorTable cod={500} retryFunction={handleSearch} />

    if (modemList.length === 0) {
      return (
        <div className="card">
          <div className="card-body">
            <center>
              <h4 className="text-secondary">No hay módems que coincidan con su búsqueda</h4>
            </center>
          </div>
        </div>
      )
    }

    return modemList
      .filter((modem) => modem.id !== car.modemId)
      .map((modem, idx) => (
        <div
          className={`row py-1 ${idx % 2 === 0 ? 'bg-light' : 'bg-secondary bg-soft'}`}
          key={modem.id}
          onClick={() => setSelectedModemId(modem.id)}
          style={{ cursor: 'pointer' }}
        >
          <div className="col-2">
            <center>
              <i className="fas fa-hdd mt-3"></i>
            </center>
          </div>
          <div className="col-8">
            <b>Imei: {modem.imei}</b>
            <br />
            <p className="my-0">
              <b>Marca: </b>
              {modem.modemsMarkName || 'N/A'} <b>Código: </b>
              {modem.code}
            </p>
          </div>
          <div className="col-2">
            <center>
              <input
                className="form-check-input mt-3"
                checked={selectedModemId === modem.id}
                onChange={() => setSelectedModemId(modem.id)}
                type="radio"
              />
            </center>
          </div>
        </div>
      ))
  }

  return (
    <>
      <div className="modal-header">
        <h4>Vincular módem</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        {renderCurrentModem()}

        {detailsStatus === 'success' && (
          <>
        
            <center>
              <SearchBar
                type="text"
                className="form-control"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImei(e.target.value)}
                placeholder="Buscar por imei..."
                value={imei}
              >
                <button
                  className="btn dm-button text-light"
                  disabled={imei === '' || searchStatus === 'loading'}
                  onClick={handleSearch}
                >
                  {searchStatus === 'loading' ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fas fa-search"></i>
                  )}
                </button>
              </SearchBar>
            </center>

            <br />

            <div
              className="grayScroll"
              style={{ maxHeight: '35vh', overflowX: 'hidden', overflowY: 'auto' }}
            >
              {renderModemList()}
            </div>
          </>
        )}
      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>
          {t('Cancel')}
        </button>
        <div className="ms-auto">
          <button
            className="btn dm-button text-light btn-label"
            disabled={selectedModemId === 0 || isOperating}
            onClick={() => handleAssignModem(false)}
          >
            {isOperating && <i className="fas fa-spinner fa-spin me-2"></i>}
            Asignar
            <i className="fas fa-plus label-icon"></i>
          </button>
        </div>
      </div>

      {/* Confirm Modal */}
      <Modal isOpen={confirmModalOpen} size="sm">
        <div className="modal-header">
          <h5>Confirmar asignación</h5>
          <button
            type="button"
            onClick={() => setConfirmModalOpen(false)}
            className="close"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <p>Este módem ya está asignado a otro vehículo. ¿Desea reasignarlo?</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setConfirmModalOpen(false)}>
            Cancelar
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setConfirmModalOpen(false)
              handleAssignModem(true)
            }}
          >
            Confirmar
          </button>
        </div>
      </Modal>
    </>
  )
}

export default ModalModem
