import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput, FormikSelect, isEmail, isUrl} from "components/formElements"

const ModalEdit = ({_crudName, CancelModalButton, CloseModalButton, localStore, onPut, setToastW, state, t, toastWaiting}) => {

    const _formName = "Edit"
    const genericId = _crudName.cod + "_" + _formName + "_"

    const validateFunction = values => {
        let errors = {}

        if (!values.imei) errors.imei = t("Enter the watch imei")
        if (!values.modem_imei) errors.imei = t("Enter the modem imei")

        return errors
    }

    const submitFunc = ({active, ...values}) => {
      setToastW(true)

      let act = active == t("active") ? 1 : 0

      onPut({
        saveAs: "UNUSED-DATA",
        payload: {...values, active: act},
        url: "watch"})
    }

    return(
        <React.Fragment>
            <div className="modal-header">
                <h4>Editar reloj</h4>
                <CloseModalButton />
            </div>

            <div className="modal-body">
            <Formik
                onSubmit={submitFunc}
                initialValues={{
                  id: state.elementSelected.id,
                  code: state.elementSelected.code,
                  imei: state.elementSelected.imei,
                  mark_id: state.elementSelected.mark_id,
                  active: state.elementSelected.active,
                  platform_id: state.elementSelected.platform_id
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={_crudName.cod + "_" + _formName}>
                        <FormikInput
                          label="Imei"
                          inputName="imei"
                          type="number"
                          required={true}
                          groupId ={genericId}
                        />
                        <FormikInput
                          label="Módem imei"
                          inputName="modem_imei"
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
                    <button className="btn dm-button btn-label text-light" disabled={toastWaiting} form={_crudName.cod + "_" + _formName} type="submit">
                        Editar
                        <i className="fas fa-edit label-icon"></i>
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}

ModalEdit.propTypes = {
    _crudName: PropTypes.object,
    CancelModalButton: PropTypes.any,
    CloseModalButton: PropTypes.any,
    localStore: PropTypes.object,
    onPut: PropTypes.func,
    setToastW: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func,
    toastWaiting: PropTypes.bool,
}

export default ModalEdit