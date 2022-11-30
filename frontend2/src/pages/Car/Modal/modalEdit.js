import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput, isEmail, isUrl} from "components/formElements"

const ModalEdit = ({_crudName, onPutAndGet, setToastW, state, t}) => {

    const _formName = "Edit"
    const genericId = _crudName.cod + "_" + _formName + "_"

    const validateFunction = values => {
        let errors = {}

        if (!values.number) errors.number = t("Enter the car number")
        if (!values.code) errors.code = t("Enter the car code")
        if (!values.imei) errors.imei = t("Enter the car imei")

        return errors
    }

    const submitFunc = values => {
      setToastW(true)

      onPutAndGet({
        saveAs: _crudName.cod + "List",
        payload: formData,
        url: "car"})
    }

    return(
        <React.Fragment>
            <Formik
                onSubmit={submitFunc}
                initialValues={{
                  id: state.elementSelected.id,
                  number: state.elementSelected.number,
                  code: state.elementSelected.code,
                  imei: state.elementSelected.imei,
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={_crudName.cod + "_" + _formName}>
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

ModalEdit.propTypes = {
    _crudName: PropTypes.func,
    onPutAndGet: PropTypes.func,
    setToastW: PropTypes.func,
    state: PropTypes.func,
    t: PropTypes.func,
}

export default ModalEdit