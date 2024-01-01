import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { showToast } from 'components/toast'

const ModalAdd = ({_crudName, CloseModalButton, CancelModalButton, localStore, onPost, setState, t}) => {
  const [simImages, setSimImages] = useState([])
  const [toastW, setToastW] = useState(false)

  useEffect(()=>{
    if (toastW && localStore.status != "waiting response") {
      if (localStore.status == 200) {
        showToast({
          type: "success", message: "El sim ha sido añadido"
        })
        setState({modalOpen: false})
      } else {
        showToast({
          type: "warning", message: "El sim no pudo ser añadido",
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
        if (!values.imei) errors.imei = "Enter the sim imei"

        return errors
    }
    
    const submitFunction = values => {
      setToastW(true)
      let fData = new FormData()

      for (let x = 0; x < simImages.length; x++) {
        fData.append("images[]", simImages[x]);
      }

      fData.append("number", values.number);
      fData.append("imei", values.imei);

      onPost({
        saveAs: "UNUSED-DATA",
        payload: fData,
        url: "sim-upload",
      })
    }

    return(
        <React.Fragment>
          <div className="modal-header">
            <h4>Añadir sim</h4>
            <CloseModalButton />
          </div>

          <div className="modal-body">
            <Formik
                onSubmit={values =>{
                  submitFunction(values)
                  } }
                initialValues={{
                    number: "",
                    imei: ""
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={_crudName.cod + "_Add"}>
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
                              name="imei"
                              type="number"
                            />
                            <ErrorMessage name="imei">
                              {msg => <h6 className="text-danger">{t(msg)}</h6>}
                            </ErrorMessage>
                          </div>
                        </div>
                        
                        <div className="row mb-1">
                          <label
                            htmlFor="sim_Add_images"
                            className="col-3 col-form-label"
                            >
                            Añadir imagenes
                          </label>
                          <div className="col-9">
                            <Field
                              className="form-control"
                              id="sim_Add_images"
                              multiple
                              name="images"
                              onChange={i => {
                                setSimImages(i.target.files);
                              }}
                              type="file"
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
              <button className='btn dm-button text-light btn-label' disabled={localStore.status == "waiting response"} form={_crudName.cod + "_Add"} type="submit">
                Añadir
                <i className='fas fa-plus label-icon'/>
              </button>
            </div>
          </div>
        </React.Fragment>
    )
}

ModalAdd.propTypes = {
    CloseModalButton: PropTypes.any,
    CancelModalButton: PropTypes.any,
    _crudName: PropTypes.object,
    localStore: PropTypes.object,
    onPost: PropTypes.func,
    setState: PropTypes.func,
    t: PropTypes.func,
}

export default ModalAdd