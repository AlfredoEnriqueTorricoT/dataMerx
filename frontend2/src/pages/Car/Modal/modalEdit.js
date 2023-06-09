import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput, FormikSelect, isEmail, isUrl} from "components/formElements"

const ModalEdit = ({_crudName, CloseModalButton, CancelModalButton, localStore, onPutAndGet, setToastW, state, t, toastWaiting}) => {

    const _formName = "Edit"
    const genericId = _crudName.cod + "_" + _formName + "_"

    const validateFunction = values => {
        let errors = {}

        if (!values.mark) errors.mark = t("Enter the car mark")
        if (!values.model) errors.model = t("Enter the car model")
        if (!values.placa) errors.placa = t("Enter the car license plate")

        return errors
    }

    const submitFunc = values => {
      setToastW(true)

      onPutAndGet({
        saveAs: _crudName.cod + "List",
        payload: values,
        url: "car"})
    }

    return(
        <React.Fragment>
            <div className="modal-header">
                <h4>Editar vehículo</h4>
                <CloseModalButton />
            </div>

            <div className="modal-body">
                <Formik
                    onSubmit={submitFunc}
                    initialValues={{
                      id: state.elementSelected.id,
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
            </div>

            <div className="modal-footer">
                <CancelModalButton />
                <div className="ms-auto">
                    <button className="btn dm-button text-light btn-label" disabled={toastWaiting} form={_crudName.cod + "_" + _formName}>
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
    CloseModalButton: PropTypes.any,
    CancelModalButton: PropTypes.any,
    localStore: PropTypes.object,
    onPutAndGet: PropTypes.func,
    setToastW: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func,
    toastWaiting: PropTypes.bool
}

export default ModalEdit