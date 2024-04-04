import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { FormikInput, FormikSelect, isEmail, isUrl } from "components/formElements"

const ModalEdit = ({ _crudName, CancelModalButton, CloseModalButton, localStore, onPut, setToastW, state, t, toastWaiting }) => {

    const _formName = "Edit"
    const genericId = _crudName.cod + "_" + _formName + "_"

    const [useUser, setUseUser] = useState([]);
    const validateFunction = values => {
        let errors = {}

        if (!values.imei) errors.imei = t("Enter the watch imei")
        if (!values.modem_imei) errors.imei = t("Enter the modem imei")

        return errors
    }

    const submitFunc = ({ active, ...values }) => {
        setToastW(true)

        let act = active == t("active") ? 1 : 0

        onPut({
            saveAs: "UNUSED-DATA",
            payload: { ...values, active: act },
            url: "watch"
        })
    }

    useEffect(() => {
        setUseUser(localStore?.tagList?.users);
    }, []);
   

    return (
        <React.Fragment>
            <div className="modal-header">
                <h4>Asignar usuarios</h4>
                <CloseModalButton />
            </div>

            <div className="modal-body">
                <div>
                    
                    {useUser?.map((permission, idx) => (
                        <div className='col-6' key={idx}>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    //checked={activePermissions.includes(permission.code)}
                                    checked={true}
                                    id={"permission-" + idx}
                                    //onChange={() => checkFunction(permission.code)}
                                    onChange={() => console.log("checkFunction")}
                                    name={permission.name}
                                    type="checkbox"
                                />
                                <label className="form-check-label" htmlFor={"permission-" + idx}>
                                    {t(permission.name)}
                                </label>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>

            <div className="modal-footer">
                <CancelModalButton />
                
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