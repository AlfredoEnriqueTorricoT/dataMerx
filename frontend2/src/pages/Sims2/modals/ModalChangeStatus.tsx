import React from 'react'
import { showToast } from 'components/toast'
import { useSimFetch } from '../hooks'
import { SimModel } from '../models/SimModel'

interface ModalChangeStatusProps {
  sim: SimModel
  onClose: () => void
  t: (key: string) => string
}

const ModalChangeStatus: React.FC<ModalChangeStatusProps> = ({ sim, onClose, t }) => {
  const { changeStatus, isOperating } = useSimFetch()

  const handleChangeStatus = async () => {
    const newStatus = sim.active ? 0 : 1
    const result = await changeStatus({
      sim_id: sim.id,
      active: newStatus,
    })

    if (result.success) {
      showToast({
        type: 'success',
        title: 'Éxito',
        message: `El sim ha sido ${newStatus ? 'activado' : 'desactivado'}`,
      })
      onClose()
    } else {
      showToast({
        type: 'warning',
        title: t('Error'),
        message: 'No se pudo cambiar el estado del sim',
      })
    }
  }

  return (
    <>
      <div className="modal-header">
        <h4>{sim.active ? 'Desactivar' : 'Activar'} sim</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        <div className="text-center py-4">
          <i
            className={`fas fa-${sim.active ? 'ban' : 'check-circle'} fa-4x mb-3 text-${
              sim.active ? 'danger' : 'success'
            }`}
          ></i>
          <h5>
            ¿Está seguro que desea {sim.active ? 'desactivar' : 'activar'} el sim{' '}
            <strong>{sim.number}</strong>?
          </h5>
          <p className="text-muted">IMEI: {sim.imei}</p>
        </div>
      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>
          {t('Cancel')}
        </button>
        <div className="ms-auto">
          <button
            className={`btn btn-${sim.active ? 'danger' : 'success'} btn-label`}
            disabled={isOperating}
            onClick={handleChangeStatus}
          >
            {isOperating && <i className="fas fa-spinner fa-spin me-2"></i>}
            {sim.active ? 'Desactivar' : 'Activar'}
            <i className={`fas fa-${sim.active ? 'ban' : 'check'} label-icon`}></i>
          </button>
        </div>
      </div>
    </>
  )
}

export default ModalChangeStatus
