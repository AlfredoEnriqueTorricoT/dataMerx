import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput, FormikSelect, isEmail, isUrl} from "components/formElements"


const ModalAdd = ({_crudName, formName, localStore, onPostAndGet, setToastW, t}) => {
  
    const genericId = _crudName.cod + "_" + formName + "_"

    const validateFunction = values => {
        let errors = {}

        if (!values.name) errors.name = t("Enter the car owner name")
        if (!values.mark) errors.mark = t("Enter the car mark")
        if (!values.model) errors.model = t("Enter the car model")
        if (!values.placa) errors.placa = t("Enter the car license plate")
        if (!values.modem_id) errors.modem_id = t("Select the car modem")
        if (!values.platform_id) errors.platform_id = t("Select the car platform")

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
                    name: "",
                    mark: "",
                    model: "",
                    placa: "",
                    modem_id: "",
                    platform_id: "",
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={_crudName.cod + "_" + formName}>
                        {/* name	mark	model	placa	modem_id	platform_id */}
                        <FormikInput
                          label={t("Owner")}
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
                            label={t("Modem")}
                            inputName="modem_id"
                            required={true}
                            groupId ={genericId}
                        >
                            <option hidden value="">{t("Select a modem")}</option>
                            {localStore.modemList.length ? 
                                localStore.modemList.map((modem, idx) => (
                                    <option key={"mO-"+idx} value={modem.id}>{modem.code}</option>
                                )) :
                                <option className='text-secondary' disabled value="">{t("No modems")}</option>
                            }
                        </FormikSelect>
                        <FormikSelect
                            label={t("Platform")}
                            inputName="platform_id"
                            required={true}
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