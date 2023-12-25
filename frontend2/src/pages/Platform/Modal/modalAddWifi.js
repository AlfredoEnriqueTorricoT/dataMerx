import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput, isEmail, isUrl} from "components/formElements"
import { showToast } from 'components/toast'


const ModalAddWifi = ({_crudName, elementSelected, localStore, setModalOpen, formName, onPostAndGet, t}) => {
    const [toastW, setToastW] = useState(false)

    useEffect(()=>{
        if (toastW && localStore.status !== "waiting response"){
            if (localStore.status == 200) {
                showToast({
                    type: "success",
                    title: "",
                    message: t("The wifi has been added")
                })
                setToastW(false)
                setModalOpen(false)
            } else {
                showToast({
                    type: "warning",
                    title: t("Error") + " (" + localStore.status + ")",
                    message: t("The wifi could not be added")
                })
            }
            setToastW(false)
        }
    }, [localStore.status])
  
    const genericId = _crudName.cod + "_" + formName + "_"

    const validateFunction = values => {
        let errors = {}

        if (!values.ssid) errors.name = t("Enter the ssid")
        if (!values.password) errors.url = t("Enter the password")

        return errors
    }
    
    const submitFunc = values => {
      setToastW(true)

        onPostAndGet({
            saveAs: "wifiList",
            payload: values,
            url: "wifi",
            urlToGet: "wifi/" + elementSelected.id
        })
    }

    return(
        <React.Fragment>
            <div className='modal-header'>
                <h5 className='modal-title'>
                    {t("Add")} wi-fi
                </h5>
                <button
                type="button"
                onClick={()=>{
                    setModalOpen(false)
                  }}
                className="close"
                aria-label="Close"
                ></button>
            </div>

            <div className='modal-body'>
            <Formik
                onSubmit={submitFunc}
                initialValues={{
                    platform_id: elementSelected.id,
                    ssid: "",
                    password: ""
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={_crudName.cod + "_" + formName}>
                        <FormikInput
                          label="SSID"
                          inputName="ssid"
                          type="text"
                          required={true}
                          groupId ={genericId}
                        />
                        <FormikInput
                          label={t("Password")}
                          inputName="password"
                          type="text"
                          required={true}
                          groupId ={genericId}
                        />
                    </Form>
                )}
            </Formik>
            </div>

            <div className='modal-footer'>
                <button
                    className='btn btn-secondary'
                    onClick={()=>setModalOpen(false)}>
                        {t("Cancel")}
                </button>
                <div className='ms-auto'>
                    <button
                        className='btn btn-success btn-label'
                        disabled={toastW}
                        form={_crudName.cod + "_" + formName}
                        type="submit"
                    >
                        {t("Add")}
                        <i className='fas fa-plus label-icon' />
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}

ModalAddWifi.propTypes = {
    _crudName: PropTypes.object,
    formName: PropTypes.string,
    setModalOpen: PropTypes.func,
    onPostAndGet: PropTypes.func,
    setToastW: PropTypes.func,
    t: PropTypes.func,
}

export default ModalAddWifi