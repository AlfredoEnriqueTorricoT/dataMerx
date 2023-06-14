import React from 'react'
import PropTypes from 'prop-types'

import {Modal} from "reactstrap"

const ModalModemConfirm = ({assignModem, modalOpen, setModalOpen, localStore}) => {

    return(
        <Modal isOpen={modalOpen} size="sm">
            <div className="modal-header">
                <h4>Módem ya asignado</h4>
                <button
                    type="button"
                    onClick={()=>{
                        setModalOpen(false);
                        setToastW(false)
                      }}
                    className="close"
                    aria-label="Close"
                ></button>
            </div>
            <div className="modal-body">
                {localStore.message}
            </div>
            <div className="modal-footer">
                <button
                    className="btn btn-secondary"
                    onClick={()=>{
                        setModalOpen(false)
                        setToastW(false)
                    }}
                >
                    Cancelar
                </button>
                <div className="ms-auto">
                    <button
                        className="btn dm-button btn-label text-light"
                        disabled={localStore.status == "waiting response"}
                        onClick={assignModem}
                    >
                        {
                            localStore.status == "waiting response" ?
                            <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> :
                            <i className="fas fa-plus label-icon"></i>
                        }
                        Asignar
                    </button>
                </div>
            </div>
        </Modal>
    )
}

ModalModemConfirm.propTypes = {
    assignModem: PropTypes.func,
    localStore: PropTypes.any,
    modalOpen: PropTypes.bool,
    setModalOpen: PropTypes.func
}

export default ModalModemConfirm