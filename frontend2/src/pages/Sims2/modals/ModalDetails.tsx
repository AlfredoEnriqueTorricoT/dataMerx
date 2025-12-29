import React, { useEffect, useState } from 'react'
import { SpinnerL } from 'components/components'
import { ErrorTable } from 'components/tableElements'
import { useSimFetch, useSim } from '../hooks'
import { SimModel } from '../models/SimModel'

interface ModalDetailsProps {
  sim: SimModel
  onClose: () => void
  t: (key: string) => string
}

const ModalDetails: React.FC<ModalDetailsProps> = ({ sim, onClose, t }) => {
  const [modalStatus, setModalStatus] = useState<0 | 1 | 2>(0)
  const { fetchSimDetails } = useSimFetch()
  const { simDetails } = useSim()

  useEffect(() => {
    const loadDetails = async () => {
      const result = await fetchSimDetails(sim.id)
      setModalStatus(result.success ? 1 : 2)
    }
    loadDetails()
  }, [sim.id])

  const retryFetch = async () => {
    setModalStatus(0)
    const result = await fetchSimDetails(sim.id)
    setModalStatus(result.success ? 1 : 2)
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
        <h4>Detalles del sim</h4>
        <button type="button" onClick={onClose} className="btn-close" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        {modalStatus === 0 && <SpinnerL />}

        {modalStatus === 1 && simDetails && (
          <div className="chat-conversation">
            {/* Vehículo */}
            <div className="chat-day-title m-1">
              <span className="title">
                <b>Vehículo</b>
              </span>
            </div>
            {simDetails.car ? (
              <div className="row">
                <div className="col">
                  <ShowData title="Nombre" data={simDetails.car.name} />
                  <ShowData title="Placa" data={simDetails.car.placa} />
                  <ShowData
                    title="Plataforma"
                    data={simDetails.car.platform ? simDetails.car.platform.name : '- - -'}
                  />
                </div>
                <div className="col">
                  <ShowData title="Marca" data={simDetails.car.mark} />
                  <ShowData title="Modelo" data={simDetails.car.model} />
                </div>
              </div>
            ) : (
              <center>
                <h4 className="text-secondary mb-3">Sin vehículo asignado</h4>
              </center>
            )}

            {/* Módem */}
            <div className="chat-day-title m-1">
              <span className="title">
                <b>Módem</b>
              </span>
            </div>
            {simDetails.modem ? (
              <div className="row">
                <div className="col">
                  <ShowData title="Código" data={simDetails.modem.code} />
                  <ShowData title="Imei" data={simDetails.modem.imei} />
                </div>
                <div className="col">
                  <ShowData
                    title="Marca"
                    data={simDetails.modem.modemsMark ? simDetails.modem.modemsMark.name : '- - -'}
                  />
                  <ShowData title="Estado" data={<StatusBadge active={simDetails.modem.active} />} />
                </div>
              </div>
            ) : (
              <center>
                <h4 className="text-secondary mb-3">Sin módem asignado</h4>
              </center>
            )}

            {/* Sim */}
            <div className="chat-day-title m-1">
              <span className="title">
                <b>Sim</b>
              </span>
            </div>
            <div className="row">
              <div className="col">
                <ShowData title="Número" data={simDetails.sim.number} />
                <ShowData title="Imei" data={simDetails.sim.imei} />
              </div>
              <div className="col">
                <ShowData title="Estado" data={<StatusBadge active={simDetails.sim.active} />} />
              </div>
            </div>
          </div>
        )}

        {modalStatus === 2 && <ErrorTable cod={500} retryFunction={retryFetch} />}
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
