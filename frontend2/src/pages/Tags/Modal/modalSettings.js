import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput, FormikSelect, isEmail, isUrl} from "components/formElements"

const ModalSettings = ({
    _crudName,
    CancelModalButton,
    CloseModalButton,
    localStore,
    onPostAndGet,
    onGetPlatform,
    platformStore,
    setToastW,
    state,
    t,
    toastWaiting}) => {
    const [switchState, setSwitchState] = useState(false)

    useEffect(()=>{
        getPlatforms()
    }, [])

    const getPlatforms = () => {
        if (platformStore.platformList.length == 0)
            onGetPlatform({ saveAs: "platformList", url: "platform" })
    }

    const _formName = "Setting"
    const genericId = _crudName.cod + "_" + _formName + "_"

    const validateFunction = values => {
        let errors = {}

        if (!values.platform_id) errors.platform_id = t("Select a platform")
        if (!values.device_imei) errors.device_imei = t("Enter the device imei")

        return errors
    }

    const submitFunc = (values) => {
      setToastW(true)

      onPostAndGet({
        saveAs: "watchList",
        urlToGet: "watch/" + state.imeiToSearch,
        payload: values,
        url: "watch/getDataConfigForWatch"})
    }

    const ShowPlatforms = () => (
        platformStore.platformList.length ?
            platformStore.platformList.map((platform, idx)=>(
                <option key={idx} value={platform.id}>{platform.name}</option>
            )) :
            <option disabled>Sin plataformas</option>
    )

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
                  device_imei: "",
                  platform_id: ""
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
                            <option disabled value="" hidden>{
                                platformStore.status == "waiting response" ?
                                    (t("Loading") + " " + t("platforms") + "...") :
                                    "Seleccione una plataforma"    
                            }</option>
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
    onPostAndGet: PropTypes.func,
    setToastW: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func,
    toastWaiting: PropTypes.bool,
}

export default ModalSettings