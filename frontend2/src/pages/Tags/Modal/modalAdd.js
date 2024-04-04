import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput, FormikSelect, isEmail, isUrl} from "components/formElements"


const ModalAdd = ({_crudName, CancelModalButton, CloseModalButton, formName, localStore, onPost, setToastW, t, toastWaiting}) => {
  
    const genericId = _crudName.cod + "_" + formName + "_"

    const validateFunction = values => {
        let errors = {}

        if (!values.code) errors.code = t("Enter the watch code")
        if (!values.imei) errors.imei = t("Enter the watch imei")

        return errors
    }

    const submitFunction = values => {
        setToastW(true)
  
        onPost({
          saveAs: "UNUSED_DATA",
          payload: values,
          url: "watch",
        })
      }

    return(
        <React.Fragment>
          <div className="modal-header">
            <h4>Añadir reloj</h4>
            <CloseModalButton />
          </div>

          <div className="modal-body">
            <Formik
                onSubmit={submitFunction}
                initialValues={{
                    code: "",
                    imei: "",
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={_crudName.cod + "_" + formName}>
                      <FormikInput
                          label={t("Code")}
                          inputName="code"
                          type="text"
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
            </div>

            <div className="modal-footer">
              <CancelModalButton />
              <div className="ms-auto">
                <button className="btn dm-button btn-label text-light" disabled={toastWaiting} form={_crudName.cod + "_" + formName} type="submit">
                  Añadir
                  <i className="fas fa-plus label-icon"></i>
                </button>
              </div>
            </div>
        </React.Fragment>
    )
}

ModalAdd.propTypes = {
    _crudName: PropTypes.object,
    CancelModalButton: PropTypes.any,
    CloseModalButton: PropTypes.any,
    formName: PropTypes.string,
    localStore: PropTypes.object,
    onPost: PropTypes.func,
    setToastW: PropTypes.func,
    t: PropTypes.func,
    toastWaiting: PropTypes.bool
}

export default ModalAdd