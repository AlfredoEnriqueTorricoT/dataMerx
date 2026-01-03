import React, { useEffect, useState } from 'react'
import { SearchBar, SpinnerL } from 'components/components'
import { ErrorTable } from 'components/tableElements'
import { showToast } from 'components/toast'
import { Modal } from 'reactstrap'
import { useCarFetch, useCar } from '../hooks'
import { CarModel } from '../models/CarModel'

interface ModalWatchProps {
  car: CarModel
  onClose: () => void
  t: (key: string) => string
}

const ModalWatch: React.FC<ModalWatchProps> = ({ car, onClose, t }) => {
  const [imei, setImei] = useState('')
  const [selectedWatchId, setSelectedWatchId] = useState(0)
  const [detailsStatus, setDetailsStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [searchStatus, setSearchStatus] = useState<'init' | 'loading' | 'success' | 'error'>('init')
  const [hasWatch, setHasWatch] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [confirmMessage, setConfirmMessage] = useState('')

  const { fetchCarDetails, searchWatches, assignWatch, removeWatch, isOperating } = useCarFetch()
  const { carDetails, watchList } = useCar()

  useEffect(() => {
    loadDetails()
  }, [])

  const loadDetails = async () => {
    setDetailsStatus('loading')
    const result = await fetchCarDetails(car.id)
    if (result.success && result.data) {
      setDetailsStatus('success')
      setHasWatch(!!result.data.watch)
    } else {
      setDetailsStatus('error')
    }
  }

  const handleSearch = async () => {
    if (!imei) return
    setSearchStatus('loading')
    const result = await searchWatches(imei)
    if (result.success) {
      setSearchStatus('success')
    } else {
      setSearchStatus('error')
    }
  }

  const handleAssignWatch = async (confirm = false) => {
    const result = await assignWatch({
      id: car.id,
      watch_id: selectedWatchId,
      confirm,
    })

    if (result.success) {
      showToast({ type: 'success', title: 'Éxito', message: 'El reloj ha sido vinculado' })
      onClose()
    } else if (result.status === 232) {
      // Watch already assigned to another car
      setConfirmMessage(result.message || 'Este reloj ya está asignado a otro vehículo. ¿Desea reasignarlo?')
      setConfirmModalOpen(true)
    } else if (result.status === 432) {
      showToast({ type: 'info', title: 'Aviso', message: result.message })
    } else {
      showToast({
        type: 'warning',
        title: t('Error'),
        message: 'El reloj no pudo ser vinculado',
      })
    }
  }

  const handleRemoveWatch = async () => {
    if (!carDetails?.watch) return

    const result = await removeWatch(car.id)
    if (result.success) {
      showToast({ type: 'success', title: 'Éxito', message: 'El reloj ha sido desvinculado' })
      setHasWatch(false)
    } else {
      showToast({
        type: 'warning',
        title: t('Error'),
        message: result.message || 'El reloj no pudo ser desvinculado',
      })
    }
  }

  const renderCurrentWatch = () => {
    if (detailsStatus === 'loading') return <SpinnerL />
    if (detailsStatus === 'error')
      return <ErrorTable cod={500} retryFunction={loadDetails} />

    if (hasWatch && carDetails?.watch) {
      return (
        <div className="bg-secondary bg-soft row mb-3">
          <div className="col-2">
            <center>
              <i className="fas fa-clock mt-3"></i>
            </center>
          </div>
          <div className="col-8">
            <b>Imei: {carDetails.watch.imei}</b>
            <br />
            <p className="my-0">
              <b>Código: </b>
              {carDetails.watch.code || 'N/A'} <b>Nombre: </b>
              {carDetails.watch.deviceName || 'N/A'}
            </p>
          </div>
          <div className="col-2">
            <center>
              <button
                className="btn"
                disabled={isOperating}
                onClick={handleRemoveWatch}
                type="button"
                title="Desvincular reloj"
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
        <h4 className="text-secondary mb-3">Sin reloj asignado</h4>
      </center>
    )
  }

  const renderWatchList = () => {
    if (searchStatus === 'init') return null
    if (searchStatus === 'loading') return <SpinnerL />
    if (searchStatus === 'error') return <ErrorTable cod={500} retryFunction={handleSearch} />

    if (watchList.length === 0) {
      return (
        <div className="card">
          <div className="card-body">
            <center>
              <h4 className="text-secondary">No hay relojes que coincidan con su búsqueda</h4>
            </center>
          </div>
        </div>
      )
    }

    return watchList
      .filter((watch) => watch.id !== car.watchId)
      .map((watch, idx) => (
        <div
          className={`row py-1 ${idx % 2 === 0 ? 'bg-light' : 'bg-secondary bg-soft'}`}
          key={watch.id}
          onClick={() => setSelectedWatchId(watch.id)}
          style={{ cursor: 'pointer' }}
        >
          <div className="col-2">
            <center>
              <i className="fas fa-clock mt-3"></i>
            </center>
          </div>
          <div className="col-8">
            <b>Imei: {watch.imei}</b>
            <br />
            <p className="my-0">
              <b>Código: </b>
              {watch.code || 'N/A'} <b>Nombre: </b>
              {watch.deviceName || 'N/A'}
            </p>
            {watch.platformName && (
              <small className="text-muted">Plataforma: {watch.platformName}</small>
            )}
          </div>
          <div className="col-2">
            <center>
              <input
                className="form-check-input mt-3"
                checked={selectedWatchId === watch.id}
                onChange={() => setSelectedWatchId(watch.id)}
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
        <h4>Vincular reloj</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        {renderCurrentWatch()}

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
              {renderWatchList()}
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
            disabled={selectedWatchId === 0 || isOperating}
            onClick={() => handleAssignWatch(false)}
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
          <p>{confirmMessage}</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setConfirmModalOpen(false)}>
            Cancelar
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setConfirmModalOpen(false)
              handleAssignWatch(true)
            }}
          >
            Confirmar
          </button>
        </div>
      </Modal>
    </>
  )
}

export default ModalWatch
