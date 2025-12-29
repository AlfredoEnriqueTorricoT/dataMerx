import React from 'react'
import { showToast } from 'components/toast'
import { useModemFetch } from '../hooks'
import { ModemModel } from '../models/ModemModel'

interface ModalCancelTransferProps {
  modem: ModemModel
  onClose: () => void
  t: (key: string) => string
}

const ModalCancelTransfer: React.FC<ModalCancelTransferProps> = ({ modem, onClose, t }) => {
  const { cancelTransfer, isOperating } = useModemFetch()

  const handleCancelTransfer = async () => {
    const result = await cancelTransfer(modem.id)

    if (result.success) {
      showToast({ type: 'success', message: 'La solicitud de transferencia ha sido anulada' })
      onClose()
    } else {
      showToast({
        type: 'warning',
        message: 'No se ha podido anular',
      })
    }
  }

  return (
    <>
      <div className="modal-header">
        <h4>Anular transferencia</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        <h4>¿Está seguro de anular la transferencia del módem?</h4>
      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>
          {t('Cancel')}
        </button>
        <div className="ms-auto">
          <button
            className="btn btn-danger btn-label text-light"
            disabled={isOperating}
            onClick={handleCancelTransfer}
          >
            {isOperating && <i className="fas fa-spinner fa-spin me-2"></i>}
            Anular
            <i className="fas fa-times label-icon"></i>
          </button>
        </div>
      </div>
    </>
  )
}

export default ModalCancelTransfer
