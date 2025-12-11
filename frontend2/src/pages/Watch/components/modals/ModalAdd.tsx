import React from 'react'
import { Formik } from 'formik'
import { FormikInput } from 'components/formElements'
import { createWatchSchema } from '../../validations'
import { CreateWatchPayload } from '../../models/WatchModel'

interface ModalAddProps {
  onSubmit: (payload: CreateWatchPayload) => Promise<{ success: boolean; message: string }>
  onClose: () => void
  isSubmitting: boolean
  t: (key: string) => string
}

const ModalAdd: React.FC<ModalAddProps> = ({ onSubmit, onClose, isSubmitting, t }) => {
  const handleSubmit = async (values: { code: string; imei: string }) => {
    const payload: CreateWatchPayload = {
      code: values.code,
      imei: values.imei,
    }
    const result = await onSubmit(payload)
    if (result.success) {
      onClose()
    }
  }

  return (
    <React.Fragment>
      <div className="modal-header">
        <h4>Añadir reloj</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          code: '',
          imei: '',
        }}
        validationSchema={createWatchSchema}
      >
        {({ handleSubmit: formikSubmit, isSubmitting: formikIsSubmitting }) => {
          const loading = formikIsSubmitting || isSubmitting
          return (
            <>
              <div className="modal-body">
                <form id="watch_add_form" onSubmit={formikSubmit}>
                  <FormikInput
                    label={t('Code')}
                    inputName="code"
                    type="text"
                    required={true}
                    groupId="watch_add_"
                  />
                  <FormikInput
                    label="Imei"
                    inputName="imei"
                    type="number"
                    required={true}
                    groupId="watch_add_"
                  />
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onClose} disabled={loading}>
                  {t('Cancel')}
                </button>
                <div className="ms-auto">
                  <button
                    className="btn dm-button btn-label text-light"
                    disabled={loading}
                    form="watch_add_form"
                    type="submit"
                  >
                    {loading ? 'Añadiendo...' : 'Añadir'}
                    <i className={`fas fa-${loading ? 'spinner fa-spin' : 'plus'} label-icon`}></i>
                  </button>
                </div>
              </div>
            </>
          )
        }}
      </Formik>
    </React.Fragment>
  )
}

export default ModalAdd
