import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { showToast } from 'components/toast'

const ModalChangeStatus = ({CloseModalButton, CancelModalButton, localStore, onGet, onPost, setState, state, t}) => {
  const [toastW, setToastW] = useState(false)

  useEffect(()=>{
    if (toastW && localStore.status != "waiting response") {
      let aSidoQue = state.elementSelected.active ? "desactivado" : "activado"
      if (localStore.status == 200) {
        showToast({
          type: "success", message: "El sim ha sido " + aSidoQue
        })
        setState({modalOpen: false})
        onGet({saveAs: "simList", url: "sim/"+state.numberToSearch})
      } else 
        showToast({
          type: "warning", title: "Error (" + localStore.status + ")",
          message: "El sim no ha podido ser " + aSidoQue
        })
    }
  }, [localStore.status])
  
    const validateFunction = values => {
        let errors = {}
        if (!values.description) errors.description = "Escriba el motivo de la " + (state.elementSelected.active ? "desactivación" : "activación")
        return errors
    }
    
    const submitFunction = values => {
      setToastW(true)
      onPost({
        saveAs: "UNUSED-DATA",
        payload: values,
        url: "sim-enabled-disabled",
      })
    }

    return(
        <React.Fragment>
          <div className="modal-header">
            <h4>{state.elementSelected.active ? "Desactivar" : "Activar"} sim</h4>
            <CloseModalButton />
          </div>

          <div className="modal-body">
            <Formik
                onSubmit={values =>{
                  submitFunction(values)
                  } }
                initialValues={{
                    id: state.elementSelected.id,
                    description: ""
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={"sim_onOff"}>
                        <div className="row mb-1">
                          <label
                            htmlFor="sim_onOff_description"
                            className="col-3 col-form-label"
                            >
                            Descripción
                            <p className="text-danger d-inline-block">(*)</p>
                          </label>
                          <div className="col-9">
                            <Field
                              className="form-control"
                              id="sim_onOff_description"
                              rows={5}
                              name="description"
                              as="textArea"
                            />
                            <ErrorMessage name="description">
                              {msg => <h6 className="text-danger">{t(msg)}</h6>}
                            </ErrorMessage>
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
                className={`btn ${state.elementSelected.active ? "btn-warning" : "dm-button"} text-light btn-label`}
                disabled={localStore.status == "waiting response"}
                form={"sim_onOff"}
                type="submit">
                {state.elementSelected.active ? "Desactivar" : "Activar"}
                <i className={`fas fa-${state.elementSelected.active ? "minus" : "check"} label-icon`}/>
              </button>
            </div>
          </div>
        </React.Fragment>
    )
}

ModalChangeStatus.propTypes = {
    CloseModalButton: PropTypes.any,
    CancelModalButton: PropTypes.any,
    localStore: PropTypes.object,
    onGet: PropTypes.func,
    onPost: PropTypes.func,
    setState: PropTypes.func,
    state: PropTypes.any,
    t: PropTypes.func,
}

export default ModalChangeStatus