import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const ModalAdd = ({onPostAndGet, t}) => {
  
    const validateFunction = values => {
        let errors = {}

        if (!values.name) errors.name = "Enter the modem brand name"
        if (!values.detail) errors.detail = "Enter the modem brand detail"

        return errors
    }

    return(
        <React.Fragment>
            <Formik
                onSubmit={values => onPostAndGet({saveAs: "modemBrandList", payload: values, url: "modem-mark"})}
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
        </React.Fragment>
    )
}

ModalAdd.propTypes = {
    onPostAndGet: PropTypes.func,
    t: PropTypes.func,
}

export default ModalAdd