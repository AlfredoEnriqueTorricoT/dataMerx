import React from 'react'
import { Formik, Field } from 'formik'
import { FormikInput } from 'components/formElements'
import { PlatformModel, UpdatePlatformPayload } from '../models/PlatformModel'

interface ModalEditProps {
  platform: PlatformModel
  onSubmit: (id: number, payload: UpdatePlatformPayload) => Promise<{ success: boolean; message: string }>
  onClose: () => void
  isSubmitting: boolean
  t: (key: string) => string
}

const ModalEdit: React.FC<ModalEditProps> = ({ platform, onSubmit, onClose, isSubmitting, t }) => {
  const handleSubmit = async (values: UpdatePlatformPayload) => {
    const result = await onSubmit(platform.id, values)
    if (result.success) {
      onClose()
    }
  }

  const validateFunction = (values: UpdatePlatformPayload) => {
    const errors: Partial<Record<keyof UpdatePlatformPayload, string>> = {}
    if (!values.name) errors.name = t('Name is required')
    return errors
  }

  return (
    <React.Fragment>
      <div className="modal-header">
        <h4>Editar plataforma</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          name: platform.name,
          detail: platform.detail || '',
          url: platform.url || '',
          email: platform.email || '',
          password: '',
        }}
        validate={validateFunction}
      >
        {({ handleSubmit: formikSubmit, isSubmitting: formikIsSubmitting }) => {
          const loading = formikIsSubmitting || isSubmitting
          return (
            <>
              <div className="modal-body">
                <form id="platform_edit_form" onSubmit={formikSubmit}>
                  <FormikInput
                    label={t('Name')}
                    inputName="name"
                    type="text"
                    required={true}
                    groupId="platform_edit_"
                  />

                  <div className="row mb-2">
                    <label htmlFor="platform_edit_detail" className="col-3 col-form-label">
                      {t('Details')}
                    </label>
                    <div className="col-9">
                      <Field
                        as="textarea"
                        className="form-control"
                        id="platform_edit_detail"
                        name="detail"
                      />
                    </div>
                  </div>

                  <FormikInput
                    label={t('Website')}
                    inputName="url"
                    type="text"
                    required={false}
                    groupId="platform_edit_"
                  />

                  <FormikInput
                    label="Email"
                    inputName="email"
                    type="email"
                    required={false}
                    groupId="platform_edit_"
                  />

                  <FormikInput
                    label={t('Password')}
                    inputName="password"
                    type="password"
                    required={false}
                    groupId="platform_edit_"
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
                    form="platform_edit_form"
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
