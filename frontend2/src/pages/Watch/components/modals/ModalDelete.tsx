import React from 'react'
import { WatchModel } from '../../models/WatchModel'

interface ModalDeleteProps {
  watch: WatchModel
  onSubmit: (id: number) => Promise<{ success: boolean; message: string }>
  onClose: () => void
  isSubmitting: boolean
  t: (key: string) => string
}

const ModalDelete: React.FC<ModalDeleteProps> = ({ watch, onSubmit, onClose, isSubmitting, t }) => {
  const handleDelete = async () => {
    const result = await onSubmit(watch.id)
    if (result.success) {
      onClose()
    }
  }

  return (
    <React.Fragment>
      <div className="modal-header">
        <h4>Eliminar reloj</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        <h5>¿Está seguro que desea eliminar el reloj con el imei {watch.imei}?</h5>
      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
          {t('Cancel')}
        </button>
        <div className="ms-auto">
          <button
            className="btn btn-danger btn-label text-light"
            onClick={handleDelete}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Eliminando...' : 'Eliminar'}
            <i className={`fas fa-${isSubmitting ? 'spinner fa-spin' : 'trash-alt'} label-icon`}></i>
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ModalDelete
