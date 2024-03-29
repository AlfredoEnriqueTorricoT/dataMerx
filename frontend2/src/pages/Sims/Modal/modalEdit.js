import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { showToast } from 'components/toast'

const ModalEdit = ({_crudName, CloseModalButton, CancelModalButton, localStore, setState, onPutAndGet, state, t}) => {
    const [imei, setImei] = useState("")
    const [toastW, setToastW] = useState(false)

    useEffect(()=>{
      setImei(state.elementSelected.imei)
    }, [])

    useEffect(()=>{
      if (toastW && localStore.status != "waiting response") {
        if (localStore.status == 200) {
          showToast({
            type: "success", message: "El sim ha sido editado"
          })
          setState({modalOpen: false})
        } else {
          showToast({
            type: "warning", message: "El sim no pudo ser editado",
            title: "Error (" + localStore.status + ")"
          })
        }
        setToastW(false)
      }
    }, [localStore.status])

    const validateFunction = values => {

        let errors = {}

        if (!values.number) errors.number = "Enter the sim number"
        if (values.number.toString().length != 8) errors.number = "El número de teléfono debe ser de 8 dígitos"
        if (!imei) errors.imei = "Enter the sim imei"

        return errors
    }

    const submitFunc = values => {
      onPutAndGet({
        saveAs: "simList",
        payload: {...values,
        imei: imei,
        id: state.elementSelected.id},
        url: "sim"})

        setToastW(true)
    }

    return(
        <React.Fragment>
          <div className="modal-header">
            <h4>Editar sim</h4>
            <CloseModalButton />
          </div>

          <div className="modal-body">
            <Formik
                onSubmit={submitFunc}
                initialValues={{
                    number: state.elementSelected.number,
                    imei: state.elementSelected.imei
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={_crudName.cod + "_Edit"}>
                        <div className="row mb-1">
                          <label
                            htmlFor="sim_Add_number"
                            className="col-3 col-form-label"
                            >
                            {t("Number")}
                            <p className="text-danger d-inline-block">(*)</p>
                          </label>
                          <div className="col-9">
                            <Field
                              className="form-control"
                              id="sim_Add_number"
                              name="number"
                              type="number"
                            />
                            <ErrorMessage name="number">
                              {msg => <h6 className="text-danger">{t(msg)}</h6>}
                            </ErrorMessage>
                          </div>
                        </div>

                        <div className="row mb-1">
                          <label
                            htmlFor="sim_Add_imei"
                            className="col-3 col-form-label"
                            >
                            Imei
                            <p className="text-danger d-inline-block">(*)</p>
                          </label>
                          <div className="col-9">
                            <Field
                              className="form-control"
                              id="sim_Add_imei"
                              onChange={i=>setImei(i.target.value)}
                              name="imei"
                              type="number"
                              value={imei}
                            />
                            <ErrorMessage name="imei">
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
              <button className='btn dm-button text-light btn-label' disabled={toastW} form={_crudName.cod + "_Edit"} type='submit'>
                Añadir
                <i className='fas fa-edit label-icon'/>
              </button>
            </div>
          </div>
        </React.Fragment>
    )
}

ModalEdit.propTypes = {
    CloseModalButton: PropTypes.any,
    CancelModalButton: PropTypes.any,
    _crudName: PropTypes.object,
    localStore: PropTypes.object,
    setState: PropTypes.func,
    onPutAndGet: PropTypes.func,
    state: PropTypes.func,
    t: PropTypes.func,
}

export default ModalEdit