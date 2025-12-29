import React from 'react'
import { Formik, Field } from 'formik'
import { FormikInput } from 'components/formElements'
import { CreatePlatformPayload } from '../models/PlatformModel'

interface ModalAddProps {
  onSubmit: (payload: CreatePlatformPayload) => Promise<{ success: boolean; message: string }>
  onClose: () => void
  isSubmitting: boolean
  t: (key: string) => string
}

const ModalAdd: React.FC<ModalAddProps> = ({ onSubmit, onClose, isSubmitting, t }) => {
  const handleSubmit = async (values: CreatePlatformPayload) => {
    const result = await onSubmit(values)
    if (result.success) {
      onClose()
    }
  }

  const validateFunction = (values: CreatePlatformPayload) => {
    const errors: Partial<Record<keyof CreatePlatformPayload, string>> = {}
    if (!values.name) errors.name = t('Name is required')
    return errors
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
          detail: '',
          url: '',
          email: '',
          password: '',
        }}
        validate={validateFunction}
      >
        {({ handleSubmit: formikSubmit, isSubmitting: formikIsSubmitting }) => {
          const loading = formikIsSubmitting || isSubmitting
          return (
            <>
              <div className="modal-body">
                <form id="platform_add_form" onSubmit={formikSubmit}>
                  <FormikInput
                    label={t('Name')}
                    inputName="name"
                    type="text"
                    required={true}
                    groupId="platform_add_"
                  />

                  <div className="row mb-2">
                    <label htmlFor="platform_add_detail" className="col-3 col-form-label">
                      {t('Details')}
                    </label>
                    <div className="col-9">
                      <Field
                        as="textarea"
                        className="form-control"
                        id="platform_add_detail"
                        name="detail"
                      />
                    </div>
                  </div>

                  <FormikInput
                    label={t('Website')}
                    inputName="url"
                    type="text"
                    required={false}
                    groupId="platform_add_"
                  />

                  <FormikInput
                    label="Email"
                    inputName="email"
                    type="email"
                    required={false}
                    groupId="platform_add_"
                  />

                  <FormikInput
                    label={t('Password')}
                    inputName="password"
                    type="password"
                    required={false}
                    groupId="platform_add_"
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
                    form="platform_add_form"
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
