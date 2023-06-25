import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { showToast } from 'components/toast'

const ModalAdd = ({ModalCancelButton, ModalCloseButton, localStore, setState, onPostAndGet, t}) => {
  const [toastWaiting, setToastW] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatP, setShowRepeatP] = useState(false)

  useEffect(()=>{
    if (toastWaiting && localStore.status != "waiting response") {
      setToastW(false)
      toastFunction()
    }
  }, [localStore.status])

  const toastFunction = () => {
    let itsOk = localStore.status == 200

    showToast({
      title: itsOk? "" : "Error (" + localStore.status + ")",
      type: itsOk ? "success" : "warning",
      message: itsOk ? "El usuario ha sido añadido" : "El usuario no pudo ser añadido"
    })

    if (itsOk) setState({modalOpen: false})
  }

    const validateFunction = values => {
        let errors = {}

        if (!values.name) errors.name = "Enter the user name"
        if (!values.email) errors.email = "Enter the user email"
        if (!values.password) errors.password = "Ingrese la contraseña del usuario"
        if (!values.repeat_password) errors.repeat_password = "Repita la contraseña del usuario"
        if (values.password != values.repeat_password) errors.repeat_password = "Las contraseñas no coinciden"

        return errors
    }

    const submitFunction = values => {
      setToastW(true)
      const {repeat_password, ...userPayload} = values
      onPostAndGet({saveAs: "userList", payload: userPayload, url: "user"})
    }

    return(
        <React.Fragment>
          <div className="modal-header">
            <h4>Añadir usuario</h4>
            <ModalCloseButton />
          </div>

          <div className="modal-body">
            <Formik
                onSubmit={submitFunction}
                initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    repeat_password: ""
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id="user_add">
                        <div className="row mb-1">
                          <label
                            htmlFor="user_add_name"
                            className="col-3 col-form-label"
                            >
                            {t("Name")}
                            <p className="text-danger d-inline-block">(*)</p>
                          </label>
                          <div className="col-9">
                            <Field
                              className="form-control"
                              id="user_add_name"
                              name="name"
                              type="text"
                            />
                            <ErrorMessage name="name">
                              {msg => <h6 className="text-danger">{t(msg)}</h6>}
                            </ErrorMessage>
                          </div>
                        </div>

                        <div className="row mb-1">
                          <label
                            htmlFor="user_add_detail"
                            className="col-3 col-form-label"
                            >
                            {t("Email")}
                            <p className="text-danger d-inline-block">(*)</p>
                          </label>
                          <div className="col-9">
                            <Field
                              className="form-control"
                              id="user_add_detail"
                              name="email"
                              type="text"
                            />
                            <ErrorMessage name="email">
                              {msg => <h6 className="text-danger">{t(msg)}</h6>}
                            </ErrorMessage>
                          </div>
                        </div>
                        
                        <div className="row mb-1">
                          <label
                            htmlFor="user_add_password"
                            className="col-3 col-form-label"
                            >
                            Contraseña
                            <p className="text-danger d-inline-block">(*)</p>
                          </label>
                          <div className="col-9">
                            <div className="input-group">
                              <Field
                                className="form-control"
                                id="user_add_password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn dm-button"
                                  onClick={()=>setShowPassword(!showPassword)}
                                  type="button"
                                >
                                  <i className={`fas fa-eye${showPassword ? "" : "-slash"} text-light`}>

                                  </i>
                                </button>
                              </div>
                            </div>
                            <ErrorMessage name="password">
                              {msg => <h6 className="text-danger">{t(msg)}</h6>}
                            </ErrorMessage>
                          </div>
                        </div>

                        <div className="row mb-1">
                          <label
                            htmlFor="user_add_repeat_password"
                            className="col-3 col-form-label"
                            >
                            Repetir contraseña
                            <p className="text-danger d-inline-block">(*)</p>
                          </label>
                          <div className="col-9">
                            <div className="input-group">
                              <Field
                                className="form-control"
                                id="user_add_repeat_password"
                                name="repeat_password"
                                type={showRepeatP ? "text" : "password"}
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn dm-button"
                                  onClick={()=>setShowRepeatP(!showRepeatP)}
                                  type='button'
                                  >
                                <i className={`fas fa-eye${showRepeatP ? "" : "-slash"} text-light`}></i>
                                </button>
                              </div>
                            </div>
                            <ErrorMessage name="repeat_password">
                              {msg => <h6 className="text-danger">{t(msg)}</h6>}
                            </ErrorMessage>
                          </div>
                        </div>
                    </Form>
                )}
            </Formik>
          </div>

          <div className="modal-footer">
            <ModalCancelButton />
            <div className="ms-auto">
              <button
                className='btn dm-button text-light btn-label'
                disabled={toastWaiting}
                form="user_add"
                type="submit"
                >
                Añadir
                <i className='fas fa-plus label-icon'/>
              </button>
            </div>
          </div>
        </React.Fragment>
    )
}

ModalAdd.propTypes = {
    ModalCancelButton: PropTypes.any,
    ModalCloseButton: PropTypes.any,
    localStore: PropTypes.any,
    setState: PropTypes.func,
    onPostAndGet: PropTypes.func,
    t: PropTypes.func
}

export default ModalAdd