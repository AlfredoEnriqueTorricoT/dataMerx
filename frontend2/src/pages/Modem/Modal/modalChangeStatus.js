import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput, FormikSelect, isEmail, isUrl} from "components/formElements"
import { showToast } from 'components/toast'

const ModalChangeStatus = ({_crudName, CancelModalButton, CloseModalButton, formName, localStore, onGet, onPost, setState, state}) => {
  const [toastW, setToastW] = useState(false)

  useEffect(()=>{
    if (toastW && localStore.status != "waiting response") {
      if (localStore.status) {
        showToast({
          type: "success", message: "El módem ha sido " + (state.elementSelected.active == "activo" ? "desactivado" : "activado")
        })
        onGet({
          saveAs: "modemList",
          url: "modem/" + state.imeiToSearch
        })
        setState({modalOpen: false})
      } else
        showToast({
          type: "warning", title: "Error (" + localStore.status + ")",
          message: "El módem no pudo ser " + (state.elementSelected.active == "activo" ? "desactivado" : "activado")
        })
      setToastW(false)
    }
  }, [localStore.status])
  
    const genericId = _crudName.cod + "_" + formName + "_"

    const validateFunction = values => {
        let errors = {}
        if (!values.description) errors.description = "Ingrese el motivo de la " + (state.elementSelected.active == "activo" ? "desactivación" : "activación")
        return errors
    }

    const submitFunction = values => {
        setToastW(true)
        onPost({
          saveAs: "UNUSED_DATA",
          payload: values,
          url: "modem-enabled-disabled",
        })
      }

    return(
        <React.Fragment>
          <div className="modal-header">
            <h4>{state.elementSelected.active == "activo" ? "Desactivar" : "Activar"} módem</h4>
            <CloseModalButton />
          </div>

          <div className="modal-body">
            <Formik
                onSubmit={submitFunction}
                initialValues={{
                    id: state.elementSelected.id,
                    description: ""
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={_crudName.cod + "_" + formName}>
                      <div className="row mb-1">
                          <label
                            htmlFor="modem_onOff_description"
                            className="col-3 col-form-label"
                            >
                            Descripción
                            <p className="text-danger d-inline-block">(*)</p>
                          </label>
                          <div className="col-9">
                            <Field
                              className="form-control"
                              id="modem_onOff_description"
                              rows={5}
                              name="description"
                              as="textArea"
                            />
                            
                          </div>
                        </div>
                    </Form>
                )}
            </Formik>
            </div>

            <div className="modal-footer">
              <CancelModalButton />
              <div className="ms-auto">
                <button
                  className={`btn ${state.elementSelected.active == "activo" ? "btn-warning" : "dm-button"} btn-label text-light`}
                  disabled={toastW}
                  form={_crudName.cod + "_" + formName}
                  type="submit">
                  {state.elementSelected.active == "activo" ? "Desactivar" : "Activar"}
                  <i className={`fas fa-${state.elementSelected.active == "activo" ? "minus" : "check"} label-icon`}></i>
                </button>
              </div>
            </div>
        </React.Fragment>
    )
}

ModalChangeStatus.propTypes = {
    _crudName: PropTypes.object,
    CancelModalButton: PropTypes.any,
    CloseModalButton: PropTypes.any,
    formName: PropTypes.string,
    localStore: PropTypes.object,
    onGet: PropTypes.func,
    onPost: PropTypes.func,
    setState: PropTypes.func,
    state: PropTypes.object,
}

export default ModalChangeStatus