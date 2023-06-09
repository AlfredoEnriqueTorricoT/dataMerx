import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'

import {FormikSelect} from "components/formElements"
import { SearchBar } from 'components/components'
import { SpinnerL } from 'components/components'
import { ErrorTable } from 'components/tableElements'
import { showToast } from 'components/toast'

import ModalModemConfirm from './modalModemConfirm'

const ModalModem = ({CancelModalButton, CloseModalButton, localStore, onGet, onPut, secondModal, setState, state}) => {
    const [imei, setImei] = useState("")
    const [carName, setCarName] = useState("")
    const [modemId, setModemId] = useState(0)
    const [mDataStatus, setMDataStatus] = useState(0)//-1 error, 0 loading, 1 success
    const [tableStatus, setTableStatus] = useState(-2)//-2 init, -1 error, 0 loading, 1 success
    const [toastW, setToastW] = useState(false)
    const [secondModalOpen, setSecondModalOpen] = useState(false)
    
    useEffect(()=>{
        setModemId(state.elementSelected.modem_id || 0)
    }, [])

    useEffect(()=>{
        if (mDataStatus == 0 && localStore.status != "waiting response") {
            if (localStore.status == 200) setMDataStatus(1)
            else setMDataStatus(-1)
        }

        if (tableStatus == 0 && localStore.status != "waiting response") {
            if (localStore.status == 200) setTableStatus(1)
            else setTableStatus(-1)
        }
        
        if (toastW && localStore.status != "waiting response") {
            if (localStore.status == 200) {
                showToast({
                    type: "success",
                    message: "El módem ha sido vinculado"
                })
                setState({modalOpen: false})
            } else if (localStore.status == 232) {
                setToastW(false)
                setSecondModalOpen(true)
            } else if (localStore.status == 432) {
                showToast({
                    type: "info",
                    message: localStore.message
                })
            }
            else {
                showToast({
                    type: "warning",
                    message: "El módem no pudo ser vinculado (" + localStore.status + ")"
                })
            }

            setToastW(false)
        }
    }, [localStore.status])

    const ShowActiveModem = () => {
        switch (mDataStatus) {
            case -1:
                return(
                    <ErrorTable cod={localStore.status} retryFunction={()=>onGet({saveAs: "carDetails", url: "car/details/" + state.elementSelected.id})} />
                )
            case 0:
                return(
                    <SpinnerL />
                )
            case 1:
                return(
                    localStore.carDetails.modem ?
                    <React.Fragment>
                        <div className="row">
                            <div className="col">
                                <center>
                                    Código
                                    <br />
                                    <b>{localStore.carDetails.modem.code}</b>
                                </center>
                            </div>
                            <div className="col">
                                <center>
                                    Imei
                                    <br />
                                    <b>{localStore.carDetails.modem.imei}</b>
                                </center>
                            </div>
                            <div className="col">
                                <center>
                                    Marca
                                    <br />
                                    <b>{localStore.carDetails.modem.mark_id}</b>
                                </center>
                            </div>
                        </div>
                        <br />
                    </React.Fragment>
                    : 
                    <center>
                        <h4 className="text-secondary">Sin módem asignado</h4>
                    </center>
                )

            default:
                break;
        }
    }

    const ShowTable = () => {
        switch (tableStatus) {
            case -1:
                return(<ErrorTable cod={localStore.status} retryFunction={searchFunction} />)
            case 0:
                return(<SpinnerL />)
            case 1:
                return(
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Imei</th>
                                    <th>Selec.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    localStore.modemList.length && mDataStatus == 1 ?
                                        localStore.modemList.map((modem, idx) => (
                                            modem.id != state.elementSelected.modem_id ? <tr key={idx}>
                                                <td>{modem.code}</td>
                                                <td>{modem.imei}</td>
                                                <td>
                                                    <input
                                                        className="form-check-input"
                                                        checked={modemId == modem.id}
                                                        onChange={()=>setModemId(modem.id)}
                                                        type="radio"
                                                    />
                                                </td>
                                            </tr> : ""
                                        ))
                                    :
                                    <tr>
                                        <td colSpan="3">
                                            <h4 className='text-secondary'>No hay módems que coincidan con su busqueda</h4>
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                )
            default:
                break;
        }
    }
    
    const searchFunction = () => {
        setTableStatus(0)
        onGet({
          saveAs: "modemList",
          url: "modem/" + imei
        })
    }
    
    const assignModem = () => {
      setToastW(true)

      const values = {
        id: state.elementSelected.id,
        modem_id: modemId,
        name: carName,
        confirm: secondModalOpen
      }

      onPut({
        saveAs: "UNUSED-DATA",
        payload: values,
        url: "car/update-modem",
        })
    }

    return(
        <React.Fragment>
            <div className="modal-header">
                <h4>Vincular módem</h4>
                <CloseModalButton />
            </div>
        
            <div className="modal-body">
                    <ShowActiveModem /> :
                <center>
                    <div className="d-inline-block">
                        <input
                            className="form-control"
                            onChange={i=>setCarName(i.target.value)}
                            type="text"
                            placeholder='Nombre del usuario'
                            value={carName}
                        />
                    </div>
                </center>
                <br />
                <center>
                    <SearchBar
                        type="text"
                        className="form-control"
                        onChange={i => setImei(i.target.value)}
                        placeholder="Buscar por imei..."
                        value={imei}
                    >
                        <button
                          className="btn dm-button text-light"
                          disabled={imei == ""}
                          onClick={searchFunction}
                        >
                            {
                                tableStatus == 0 ?
                                <i className="bx bx-loader bx-spin"></i> :
                                <i className="fas fa-search"></i>
                            }
                        </button>
                    </SearchBar>
                </center>
                <br />
                <ShowTable />
            </div>

            <div className="modal-footer">
                <CancelModalButton />
                <div className="ms-auto">
                    <button
                        className="btn dm-button text-light btn-label"
                        disabled={modemId == 0 || toastW}
                        onClick={assignModem}
                    >
                        Asignar
                        <i className="fas fa-plus label-icon"></i>
                    </button>
                </div>
            </div>

            <ModalModemConfirm
                assignModem={assignModem}
                localStore={localStore}
                modalOpen={secondModalOpen}
                setModalOpen={setSecondModalOpen}
            />
        </React.Fragment>
    )
}

ModalModem.propTypes = {
    CancelModalButton: PropTypes.any,
    CloseModalButton: PropTypes.any,
    formName: PropTypes.string,
    localStore: PropTypes.object,
    onGet: PropTypes.func,
    onPut: PropTypes.func,
    secondModal: PropTypes.object,
    setState: PropTypes.func,
    setToastW: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func,
}

export default ModalModem