import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput, FormikSelect, isEmail, isUrl} from "components/formElements"

const ModalEdit = ({_crudName, localStore, onPutAndGet, setToastW, state, t}) => {

    const _formName = "Edit"
    const genericId = _crudName.cod + "_" + _formName + "_"

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
                  name: state.elementSelected.name,
                  mark: state.elementSelected.mark,
                  model: state.elementSelected.model,
                  placa: state.elementSelected.placa,
                  platform_id: state.elementSelected.platform_id,
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

ModalEdit.propTypes = {
    _crudName: PropTypes.object,
    localStore: PropTypes.object,
    onPutAndGet: PropTypes.func,
    setToastW: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func,
}

export default ModalEdit