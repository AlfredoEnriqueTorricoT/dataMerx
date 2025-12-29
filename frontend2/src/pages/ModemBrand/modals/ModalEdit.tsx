import React from 'react'
import { Formik } from 'formik'
import { FormikInput } from 'components/formElements'
import { ModemBrandModel, UpdateModemBrandPayload } from '../models/ModemBrandModel'

interface ModalEditProps {
  modemBrand: ModemBrandModel
  onSubmit: (id: number, payload: UpdateModemBrandPayload) => Promise<{ success: boolean; message: string }>
  onClose: () => void
  isSubmitting: boolean
  t: (key: string) => string
}

const ModalEdit: React.FC<ModalEditProps> = ({ modemBrand, onSubmit, onClose, isSubmitting, t }) => {
  const handleSubmit = async (values: UpdateModemBrandPayload) => {
    const result = await onSubmit(modemBrand.id, values)
    if (result.success) {
      onClose()
    }
  }

  const validateFunction = (values: UpdateModemBrandPayload) => {
    const errors: Partial<Record<keyof UpdateModemBrandPayload, string>> = {}
    if (!values.name) errors.name = 'Ingrese el nombre de la marca'
    if (!values.detail) errors.detail = 'Ingrese el detalle de la marca'
    return errors
  }

  return (
    <React.Fragment>
      <div className="modal-header">
        <h4>Editar marca de módem</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          name: modemBrand.name,
          detail: modemBrand.detail || '',
        }}
        validate={validateFunction}
      >
        {({ handleSubmit: formikSubmit, isSubmitting: formikIsSubmitting }) => {
          const loading = formikIsSubmitting || isSubmitting
          return (
            <>
              <div className="modal-body">
                <form id="modem_brand_edit_form" onSubmit={formikSubmit}>
                  <FormikInput
                    label={t('Name')}
                    inputName="name"
                    type="text"
                    required={true}
                    groupId="modem_brand_edit_"
                  />
                  <FormikInput
                    label={t('Details')}
                    inputName="detail"
                    type="text"
                    required={true}
                    groupId="modem_brand_edit_"
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
                    form="modem_brand_edit_form"
                    type="submit"
                  >
                    {loading ? 'Guardando...' : 'Guardar'}
                    <i className={`fas fa-${loading ? 'spinner fa-spin' : 'save'} label-icon`}></i>
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

export default ModalEdit
