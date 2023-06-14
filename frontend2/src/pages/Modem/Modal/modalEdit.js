import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput, FormikSelect, isEmail, isUrl} from "components/formElements"

const ModalEdit = ({_crudName, CancelModalButton, CloseModalButton, localStore, onPutAndGet, setToastW, state, t, toastWaiting}) => {

    const _formName = "Edit"
    const genericId = _crudName.cod + "_" + _formName + "_"

    const validateFunction = values => {
        let errors = {}

        if (!values.imei) errors.imei = t("Enter the modem imei")
        if (!values.code) errors.code = t("Enter the modem code")
        if (!values.mark_id) errors.mark_id = t("Select a modem brand")

        return errors
    }

    const submitFunc = ({active, ...values}) => {
      setToastW(true)

      let act = active == t("active") ? 1 : 0

      onPutAndGet({
        saveAs: _crudName.cod + "List",
        payload: {...values, active: act},
        url: "modem"})
    }

    return(
        <React.Fragment>
            <div className="modal-header">
                <h4>Editar módem</h4>
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
                  active: state.elementSelected.active
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={_crudName.cod + "_" + _formName}>
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
                        <FormikSelect
                          label={t("State")}
                          inputName="active"
                          groupId ={genericId}
                        >
                            <option value={t("active")}>{t("ACTIVE")}</option>
                            <option value={t("inactive")}>{t("INACTIVE")}</option>
                        </FormikSelect>
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
    onPutAndGet: PropTypes.func,
    setToastW: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func,
    toastWaiting: PropTypes.bool,
}

export default ModalEdit