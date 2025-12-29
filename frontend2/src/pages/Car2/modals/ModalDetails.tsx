import React, { useEffect, useState } from 'react'
import { SpinnerL } from 'components/components'
import { ErrorTable } from 'components/tableElements'
import { useCarFetch, useCar } from '../hooks'
import { CarModel } from '../models/CarModel'

interface ModalDetailsProps {
  car: CarModel
  onClose: () => void
  t: (key: string) => string
}

const ModalDetails: React.FC<ModalDetailsProps> = ({ car, onClose, t }) => {
  const [modalMode, setModalMode] = useState<'loading' | 'success' | 'error'>('loading')
  const { fetchCarDetails, isOperating } = useCarFetch()
  const { carDetails } = useCar()

  useEffect(() => {
    loadDetails()
  }, [])

  const loadDetails = async () => {
    setModalMode('loading')
    const result = await fetchCarDetails(car.id)
    if (result.success) {
      setModalMode('success')
    } else {
      setModalMode('error')
    }
  }

  const ShowData = ({ title, data }: { title: string; data: React.ReactNode }) => (
    <div className="row mt-1">
      <p>
        <b>{title}: </b>
        {data}
      </p>
    </div>
  )

  const StatusBadge = ({ active }: { active: number }) => (
    <span
      className={`badge font-size-11 rounded-pill badge-soft-${active ? 'primary' : 'dark'} text-uppercase`}
    >
      {active ? 'ACTIVO' : 'INACTIVO'}
    </span>
  )

  return (
    <>
      <div className="modal-header">
        <h4>Detalles del vehículo</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        {modalMode === 'loading' && <SpinnerL />}

        {modalMode === 'error' && <ErrorTable cod={500} retryFunction={loadDetails} />}

        {modalMode === 'success' && carDetails && (
          <div className="chat-conversation">
            {/* Car section */}
            <div className="chat-day-title m-1">
              <span className="title">
                <b>Vehículo</b>
              </span>
            </div>
            <div className="row">
              <div className="col">
                <ShowData title="Nombre" data={carDetails.car.name || '- - -'} />
                <ShowData title="Placa" data={carDetails.car.placa} />
                <ShowData title="Plataforma" data={carDetails.car.platformName || '- - -'} />
              </div>
              <div className="col">
                <ShowData title="Marca" data={carDetails.car.mark} />
                <ShowData title="Modelo" data={carDetails.car.model} />
              </div>
            </div>

            {/* Modem section */}
            <div className="chat-day-title m-1">
              <span className="title">
                <b>Módem</b>
              </span>
            </div>
            {carDetails.modem ? (
              <div className="row">
                <div className="col">
                  <ShowData title="Código" data={carDetails.modem.code} />
                  <ShowData title="Imei" data={carDetails.modem.imei} />
                </div>
                <div className="col">
                  <ShowData title="Marca" data={carDetails.modem.markName || 'Sin marca'} />
                  <ShowData title="Estado" data={<StatusBadge active={carDetails.modem.active} />} />
                </div>
              </div>
            ) : (
              <center>
                <h4 className="text-secondary mb-3">Sin módem asignado</h4>
              </center>
            )}

            {/* Sim section */}
            <div className="chat-day-title m-1">
              <span className="title">
                <b>Sim</b>
              </span>
            </div>
            {carDetails.sim ? (
              <div className="row">
                <div className="col">
                  <ShowData title="Número" data={carDetails.sim.number} />
                  <ShowData title="Imei" data={carDetails.sim.imei} />
                </div>
                <div className="col">
                  <ShowData title="Estado" data={<StatusBadge active={carDetails.sim.active} />} />
                </div>
              </div>
            ) : (
              <center>
                <h4 className="text-secondary mb-3">Sin sim asignado</h4>
              </center>
            )}
          </div>
        )}
      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>
          {t('Cancel')}
        </button>
        <div className="ms-auto"></div>
      </div>
    </>
  )
}

export default ModalDetails
