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
  const [requestAcepted, setRequestAcepted] = useState(0)

  const successMessage = ["La solicitud ha sido rechazada", "La solicitud ha sido aceptada"]
  const errorMessage = ["La solicitud no pudo ser rechazada (", "La solicitud no pudo ser aceptada ("]

  useEffect(()=>{
    if (toastWaiting && localStore.status != "waiting response") {
      if (localStore.status == 200) {
        setState({modalOpen: false})
        showToast({
          type: "success",
          message: successMessage[requestAcepted]
        })
      } else if (localStore.status == 432) {
        showToast({
          type: "info",
          message: localStore.message
        })
      }
      else {
        showToast({
          type: "warning",
          message: errorMessage[requestAcepted] + localStore.status +")"
        })
      }
    }
  }, [localStore.status])

  const cancelTransfer = () => {
    setRequestAcepted(0)
    postAndUpdate({
      saveAs: "UNUSED_DATA",
      url: "modem/transfer_cancel",
      payload: {id: state.elementSelected.id},
      dataToUpdate: {id: state.elementSelected.id, is_pending: 0, user_successor_id: null}
    })
    setToastW(true)
  }
  
  const completeTransfer = () => {
    setRequestAcepted(1)
    postAndUpdate({
      saveAs: "UNUSED_DATA",
      url: "modem/transfer_confirm",
      payload: {id: state.elementSelected.id},
      dataToUpdate: {
        id: state.elementSelected.id,
        is_pending: 0,
        user_responsabilty_id: state.elementSelected.user_successor_id,
        user_successor_id: null
      }
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
              El usuario <b>{state.elementSelected.responsability.name
                // userStore.userList.filter(user => user.id == state.elementSelected.user_responsability_id)[0].name
              }</b> quiere asignarte como responsable del módem
            </h4>
          </div>

            <div className="modal-footer">
              <button
                  className="btn btn-secondary"
                  onClick={()=>{
                      setState({modalOpen: false})
                  }}
              >
                  {t("Close")}
              </button>
              <div className="ms-auto">
                <button className="btn btn-danger btn-label text-light" disabled={toastWaiting} onClick={cancelTransfer}>
                  Rechazar
                  <i className="fas fa-times label-icon"></i>
                </button>
                <button className="btn dm-button btn-label text-light ms-2" disabled={toastWaiting} onClick={completeTransfer}>
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