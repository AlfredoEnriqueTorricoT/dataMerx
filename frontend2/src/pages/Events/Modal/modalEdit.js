import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput, isEmail, isUrl} from "components/formElements"

const ModalEdit = ({_crudName, onPutAndGet, setToastW, state, t}) => {

    const _formName = "Edit"
    const genericId = _crudName.cod + "_" + _formName + "_"

    const validateFunction = values => {
        let errors = {}

        if (!values.name) errors.name = t("Enter the platform name")
        if (!values.url) errors.url = t("Enter the platform page web")
          else if (!isUrl(values.url)) errors.url = t("Enter a page web")
        if (!values.email) errors.email = t("Enter the platform email")
          else if (!isEmail(values.email)) errors.email = t("Enter a email")

        return errors
    }

    const submitFunc = values => {
      setToastW(true)

      const {password, ...rest} = values
      
      let formData = {...rest, id: state.elementSelected.id}
      
      if (password) {formData = {...formData, password: password}}

      onPutAndGet({
        saveAs: _crudName.cod + "List",
        payload: formData,
        url: "platform"})
    }

    return(
        <React.Fragment>
            <Formik
                onSubmit={submitFunc}
                initialValues={{
                    name: state.elementSelected.name,
                    detail: state.elementSelected.detail,
                    email: state.elementSelected.email,
                    url: state.elementSelected.url,
                    password: ""
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={_crudName.cod + "_" + _formName}>
                        <FormikInput
                          label={t("Name")}
                          inputName="name"
                          type="text"
                          required={true}
                          groupId ={genericId}
                        />
                        <FormikInput
                          label={t("Details")}
                          inputName="detail"
                          type="text"
                          groupId ={genericId}
                        />
                        <FormikInput
                          label={t("Page web")}
                          inputName="url"
                          type="text"
                          required={true}
                          groupId ={genericId}
                        />
                        <FormikInput
                          label="Email"
                          inputName="email"
                          type="text"
                          required={true}
                          groupId ={genericId}
                        />
                        <FormikInput
                          label={t("Password")}
                          inputName="password"
                          type="text"
                          groupId ={genericId}
                        />
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    )
}

ModalEdit.propTypes = {
    _crudName: PropTypes.func,
    onPutAndGet: PropTypes.func,
    setToastW: PropTypes.func,
    state: PropTypes.func,
    t: PropTypes.func,
}

export default ModalEdit