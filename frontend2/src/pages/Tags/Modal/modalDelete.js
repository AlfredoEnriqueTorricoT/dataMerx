import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { showToast } from 'components/toast'

const ModalDelete = ({_crudName, CancelModalButton, CloseModalButton, localStore, onDeleteAndGet, setState, state, t}) => {
    const [toastW, setToastW] = useState(false)

    useEffect(()=>{
        if (toastW && localStore.status != "waiting response") {
            if (localStore.status == 200) {
                showToast({
                    type: "success",
                    title: t("Success"),
                    message: t("The watch has been deleted")
                })
                setState({modalOpen: false})
            }
            else
                showToast({
                    type: "warning",
                    title: t("Error") + " (" + localStore.status + ")",
                    message: t("The watch could not be deleted")
                })

            setToastW(false)
        }
    }, [localStore.status])

    const _formName = "Edit"
    const genericId = _crudName.cod + "_" + _formName + "_"

    const deleteFunc = () => {
        setToastW(true)
        onDeleteAndGet({url: "watch/" + state.elementSelected.id, urlToGet: "watch/" + state.imeiToSearch, saveAs: "watchList"})
    }

    return(
        <React.Fragment>
            <div className="modal-header">
                <h4>Eliminar reloj</h4>
                <CloseModalButton />
            </div>

            <div className="modal-body">
                <h5>
                    ¿Esta seguro que desea eliminar el reloj con el imei {state.elementSelected.imei}?
                </h5>
            </div>

            <div className="modal-footer">
                <CancelModalButton />
                <div className="ms-auto">
                    <button 
                        className="btn btn-danger btn-label text-light"
                        onClick={deleteFunc}
                        disabled={toastW}
                    >
                        Eliminar
                        <i className="fas fa-trash-alt label-icon"></i>
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}

ModalDelete.propTypes = {
    _crudName: PropTypes.object,
    CancelModalButton: PropTypes.any,
    CloseModalButton: PropTypes.any,
    localStore: PropTypes.object,
    onDeleteAndGet: PropTypes.func,
    setState: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func,
}

export default ModalDelete