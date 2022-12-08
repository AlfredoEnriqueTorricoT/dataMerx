import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput, FormikSelect, isEmail, isUrl} from "components/formElements"


const ModalAdd = ({_crudName, formName, localStore, onPostAndGet, setToastW, t}) => {
  
    const genericId = _crudName.cod + "_" + formName + "_"

    const validateFunction = values => {
        let errors = {}

        if (!values.imei) errors.imei = t("Enter the modem imei")
        if (!values.code) errors.code = t("Enter the modem code")
        if (!values.mark_id) errors.mark_id = t("Select a modem brand")

        return errors
    }
    
    const submitFunc = values => {
      setToastW(true)
    
      onPostAndGet({
        saveAs: _crudName.cod + "List",
        payload: values,
        url: "modem"})
    }

    return(
        <React.Fragment>
            <Formik
                onSubmit={submitFunc}
                initialValues={{
                    imei: "",
                    code: "",
                    mark_id: "",
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={_crudName.cod + "_" + formName}>
                      <FormikInput
                          label="Imei"
                          inputName="imei"
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
                        <FormikSelect
                          label={t("Modem brand")}
                          inputName="mark_id"
                          required={true}
                          groupId ={genericId}
                        >
                            <option hidden value="">{t("Select a modem brand")}</option>
                            {
                                localStore.modemBrandList.length == 0 ?
                                <option disabled className='text-secondary' value="">{t("No ") + t("modem brands")}</option>
                                :
                                localStore.modemBrandList.map((mBrand, idx) => (
                                    <option key={"mBO-" + idx} value={mBrand.id}>{mBrand.name}</option>
                                ))
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