import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { showToast } from 'components/toast'
import { useUserFetch } from '../hooks'
import { UserModel } from '../models/UserModel'

interface ModalEditProps {
  user: UserModel
  onClose: () => void
  t: (key: string) => string
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Ingrese el nombre del usuario'),
  email: Yup.string().email('Email inválido').required('Ingrese el email del usuario'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres'),
  repeat_password: Yup.string().oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
})

const ModalEdit: React.FC<ModalEditProps> = ({ user, onClose, t }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatP, setShowRepeatP] = useState(false)
  const { updateUser, isOperating } = useUserFetch()

  const handleSubmit = async (values: {
    id: number
    name: string
    email: string
    password: string
    repeat_password: string
  }) => {
    const { repeat_password, password, ...userPayload } = values
    const payload = password ? { ...userPayload, password } : userPayload

    const result = await updateUser(payload)

    showToast({
      title: result.success ? '' : 'Error',
      type: result.success ? 'success' : 'warning',
      message: result.success ? 'El usuario ha sido editado' : 'El usuario no pudo ser editado',
    })

    if (result.success) {
      onClose()
    }
  }

  return (
    <>
      <div className="modal-header">
        <h4>Editar usuario</h4>
        <button type="button" onClick={onClose} className="btn-close" aria-label="Close"></button>
      </div>

      <Formik
        initialValues={{
          id: user.id,
          name: user.name || '',
          email: user.email || '',
          password: '',
          repeat_password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit: formikSubmit, isSubmitting }) => {
          const loading = isSubmitting || isOperating
          return (
            <>
              <div className="modal-body">
                <Form id="user_edit">
                  <div className="row mb-3">
                    <label htmlFor="user_edit_name" className="col-3 col-form-label">
                      {t('Name')}
                      <span className="text-danger">(*)</span>
                    </label>
                    <div className="col-9">
                      <Field
                        className="form-control"
                        id="user_edit_name"
                        name="name"
                        type="text"
                        disabled={loading}
                      />
                      <ErrorMessage name="name">
                        {(msg) => <small className="text-danger">{msg}</small>}
                      </ErrorMessage>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="user_edit_email" className="col-3 col-form-label">
                      Correo
                      <span className="text-danger">(*)</span>
                    </label>
                    <div className="col-9">
                      <Field
                        className="form-control"
                        id="user_edit_email"
                        name="email"
                        type="email"
                        disabled={loading}
                      />
                      <ErrorMessage name="email">
                        {(msg) => <small className="text-danger">{msg}</small>}
                      </ErrorMessage>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="user_edit_password" className="col-3 col-form-label">
                      Nueva contraseña
                    </label>
                    <div className="col-9">
                      <div className="input-group">
                        <Field
                          className="form-control"
                          id="user_edit_password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          disabled={loading}
                        />
                        <button
                          className="btn dm-button"
                          onClick={() => setShowPassword(!showPassword)}
                          type="button"
                        >
                          <i
                            className={`fas fa-eye${showPassword ? '' : '-slash'} text-light`}
                          ></i>
                        </button>
                      </div>
                      <ErrorMessage name="password">
                        {(msg) => <small className="text-danger">{msg}</small>}
                      </ErrorMessage>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="user_edit_repeat_password" className="col-3 col-form-label">
                      Repetir contraseña
                    </label>
                    <div className="col-9">
                      <div className="input-group">
                        <Field
                          className="form-control"
                          id="user_edit_repeat_password"
                          name="repeat_password"
                          type={showRepeatP ? 'text' : 'password'}
                          disabled={loading}
                        />
                        <button
                          className="btn dm-button"
                          onClick={() => setShowRepeatP(!showRepeatP)}
                          type="button"
                        >
                          <i className={`fas fa-eye${showRepeatP ? '' : '-slash'} text-light`}></i>
                        </button>
                      </div>
                      <ErrorMessage name="repeat_password">
                        {(msg) => <small className="text-danger">{msg}</small>}
                      </ErrorMessage>
                    </div>
                  </div>
                </Form>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onClose} disabled={loading}>
                  Cancelar
                </button>
                <button
                  className="btn dm-button text-light btn-label"
                  disabled={loading}
                  form="user_edit"
                  type="submit"
                >
                  {loading ? 'Guardando...' : 'Editar'}
                  <i className={`fas fa-${loading ? 'spinner fa-spin' : 'edit'} label-icon`}></i>
                </button>
              </div>
            </>
          )
        }}
      </Formik>
    </>
  )
}

export default ModalEdit
