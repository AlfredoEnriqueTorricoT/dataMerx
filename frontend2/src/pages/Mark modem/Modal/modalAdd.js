import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { showToast } from 'components/toast'

const ModalAdd = ({CancelModalButton, CloseModalButton, localStore, onPostAndGet, setState, t}) => {
  const [toastW, setToastW] = useState(false)

  useEffect(()=>{
    if (toastW && localStore.status != "waiting response") {
      if (localStore.status == 200) {
          showToast({
            type: "success", message: "La marca de módem ha sido añadida"
          })
          setState({modalOpen: false})
        }
      else
        showToast({
          type: "warning", title: "Error (" + localStore.status + ")",
          message: "La marca de módem no pudo ser añadida"
        })
    }
  }, [localStore.status])
  
    const validateFunction = values => {
        let errors = {}

        if (!values.name) errors.name = "Enter the modem brand name"
        if (!values.detail) errors.detail = "Enter the modem brand detail"

        return errors
    }

    const submitFunc = values => {
      setToastW(true)
      onPostAndGet({saveAs: "modemBrandList", payload: values, url: "modem-mark"})
    }

    return(
        <React.Fragment>
          <div className="modal-header">
            <h4>Añadir marca de módem</h4>
            <CloseModalButton />
          </div>

          <div className="modal-body">
            <Formik
                onSubmit={submitFunc}
                initialValues={{
                    name: "",
                    detail: ""
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id="modemBrand_Add">
                        <div className="row mb-1">
                          <label
                            htmlFor="modemBrand_Add_name"
                            className="col-3 col-form-label"
                            >
                            {t("Name")}
                            <p className="text-danger d-inline-block">(*)</p>
                          </label>
                          <div className="col-9">
                            <Field
                              className="form-control"
                              id="modemBrand_Add_name"
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
                            htmlFor="modemBrand_Add_detail"
                            className="col-3 col-form-label"
                            >
                            {t("Details")}
                            <p className="text-danger d-inline-block">(*)</p>
                          </label>
                          <div className="col-9">
                            <Field
                              className="form-control"
                              id="modemBrand_Add_detail"
                              name="detail"
                              type="text"
                            />
                            <ErrorMessage name="detail">
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
                className='btn dm-button text-light btn-label'
                disabled={toastW}
                form='modemBrand_Add'
                type='submit'
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
    CancelModalButton: PropTypes.any,
    CloseModalButton: PropTypes.any,
    localStore: PropTypes.any,
    onPostAndGet: PropTypes.func,
    setState: PropTypes.func,
    t: PropTypes.func,
}

export default ModalAdd