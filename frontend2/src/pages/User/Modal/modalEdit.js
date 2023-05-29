import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const ModalEdit = ({onPutAndGet, state, t}) => {

    const validateFunction = values => {
        let errors = {}

        if (!values.name) errors.name = "Enter the user name"
        if (!values.email) errors.email = "Enter the user email"

        return errors
    }

    return(
        <React.Fragment>
            <Formik
                onSubmit={values => onPutAndGet({
                  saveAs: "modemBrandList",
                  payload: {...values,
                  id: state.elementSelected.id},
                  url: "modem-mark"})}
                initialValues={{
                    name: state.elementSelected.name,
                    email: state.elementSelected.email
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id="modemBrand_Edit">
                        <div className="row mb-1">
                          <label
                            htmlFor="modemBrand_Edit_name"
                            className="col-3 col-form-label"
                            >
                            {t("Name")}
                            <p className="text-danger d-inline-block">(*)</p>
                          </label>
                          <div className="col-9">
                            <Field
                              className="form-control"
                              id="modemBrand_Edit_name"
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
                            htmlFor="modemBrand_Edit_detail"
                            className="col-3 col-form-label"
                            >
                            Correo
                            <p className="text-danger d-inline-block">(*)</p>
                          </label>
                          <div className="col-9">
                            <Field
                              className="form-control"
                              id="modemBrand_Edit_detail"
                              name="email"
                              type="text"
                            />
                            <ErrorMessage name="email">
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

ModalEdit.propTypes = {
    onPutAndGet: PropTypes.func,
    state: PropTypes.func,
    t: PropTypes.func,
}

export default ModalEdit