import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput, isEmail, isUrl} from "components/formElements"


const ModalAdd = ({_crudName, formName, onPostAndGet, setToastW, t}) => {
  
    const genericId = _crudName.cod + "_" + formName + "_"

    const validateFunction = values => {
        let errors = {}

        if (!values.number) errors.number = t("Enter the car number")
        if (!values.code) errors.code = t("Enter the car code")
        if (!values.imei) errors.imei = t("Enter the car imei")

        return errors
    }
    
    const submitFunc = values => {
      setToastW(true)

      const {password, ...rest} = values
      
      let formData = {...rest}
      
      if (password) {formData = {...formData, password: password}}

      onPostAndGet({
        saveAs: _crudName.cod + "List",
        payload: formData,
        url: "car"})
    }

    return(
        <React.Fragment>
            <Formik
                onSubmit={submitFunc}
                initialValues={{
                    number: "",
                    code: "",
                    imei: "",
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={_crudName.cod + "_" + formName}>
                        <FormikInput
                          label={t("Number")}
                          inputName="number"
                          type="number"
                          required={true}
                          groupId ={genericId}
                        />
                        <FormikInput
                          label={t("Code")}
                          inputName="code"
                          type="number"
                          required={true}
                          groupId ={genericId}
                        />
                        <FormikInput
                          label="Imei"
                          inputName="imei"
                          type="number"
                          required={true}
                          groupId ={genericId}
                        />
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    )
}

ModalAdd.propTypes = {
    _crudName: PropTypes.object,
    formName: PropTypes.string,
    onPostAndGet: PropTypes.func,
    setToastW: PropTypes.func,
    t: PropTypes.func,
}

export default ModalAdd