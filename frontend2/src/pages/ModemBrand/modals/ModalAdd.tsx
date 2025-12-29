import React from 'react'
import { Formik } from 'formik'
import { FormikInput } from 'components/formElements'
import { CreateModemBrandPayload } from '../models/ModemBrandModel'

interface ModalAddProps {
  onSubmit: (payload: CreateModemBrandPayload) => Promise<{ success: boolean; message: string }>
  onClose: () => void
  isSubmitting: boolean
  t: (key: string) => string
}

const ModalAdd: React.FC<ModalAddProps> = ({ onSubmit, onClose, isSubmitting, t }) => {
  const handleSubmit = async (values: CreateModemBrandPayload) => {
    const result = await onSubmit(values)
    if (result.success) {
      onClose()
    }
  }

  const validateFunction = (values: CreateModemBrandPayload) => {
    const errors: Partial<Record<keyof CreateModemBrandPayload, string>> = {}
    if (!values.name) errors.name = 'Ingrese el nombre de la marca'
    if (!values.detail) errors.detail = 'Ingrese el detalle de la marca'
    return errors
  }

  return (
    <React.Fragment>
      <div className="modal-header">
        <h4>Añadir marca de módem</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          name: '',
          detail: '',
        }}
        validate={validateFunction}
      >
        {({ handleSubmit: formikSubmit, isSubmitting: formikIsSubmitting }) => {
          const loading = formikIsSubmitting || isSubmitting
          return (
            <>
              <div className="modal-body">
                <form id="modem_brand_add_form" onSubmit={formikSubmit}>
                  <FormikInput
                    label={t('Name')}
                    inputName="name"
                    type="text"
                    required={true}
                    groupId="modem_brand_add_"
                  />
                  <FormikInput
                    label={t('Details')}
                    inputName="detail"
                    type="text"
                    required={true}
                    groupId="modem_brand_add_"
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
                    form="modem_brand_add_form"
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
