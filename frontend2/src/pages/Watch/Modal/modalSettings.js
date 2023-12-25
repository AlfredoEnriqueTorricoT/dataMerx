import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput, FormikSelect, isEmail, isUrl} from "components/formElements"

const ModalSettings = ({
    _crudName,
    CancelModalButton,
    CloseModalButton,
    localStore,
    onPut,
    onGetPlatform,
    platformStore,
    setToastW,
    state,
    t,
    toastWaiting}) => {

    useEffect(()=>{
        getPlatforms()
    }, [])

    const getPlatforms = () => {
        if (platformStore.platformList.length == 0)
            onGetPlatform({ saveAs: _crudName.cod + "List", url: "platform" })
    }

    const _formName = "Setting"
    const genericId = _crudName.cod + "_" + _formName + "_"

    const validateFunction = values => {
        let errors = {}

        if (!values.platform_id) errors.imei = t("Select a platform")
        if (!values.device_imei) errors.device_imei = t("Enter the device imei")

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

    const defaultOption = () => {
        if (platformStore.status == "waiting_response")
            return (t("Loading") + " " + t("platforms") + "...")
        if (platformStore.status == 200)
            return t("Select a platform")
    }

    const ShowPlatforms = () => {
        if (platformStore.length)
            return(
                platformStore.map((platform, idx)=>(
                    <option key={idx} value={platform.id}>{platform.name}</option>
                ))
            )
        else
            return (<option disabled>Sin plataformas</option>)
    }

    return(
        <React.Fragment>
            <div className="modal-header">
                <h4>Configurar reloj</h4>
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
                        <FormikSelect
                          label={t("Platform")}
                          inputName="platform_id"
                          required={true}
                          groupId ={genericId}
                        >
                            <option value="" hidden>{defaultOption()}</option>
                            <ShowPlatforms />
                        </FormikSelect>
                        <FormikInput
                          label="Imei"
                          inputName="device_imei"
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
                        Configurar
                        <i className="fas fa-wrench label-icon"></i>
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}

ModalSettings.propTypes = {
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

export default ModalSettings