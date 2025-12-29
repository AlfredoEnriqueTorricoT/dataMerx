import React, { useEffect, useState } from 'react'
import { SpinnerL } from 'components/components'
import { ModemApiService } from '../services'
import { ModemModel } from '../models/ModemModel'

interface ModalDetailsProps {
  modem: ModemModel
  onClose: () => void
}

const ModalDetails: React.FC<ModalDetailsProps> = ({ modem, onClose }) => {
  const [modalMode, setModalMode] = useState<0 | 1 | 2>(0) // 0 loading, 1 success, 2 error
  const [modemDetails, setModemDetails] = useState<ModemModel | null>(null)

  useEffect(() => {
    const fetchDetails = async () => {
      const service = new ModemApiService()
      const result = await service.getModemById(modem.id)
      if (result.status === 200 && result.data) {
        setModemDetails(result.data)
        setModalMode(1)
      } else {
        setModalMode(2)
      }
    }
    fetchDetails()
  }, [modem.id])

  const ShowData: React.FC<{ title: string; data: React.ReactNode }> = ({ title, data }) => (
    <div className="row mt-1">
      <p>
        <b>{title}: </b>
        {data}
      </p>
    </div>
  )

  return (
    <>
      <div className="modal-header">
        <h4>Detalles del módem</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        {modalMode === 0 && <SpinnerL />}
        {modalMode === 1 && modemDetails && (
          <>
            <div className="chat-conversation">
              <div className="chat-day-title m-1">
                <span className="title">
                  <b>Módem</b>
                </span>
              </div>
              <div className="row">
                <div className="col">
                  <ShowData title="Código" data={modemDetails.code} />
                  <ShowData title="Imei" data={modemDetails.imei} />
                </div>
                <div className="col">
                  <ShowData
                    title="Marca"
                    data={modemDetails.modemsMark?.name || 'Sin marca'}
                  />
                  <ShowData
                    title="Estado"
                    data={
                      <span
                        className={`badge font-size-11 rounded-pill badge-soft-${
                          modemDetails.active ? 'primary' : 'dark'
                        } text-uppercase`}
                      >
                        {modemDetails.active ? 'ACTIVO' : 'INACTIVO'}
                      </span>
                    }
                  />
                </div>
              </div>

              <div className="chat-day-title m-1">
                <span className="title">
                  <b>Plataforma</b>
                </span>
              </div>
              {modemDetails.platform ? (
                <div className="row">
                  <div className="col">
                    <ShowData title="Nombre" data={modemDetails.platform.name} />
                    <ShowData title="URL" data={modemDetails.platform.url || '- - -'} />
                  </div>
                  <div className="col">
                    <ShowData title="Email" data={modemDetails.platform.email || '- - -'} />
                    <ShowData
                      title="Estado"
                      data={
                        <span
                          className={`badge font-size-11 rounded-pill badge-soft-${
                            modemDetails.platform.active ? 'primary' : 'dark'
                          } text-uppercase`}
                        >
                          {modemDetails.platform.active ? 'ACTIVO' : 'INACTIVO'}
                        </span>
                      }
                    />
                  </div>
                </div>
              ) : (
                <center>
                  <h4 className="text-secondary mb-3">Sin plataforma asignada</h4>
                </center>
              )}

              <div className="chat-day-title m-1">
                <span className="title">
                  <b>Sim</b>
                </span>
              </div>
              {modemDetails.sim ? (
                <div className="row">
                  <div className="col">
                    <ShowData title="Número" data={modemDetails.sim.number} />
                    <ShowData title="Imei" data={modemDetails.sim.imei} />
                  </div>
                  <div className="col">
                    <ShowData title="Código" data={modemDetails.sim.code} />
                    <ShowData
                      title="Estado"
                      data={
                        <span
                          className={`badge font-size-11 rounded-pill badge-soft-${
                            modemDetails.sim.active ? 'primary' : 'dark'
                          } text-uppercase`}
                        >
                          {modemDetails.sim.active ? 'ACTIVO' : 'INACTIVO'}
                        </span>
                      }
                    />
                  </div>
                </div>
              ) : (
                <center>
                  <h4 className="text-secondary mb-3">Sin sim asignado</h4>
                </center>
              )}

              {modemDetails.responsability && (
                <>
                  <div className="chat-day-title m-1">
                    <span className="title">
                      <b>Responsable</b>
                    </span>
                  </div>
                  <div className="row">
                    <div className="col">
                      <ShowData title="Nombre" data={modemDetails.responsability.name} />
                      <ShowData title="Email" data={modemDetails.responsability.email} />
                    </div>
                  </div>
                </>
              )}

              {modemDetails.successor && (
                <>
                  <div className="chat-day-title m-1">
                    <span className="title">
                      <b>Sucesor (Transferencia pendiente)</b>
                    </span>
                  </div>
                  <div className="row">
                    <div className="col">
                      <ShowData title="Nombre" data={modemDetails.successor.name} />
                      <ShowData title="Email" data={modemDetails.successor.email} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
        {modalMode === 2 && (
          <center>
            <h4 className="text-danger">Error al cargar los detalles</h4>
          </center>
        )}
      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>
          Cerrar
        </button>
        <div className="ms-auto"></div>
      </div>
    </>
  )
}

export default ModalDetails
