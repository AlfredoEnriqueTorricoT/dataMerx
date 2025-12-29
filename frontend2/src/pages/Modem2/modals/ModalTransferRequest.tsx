import React, { useState } from 'react'
import { showToast } from 'components/toast'
import { ModemModel } from '../models/ModemModel'
import { httpRequestWithAuth } from '../../../shared/utils/httpService'
import { useDispatch } from 'react-redux'
import { updateModemInList } from '../slices/modemSlice'

interface ModalTransferRequestProps {
  modem: ModemModel
  onClose: () => void
  t: (key: string) => string
}

const ModalTransferRequest: React.FC<ModalTransferRequestProps> = ({ modem, onClose, t }) => {
  const [isOperating, setIsOperating] = useState(false)
  const dispatch = useDispatch()

  const handleReject = async () => {
    setIsOperating(true)
    const response = await httpRequestWithAuth.post<any>('modem/transfer_cancel', {
      id: modem.id,
    })

    if (response.status === 200) {
      showToast({ title: 'Éxito', type: 'success', message: 'La solicitud ha sido rechazada' })
      dispatch(
        updateModemInList({
          ...modem,
          isPending: 0,
          userSuccessorId: null,
        })
      )
      onClose()
    } else {
      showToast({ title: 'Error', type: 'warning', message: 'La solicitud no pudo ser rechazada' })
    }
    setIsOperating(false)
  }

  const handleAccept = async () => {
    setIsOperating(true)
    const response = await httpRequestWithAuth.post<any>('modem/transfer_confirm', {
      id: modem.id,
    })

    if (response.status === 200) {
      showToast({ title: 'Éxito', type: 'success', message: 'La solicitud ha sido aceptada' })
      dispatch(
        updateModemInList({
          ...modem,
          isPending: 0,
          userResponsabilityId: modem.userSuccessorId,
          userSuccessorId: null,
        })
      )
      onClose()
    } else {
      showToast({ title: 'Error', type: 'warning', message: 'La solicitud no pudo ser aceptada' })
    }
    setIsOperating(false)
  }

  return (
    <>
      <div className="modal-header">
        <h4>Solicitud de transferencia</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        <h4>
          El usuario <b>{modem.responsability?.name}</b> quiere asignarte como responsable del módem
        </h4>
      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>
          {t('Close')}
        </button>
        <div className="ms-auto">
          <button
            className="btn btn-danger btn-label text-light"
            disabled={isOperating}
            onClick={handleReject}
          >
            {isOperating && <i className="fas fa-spinner fa-spin me-2"></i>}
            Rechazar
            <i className="fas fa-times label-icon"></i>
          </button>
          <button
            className="btn dm-button btn-label text-light ms-2"
            disabled={isOperating}
            onClick={handleAccept}
          >
            {isOperating && <i className="fas fa-spinner fa-spin me-2"></i>}
            Aceptar
            <i className="fas fa-check label-icon"></i>
          </button>
        </div>
      </div>
    </>
  )
}

export default ModalTransferRequest
