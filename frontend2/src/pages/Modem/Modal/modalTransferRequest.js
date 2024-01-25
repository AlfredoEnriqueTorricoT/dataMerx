import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { showToast } from 'components/toast'
import {FormikInput, FormikSelect, isEmail, isUrl} from "components/formElements"


const ModalTransferRequest = ({
  CancelModalButton,
  CloseModalButton,
  localStore,
  setState,
  state,
  postAndUpdate,
  t,
  userStore
}) => { 
  const [toastWaiting, setToastW] = useState(false)

  useEffect(()=>{
    if (toastWaiting && localStore.status != "waiting response") {
      if (localStore.status == 200) {
        setState({modalOpen: false})
        showToast({
          type: "success",
          message: "El módem ha sido transferido"
        })
      }
      else {
        showToast({
          type: "warning",
          message: "El módem no pudo ser transferido ("+ localStore.status +")"
        })
      }
    }
  }, [localStore.status])

  const cancelTransfer = () => {
    postAndUpdate({
      saveAs: "UNUSED_DATA",
      url: "modem/transfer_cancel",
      payload: {id: state.elementSelected.id},
      dataToUpdate: {is_pending: 0, user_successor_id: null}
    })
    setToastW(true)
  }
  
  const completeTransfer = () => {
    postAndUpdate({
      saveAs: "UNUSED_DATA",
      url: "modem/transfer_confirm",
      payload: {id: state.elementSelected.id},
      dataToUpdate: {is_pending: 0, user_successor_id: null}
    })
    setToastW(true)
  }

    return(
        <React.Fragment>
          <div className="modal-header">
            <h4>Solicitud de transferencia</h4>
            <CloseModalButton />
          </div>

          <div className="modal-body">
            <h4>
              El usuario <code>user</code> quiere asignarte como responsable del módem
            </h4>
          </div>

            <div className="modal-footer">
              <CancelModalButton />
              <div className="ms-auto">
                <button className="btn btn-danger btn-label text-light" disabled={toastWaiting} onClick={cancelTransfer}>
                  Rechazar
                  <i className="fas fa-times label-icon"></i>
                </button>
                <button className="btn dm-button btn-label text-light" disabled={toastWaiting} onClick={completeTransfer}>
                  Aceptar
                  <i className="fas fa-check label-icon"></i>
                </button>
              </div>
            </div>
        </React.Fragment>
    )
}

ModalTransferRequest.propTypes = {
    _crudName: PropTypes.object,
    CancelModalButton: PropTypes.any,
    CloseModalButton: PropTypes.any,
    formName: PropTypes.string,
    localStore: PropTypes.object,
    setState: PropTypes.func,
    state: PropTypes.object,
    postAndUpdate: PropTypes.func,
    userStore: PropTypes.object,
    setToastW: PropTypes.func,
    t: PropTypes.func,
    toastWaiting: PropTypes.bool
}

export default ModalTransferRequest