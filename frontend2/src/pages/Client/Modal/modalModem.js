import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'

import {FormikSelect} from "components/formElements"


const ModalModem = ({_crudName, formName, localStore, onPutAndGet, secondModal, setToastW, state, t}) => {
  
    const genericId = _crudName.cod + "_" + formName + "_"

    const validateFunction = values => {
        let errors = {}

        if (!values.modem_id) errors.modem_id = t("Select a modem")

        return errors
    }
    
    const submitFunc = values => {
      setToastW(true)

      onPutAndGet({
        saveAs: _crudName.cod + "List",
        payload: {
            ...values,
            confirm: secondModal.open
        },
        url: "car/update-modem",
        urlToGet: "car"
        })
    }

    return(
        <React.Fragment>
            <Formik
                onSubmit={submitFunc}
                initialValues={{
                    id: state.elementSelected.id,
                    modem_id: state.elementSelected.modem_id,
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={_crudName.cod + "_" + formName}>
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
                                <option className='text-secondary' disabled value="">{t("No ") + t("modems")}</option>
                            }
                        </FormikSelect>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    )
}

ModalModem.propTypes = {
    _crudName: PropTypes.object,
    formName: PropTypes.string,
    localStore: PropTypes.object,
    onPutAndGet: PropTypes.func,
    secondModal: PropTypes.object,
    setToastW: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func,
}

export default ModalModem