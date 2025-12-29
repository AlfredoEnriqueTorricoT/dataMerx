import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FormikInput } from 'components/formElements'
import { CreatePlatformCountPayload } from '../../models/PlatformCountModel'

interface ModalAddProps {
  onSubmit: (payload: CreatePlatformCountPayload) => Promise<{ success: boolean; message: string }>
  onClose: () => void
  isSubmitting: boolean
  t: (key: string) => string
}

const createSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
})

const ModalAdd: React.FC<ModalAddProps> = ({ onSubmit, onClose, isSubmitting, t }) => {
  const handleSubmit = async (values: { name: string }) => {
    const payload: CreatePlatformCountPayload = {
      name: values.name,
    }
    const result = await onSubmit(payload)
    if (result.success) {
      onClose()
    }
  }

  return (
    <React.Fragment>
      <div className="modal-header">
        <h4>Añadir plataforma</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          name: '',
        }}
        validationSchema={createSchema}
      >
        {({ handleSubmit: formikSubmit, isSubmitting: formikIsSubmitting }) => {
          const loading = formikIsSubmitting || isSubmitting
          return (
            <>
              <div className="modal-body">
                <form id="platform_count_add_form" onSubmit={formikSubmit}>
                  <FormikInput
                    label={t('Name')}
                    inputName="name"
                    type="text"
                    required={true}
                    groupId="platform_count_add_"
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
                    form="platform_count_add_form"
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
