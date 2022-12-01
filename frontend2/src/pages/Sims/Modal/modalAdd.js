import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const ModalAdd = ({_crudName, onPostAndGet, t}) => {
  
    const validateFunction = values => {
        let errors = {}

        if (!values.number) errors.number = "Enter the sim number"
        if (!values.code) errors.code = "Enter the sim code"
        if (!values.imei) errors.imei = "Enter the sim imei"

        return errors
    }

    return(
        <React.Fragment>          
            <Formik
                onSubmit={values =>{
                  onPostAndGet({
                    saveAs: "simList",
                    payload: values,
                    url: "sim"})} }
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
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    )
}

ModalAdd.propTypes = {
    _crudName: PropTypes.object,
    onPostAndGet: PropTypes.func,
    t: PropTypes.func,
}

export default ModalAdd