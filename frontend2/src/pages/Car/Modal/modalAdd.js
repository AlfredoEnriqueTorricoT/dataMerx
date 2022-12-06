import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput, FormikSelect, isEmail, isUrl} from "components/formElements"


const ModalAdd = ({_crudName, formName, localStore, onPostAndGet, setToastW, t}) => {
  
    const genericId = _crudName.cod + "_" + formName + "_"

    const validateFunction = values => {
        let errors = {}

        if (!values.name) errors.name = t("Enter the car name")
        if (!values.mark) errors.mark = t("Enter the car mark")
        if (!values.model) errors.model = t("Enter the car model")
        if (!values.placa) errors.placa = t("Enter the car license plate")

        return errors
    }
    
    const submitFunc = values => {
      setToastW(true)

      onPostAndGet({
        saveAs: _crudName.cod + "List",
        payload: values,
        url: "car"})
    }

    return(
        <React.Fragment>
            <Formik
                onSubmit={submitFunc}
                initialValues={{
                    name: "",
                    mark: "",
                    model: "",
                    placa: "",
                    platform_id: "",
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={_crudName.cod + "_" + formName}>
                        <FormikInput
                          label={t("Name")}
                          inputName="name"
                          type="text"
                          required={true}
                          groupId ={genericId}
                        />
                        <FormikInput
                          label={t("Mark")}
                          inputName="mark"
                          type="text"
                          required={true}
                          groupId ={genericId}
                        />
                        <FormikInput
                          label={t("Model")}
                          inputName="model"
                          type="text"
                          required={true}
                          groupId ={genericId}
                        />
                        <FormikInput
                          label={t("License plate")}
                          inputName="placa"
                          type="text"
                          required={true}
                          groupId ={genericId}
                        />
                        <FormikSelect
                            label={t("Platform")}
                            inputName="platform_id"
                            groupId ={genericId}
                        >
                            <option hidden value="">{t("Select a platform")}</option>
                            {localStore.platformList.length ? 
                                localStore.platformList.map((platform, idx) => (
                                    <option key={"mO-"+idx} value={platform.id}>{platform.name}</option>
                                )) :
                                <option className='text-secondary' disabled value="">{t("No platforms")}</option>
                            }
                        </FormikSelect>
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
    onPostAndGet: PropTypes.func,
    setToastW: PropTypes.func,
    t: PropTypes.func,
}

export default ModalAdd