import React, { useEffect, useState } from 'react'
import { SearchBar, SpinnerL } from 'components/components'
import { ErrorTable } from 'components/tableElements'
import { showToast } from 'components/toast'
import { Modal } from 'reactstrap'
import { useModemFetch } from '../hooks'
import { ModemModel, SimModel } from '../models/ModemModel'
import { ModemApiService } from '../services'

interface ModalSimProps {
  modem: ModemModel
  onClose: () => void
}

interface ModemDetails {
  sim?: { number: string; imei: string; code: string; id: number }
  modem: { id: number }
}

const ModalSim: React.FC<ModalSimProps> = ({ modem, onClose }) => {
  const [number, setNumber] = useState('')
  const [simId, setSimId] = useState(modem.simId || 0)
  const [mDataStatus, setMDataStatus] = useState<-1 | 0 | 1>(0) // -1 error, 0 loading, 1 success
  const [tableStatus, setTableStatus] = useState<-2 | -1 | 0 | 1>(-2) // -2 init, -1 error, 0 loading, 1 success
  const [hasASim, setHasASim] = useState(false)
  const [modemDetails, setModemDetails] = useState<ModemDetails | null>(null)
  const [simList, setSimList] = useState<SimModel[]>([])
  const [secondModalOpen, setSecondModalOpen] = useState(false)
  const [confirmMessage, setConfirmMessage] = useState('')

  const { assignSim, isOperating } = useModemFetch()
  const service = new ModemApiService()

  useEffect(() => {
    const fetchDetails = async () => {
      const result = await service.getModemById(modem.id)
      if (result.status === 200 && result.data) {
        const details = result.data as unknown as ModemDetails
        setModemDetails(details)
        setHasASim(!!details.sim)
        setMDataStatus(1)
      } else {
        setMDataStatus(-1)
      }
    }
    fetchDetails()
  }, [modem.id])

  const searchFunction = async () => {
    setTableStatus(0)
    const result = await service.getSims()
    if (result.status === 200 && result.data) {
      const filtered = result.data.filter((sim) =>
        sim.number.toLowerCase().includes(number.toLowerCase())
      )
      setSimList(filtered)
      setTableStatus(1)
    } else {
      setTableStatus(-1)
    }
  }

  const handleAssignSim = async (confirm = false) => {
    const result = await assignSim({
      id: modem.id,
      sim_id: simId,
      confirm,
    })

    if (result.success) {
      showToast({ type: 'success', message: 'El sim ha sido vinculado' })
      onClose()
    } else if (result.message.includes('ya asignado') || result.message.includes('already')) {
      setConfirmMessage(result.message)
      setSecondModalOpen(true)
    } else {
      showToast({ type: 'warning', message: 'El sim no pudo ser vinculado' })
    }
  }

  const removeSim = async () => {
    if (!modemDetails) return
    const result = await service.removeSim(modemDetails.modem.id)
    if (result.status === 200) {
      showToast({ type: 'success', message: 'El sim ha sido desvinculado' })
      setHasASim(false)
    } else {
      showToast({ type: 'warning', message: 'El sim no pudo ser desvinculado' })
    }
  }

  const ShowActiveModem = () => {
    if (mDataStatus === -1) {
      return (
        <ErrorTable
          cod={500}
          retryFunction={async () => {
            setMDataStatus(0)
            const result = await service.getModemById(modem.id)
            if (result.status === 200) {
              setModemDetails(result.data as unknown as ModemDetails)
              setMDataStatus(1)
            } else {
              setMDataStatus(-1)
            }
          }}
        >
          Reintentar
        </ErrorTable>
      )
    }

    if (mDataStatus === 0) {
      return <SpinnerL />
    }

    if (hasASim && modemDetails?.sim) {
      return (
        <>
          <div className="bg-secondary bg-soft row">
            <div className="col-2">
              <center>
                <i className="fas fa-sim-card mt-3"></i>
              </center>
            </div>
            <div className="col-8">
              <b>Número: {modemDetails.sim.number}</b>
              <br />
              <p className="my-0">
                <b>Imei: </b>
                {modemDetails.sim.imei} <b>Código: </b>
                {modemDetails.sim.code}
              </p>
            </div>
            <div className="col-2">
              <center>
                <button
                  className="btn"
                  disabled={isOperating}
                  onClick={removeSim}
                  type="button"
                  title="Desvincular sim"
                >
                  <i className="fas fa-times"></i>
                </button>
              </center>
            </div>
          </div>
          <br />
        </>
      )
    }

    return (
      <center>
        <h4 className="text-secondary">Sin sim asignado</h4>
      </center>
    )
  }

  const ShowTable = () => {
    if (tableStatus === -1) {
      return <ErrorTable cod={500} retryFunction={searchFunction} />
    }

    if (tableStatus === 0) {
      return <SpinnerL />
    }

    if (tableStatus === 1) {
      if (simList.length === 0) {
        return (
          <div className="card">
            <div className="card-body">
              <center>
                <h4 className="text-secondary">No hay sims que coincidan con su busqueda</h4>
              </center>
            </div>
          </div>
        )
      }

      return simList.map((sim, idx) => (
        <div
          className={`row py-1 ${idx % 2 === 0 ? 'bg-light' : 'bg-secondary bg-soft'}`}
          key={idx}
          onClick={() => setSimId(sim.id)}
          style={{ cursor: 'pointer' }}
        >
          <div className="col-2">
            <center>
              <i className="fas fa-sim-card mt-3"></i>
            </center>
          </div>
          <div className="col-8">
            <b>Número: {sim.number}</b>
            <br />
            <p className="my-0">
              <b>Imei: </b>
              {sim.imei} <b>Código: </b>
              {sim.code}
            </p>
          </div>
          <div className="col-2">
            <center>
              <input
                className="form-check-input mt-3"
                checked={simId === sim.id}
                onChange={() => setSimId(sim.id)}
                type="radio"
              />
            </center>
          </div>
        </div>
      ))
    }

    return null
  }

  return (
    <>
      <div className="modal-header">
        <h4>Vincular sim</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        <ShowActiveModem />
        <br />
        <center>
          <SearchBar
            type="text"
            className="form-control"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumber(e.target.value)}
            placeholder="Buscar por número..."
            value={number}
          >
            <button
              className="btn dm-button text-light"
              disabled={number === '' || mDataStatus !== 1}
              onClick={searchFunction}
            >
              {tableStatus === 0 ? (
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
          <ShowTable />
        </div>
      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>
          Cancelar
        </button>
        <div className="ms-auto">
          <button
            className="btn dm-button text-light btn-label"
            disabled={simId === 0 || isOperating}
            onClick={() => handleAssignSim(false)}
          >
            {isOperating && <i className="fas fa-spinner fa-spin me-2"></i>}
            Asignar
            <i className="fas fa-plus label-icon"></i>
          </button>
        </div>
      </div>

      <Modal isOpen={secondModalOpen} size="sm">
        <div className="modal-header">
          <h4>Módem ya asignado</h4>
          <button
            type="button"
            onClick={() => setSecondModalOpen(false)}
            className="close"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">{confirmMessage}</div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setSecondModalOpen(false)}>
            Cancelar
          </button>
          <div className="ms-auto">
            <button
              className="btn dm-button btn-label text-light"
              disabled={isOperating}
              onClick={() => handleAssignSim(true)}
            >
              {isOperating ? (
                <i className="fas fa-spinner fa-spin me-2"></i>
              ) : (
                <i className="fas fa-plus label-icon"></i>
              )}
              Asignar
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ModalSim
