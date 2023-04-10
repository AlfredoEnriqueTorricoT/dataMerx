import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput} from "components/formElements"


const ModalAdd = ({_crudName, formName, localStore, onPost, setToastW, t}) => {
    // const [clientImages, setClientImages] = useState({})
  
    const genericId = _crudName.cod + "_" + formName + "_"

    const validateFunction = values => {
        let errors = {}

        if (!values.ci) errors.ci = "Ingrese el ci del cliente"
        if (!values.name) errors.name = "Ingrese el nombre del cliente"

        return errors
    }

    const submitFunction = values => {
        setToastW(true)
        // let fData = new FormData()
  
        // for (let x = 0; x < clientImages.length; x++) {
        //   fData.append("images[]", clientImages[x]);
        // }
  
        // fData.append("ci", values.name);
        // fData.append("name", values.name);
        // fData.append("last_name", values.name);
        // fData.append("last_mother_name", values.name);
  
        onPost({
          saveAs: "UNUSED_DATA",
          payload: values,
          url: "client",
        })
      }

    return(
        <React.Fragment>
            <Formik
                onSubmit={submitFunction}
                initialValues={{
                    ci: "",
                    name: "",
                    last_name: "",
                    last_mother_name: "",
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={_crudName.cod + "_" + formName}>
                        <FormikInput
                          label="C. I."
                          inputName="ci"
                          type="text"
                          required={true}
                          groupId ={genericId}
                        />
                        <FormikInput
                          label="Nombre"
                          inputName="name"
                          type="text"
                          required={true}
                          groupId ={genericId}
                        />
                        <FormikInput
                          label="Apellido paterno"
                          inputName="last_name"
                          type="text"
                          groupId ={genericId}
                        />
                        <FormikInput
                          label="Apellido materno"
                          inputName="last_mother_name"
                          type="text"
                          groupId ={genericId}
                        />
                        {/* <div className="row mb-1">
                          <label
                            htmlFor="client_Add_images"
                            className="col-3 col-form-label"
                            >
                            Añadir imagenes
                            <p className="text-danger d-inline-block">(*)</p>
                          </label>
                          <div className="col-9">
                            <Field
                              className="form-control"
                              id="client_Add_images"
                              multiple
                              name="images"
                              onChange={i => {
                                setClientImages(i.target.files);
                              }}
                              type="file"
                            />
                            <ErrorMessage name="images">
                              {msg => <h6 className="text-danger">{t(msg)}</h6>}
                            </ErrorMessage>
                          </div>
                        </div> */}
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    )
}

ModalAdd.propTypes = {
    _crudName: PropTypes.object,
    formName: PropTypes.string,
    localStore: PropTypes.object,
    onPost: PropTypes.func,
    setToastW: PropTypes.func,
    t: PropTypes.func,
}

export default ModalAdd