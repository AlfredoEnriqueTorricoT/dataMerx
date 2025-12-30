import React from 'react'
import { ModemModel } from '../models/ModemModel'

interface ModalDetailsProps {
  modem: ModemModel
  onClose: () => void
}

const ModalDetails: React.FC<ModalDetailsProps> = ({ modem, onClose }) => {
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
        <div className="chat-conversation">
          <div className="chat-day-title m-1">
            <span className="title">
              <b>Módem</b>
            </span>
          </div>
          <div className="row">
            <div className="col">
              <ShowData title="Código" data={modem.code} />
              <ShowData title="Imei" data={modem.imei} />
            </div>
            <div className="col">
              <ShowData title="Marca" data={modem.modemsMark?.name || 'Sin marca'} />
              <ShowData
                title="Estado"
                data={
                  <span
                    className={`badge font-size-11 rounded-pill badge-soft-${
                      modem.active ? 'primary' : 'dark'
                    } text-uppercase`}
                  >
                    {modem.active ? 'ACTIVO' : 'INACTIVO'}
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
          {modem.platform ? (
            <div className="row">
              <div className="col">
                <ShowData title="Nombre" data={modem.platform.name} />
                <ShowData title="URL" data={modem.platform.url || '- - -'} />
              </div>
              <div className="col">
                <ShowData title="Email" data={modem.platform.email || '- - -'} />
                <ShowData
                  title="Estado"
                  data={
                    <span
                      className={`badge font-size-11 rounded-pill badge-soft-${
                        modem.platform.active ? 'primary' : 'dark'
                      } text-uppercase`}
                    >
                      {modem.platform.active ? 'ACTIVO' : 'INACTIVO'}
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
          {modem.sim ? (
            <div className="row">
              <div className="col">
                <ShowData title="Número" data={modem.sim.number} />
                <ShowData title="Imei" data={modem.sim.imei} />
              </div>
              <div className="col">
                <ShowData
                  title="Estado"
                  data={
                    <span
                      className={`badge font-size-11 rounded-pill badge-soft-${
                        modem.sim.active ? 'primary' : 'dark'
                      } text-uppercase`}
                    >
                      {modem.sim.active ? 'ACTIVO' : 'INACTIVO'}
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

          {modem.responsability && (
            <>
              <div className="chat-day-title m-1">
                <span className="title">
                  <b>Responsable</b>
                </span>
              </div>
              <div className="row">
                <div className="col">
                  <ShowData title="Nombre" data={modem.responsability.name} />
                  <ShowData title="Email" data={modem.responsability.email} />
                </div>
              </div>
            </>
          )}

          {modem.successor && (
            <>
              <div className="chat-day-title m-1">
                <span className="title">
                  <b>Sucesor (Transferencia pendiente)</b>
                </span>
              </div>
              <div className="row">
                <div className="col">
                  <ShowData title="Nombre" data={modem.successor.name} />
                  <ShowData title="Email" data={modem.successor.email} />
                </div>
              </div>
            </>
          )}
        </div>
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
