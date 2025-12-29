import React from 'react'
import { Formik, Form, Field } from 'formik'
import { showToast } from 'components/toast'
import { useModemFetch } from '../hooks'
import { ModemModel, ChangeStatusPayload } from '../models/ModemModel'

interface ModalChangeStatusProps {
  modem: ModemModel
  onClose: () => void
  t: (key: string) => string
}

const ModalChangeStatus: React.FC<ModalChangeStatusProps> = ({ modem, onClose, t }) => {
  const { changeStatus, isOperating } = useModemFetch()
  const isActive = modem.active === 1

  const validateFunction = (values: ChangeStatusPayload) => {
    const errors: Partial<Record<keyof ChangeStatusPayload, string>> = {}
    if (!values.description) {
      errors.description =
        'Ingrese el motivo de la ' + (isActive ? 'desactivación' : 'activación')
    }
    return errors
  }

  const submitFunction = async (values: ChangeStatusPayload) => {
    const result = await changeStatus(values)

    if (result.success) {
      showToast({
        type: 'success',
        message: 'El módem ha sido ' + (isActive ? 'desactivado' : 'activado'),
      })
      onClose()
    } else {
      showToast({
        type: 'warning',
        message: 'El módem no pudo ser ' + (isActive ? 'desactivado' : 'activado'),
      })
    }
  }

  return (
    <>
      <div className="modal-header">
        <h4>{isActive ? 'Desactivar' : 'Activar'} módem</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        <Formik
          onSubmit={submitFunction}
          initialValues={{
            modemId: modem.id,
            description: '',
          }}
          validate={validateFunction}
        >
          {() => (
            <Form id="modem_ChangeStatus">
              <div className="row mb-1">
                <label htmlFor="modem_onOff_description" className="col-3 col-form-label">
                  Descripción
                  <p className="text-danger d-inline-block">(*)</p>
                </label>
                <div className="col-9">
                  <Field
                    className="form-control"
                    id="modem_onOff_description"
                    rows={5}
                    name="description"
                    as="textarea"
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>
          {t('Cancel')}
        </button>
        <div className="ms-auto">
          <button
            className={`btn ${isActive ? 'btn-warning' : 'dm-button'} btn-label text-light`}
            disabled={isOperating}
            form="modem_ChangeStatus"
            type="submit"
          >
            {isOperating && <i className="fas fa-spinner fa-spin me-2"></i>}
            {isActive ? 'Desactivar' : 'Activar'}
            <i className={`fas fa-${isActive ? 'minus' : 'check'} label-icon`}></i>
          </button>
        </div>
      </div>
    </>
  )
}

export default ModalChangeStatus
