import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const ModalAdd = ({_crudName, CloseModalButton, CancelModalButton, localStore, onPost, t}) => {
  const [simImages, setSimImages] = useState([])
  
    const validateFunction = values => {
        let errors = {}

        if (!values.number) errors.number = "Enter the sim number"
        if (values.number.toString().length != 8) errors.number = "El número de teléfono debe ser de 8 dígitos"
        if (!values.code) errors.code = "Enter the sim code"
        if (!values.imei) errors.imei = "Enter the sim imei"
        if (!simImages) errors.images = "Seleccione una o varias imagenes"

        return errors
    }
    
    const submitFunction = values => {
      let fData = new FormData()

      for (let x = 0; x < simImages.length; x++) {
        fData.append("images[]", simImages[x]);
      }

      fData.append("number", values.number);
      fData.append("code", values.code);
      fData.append("imei", values.imei);

      onPost({
        saveAs: "simList",
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
                    code: "",
                    imei: ""
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={_crudName.cod + "_Add"}>
                        <div className="row mb-1">
                          <label
                            htmlFor="sim_Add_code"
                            className="col-3 col-form-label"
                            >
                            {t("Code")}
                            <p className="text-danger d-inline-block">(*)</p>
                          </label>
                          <div className="col-9">
                            <Field
                              className="form-control"
                              id="sim_Add_code"
                              name="code"
                              type="number"
                            />
                            <ErrorMessage name="code">
                              {msg => <h6 className="text-danger">{t(msg)}</h6>}
                            </ErrorMessage>
                          </div>
                        </div>

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
                            <p className="text-danger d-inline-block">(*)</p>
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
                            <ErrorMessage name="images">
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
    t: PropTypes.func,
}

export default ModalAdd