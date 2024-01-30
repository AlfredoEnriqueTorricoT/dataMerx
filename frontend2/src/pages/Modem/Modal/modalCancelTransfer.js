import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { showToast } from 'components/toast'
import {FormikInput, FormikSelect, isEmail, isUrl} from "components/formElements"


const ModalCancelTransfer = ({
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
          message: "La solicitud de trasferencia ha sido anulada"
        })
      }  else if (localStore.status == 432) {
        showToast({
          type: "info",
          message: localStore.message
        })
      }
      else {
        showToast({
          type: "warning",
          message: "No se ha podido anular ("+ localStore.status +")"
        })
      }
    }
  }, [localStore.status])

  const cancelTransfer = () => {
    postAndUpdate({
      saveAs: "UNUSED_DATA",
      url: "modem/transfer_anular",
      payload: {id: state.elementSelected.id},
      dataToUpdate: {id: state.elementSelected.id, is_pending: 0, user_successor_id: null}
    })
    setToastW(true)
  }

    return(
        <React.Fragment>
          <div className="modal-header">
            <h4>Transferir</h4>
            <CloseModalButton />
          </div>

          <div className="modal-body">
            <h4>
              ¿Esta seguro de anular la transferencia del módem?
            </h4>
          </div>

            <div className="modal-footer">
              <CancelModalButton />
              <div className="ms-auto">
                <button className="btn btn-danger btn-label text-light" disabled={toastWaiting} onClick={cancelTransfer}>
                  Anular
                  <i className="fas fa-times label-icon"></i>
                </button>
              </div>
            </div>
        </React.Fragment>
    )
}

ModalCancelTransfer.propTypes = {
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

export default ModalCancelTransfer