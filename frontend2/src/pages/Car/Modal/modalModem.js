import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'

import {FormikSelect} from "components/formElements"
import { SearchBar } from 'components/components'
import { SpinnerL } from 'components/components'
import { ErrorTable } from 'components/tableElements'
import { showToast } from 'components/toast'


const ModalModem = ({CancelModalButton, CloseModalButton, localStore, onGet, onPutAndGet, secondModal, setState, state}) => {
    const [imei, setImei] = useState("")
    const [modemId, setModemId] = useState(0)
    const [mDataStatus, setMDataStatus] = useState(0)//-1 error, 0 loading, 1 success
    const [toastW, setToastW] = useState(false)
    const [tableStatus, setTableStatus] = useState(-1)//-2 error, -1 init, 0 loading, 1 success
    
    useEffect(()=>{
        setModemId(state.elementSelected.modem_id || 0)
    }, [])

    useEffect(()=>{
        if (tableStatus == 0 && localStore.status != "waiting response") {
            if (localStore.status == 200) setTableStatus(1)
            else setTableStatus(2)
        }
        
        if (mDataStatus == 0 && localStore.status != "waiting response") {
            if (localStore.status == 200) setMDataStatus(1)
            else setMDataStatus(-1)
        }
        
        if (toastW && localStore.status != "waiting response") {
            if (localStore.status == 200) {
                showToast({
                    type: "success",
                    message: "El módem ha sido vinculado"
                })
                setState({modalOpen: false})
            }
            else if (localStore.status == 432) {
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

    const ShowTable = () => {
        switch (tableStatus) {
            case -2:
                return(<ErrorTable cod={localStore.status} retryFunction={searchFunction} />)
            case -1:
                return(
                    <center><h4>
                        Ingrese el imei del módem    
                    </h4></center>
                )
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
                                    <th>Número</th>
                                    <th>Selec.</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        localStore.modemList.length ?
                                            localStore.modemList.map((modem, idx) => (
                                                <tr key={idx}>
                                                    <td>{modem.code}</td>
                                                    <td>{modem.imei}</td>
                                                    <td>{modem.sim_number || "- - -"}</td>
                                                    <td>
                                                        <input
                                                            className="form-check-input"
                                                            checked={modemId == modem.id}
                                                            onChange={()=>setModemId(modem.id)}
                                                            type="radio"
                                                        />
                                                    </td>
                                                </tr>
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

    const ShowData = ({title, data}) => {
        return(
            <div className="row my-0">
                <p className='my-0'><b>{title}: </b>{data}</p>
            </div>
        )
    }

    const ShowModemAssigned = () => {
        switch (mDataStatus) {
            case -1:
                return(
                    <ErrorTable cod={localStore.status} retryFunction={()=>onGet({saveAs: "carDetails", url: "car/details/" + listItem.id})} />
                )
            case 0:
                return(
                    <SpinnerL />
                )
            case 1:
                return(
                    <div className="card bg-success bg-soft">
                        <div className="card-body">
                            {state.elementSelected.modem_id ?
                                <div className="row">
                                    <div className="col">
                                        <ShowData title={"Código"} data={localStore.carDetails.modem.code} />
                                        <ShowData title={"Imei"} data={localStore.carDetails.modem.imei} />
                                    </div>
                                    <div className="col">
                                        <ShowData title={"Mark id"} data={localStore.carDetails.modem.mark_id} />
                                        <ShowData title={"Sim id"} data={localStore.carDetails.modem.sim_id || "Sin sim"} />
                                    </div>
                                </div>
                                :
                                <center className="my-1">
                                    <h4 className="text-secondary">Ningún sim vinculado</h4>
                                </center>
                            }
                        </div>
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
        modem_id: modemId
      }

      onPutAndGet({
        saveAs: "carList",
        payload: {
            ...values,
            confirm: secondModal.open
        },
        url: "car/update-modem",
        urlToGet: "car"
        })
    }

    return(
        <React.Fragment>
            <div className="modal-header">
                <h4>Vincular módem</h4>
                <CloseModalButton />
            </div>
        
            <div className="modal-body">
                <div className="row">
                    <label className="form-label col-4 pt-4">
                        <b>Módem vinculado:</b>
                    </label>
                    <div className="col-8">
                        <ShowModemAssigned />
                    </div>
                </div>
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
                          className="btn btn-primary"
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
                        className="btn btn-success btn-label"
                        disabled={modemId == 0}
                        onClick={assignModem}
                    >
                        Asignar
                        <i className="fas fa-plus label-icon"></i>
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}

ModalModem.propTypes = {
    CancelModalButton: PropTypes.any,
    CloseModalButton: PropTypes.any,
    CloseModal: PropTypes.any,
    formName: PropTypes.string,
    localStore: PropTypes.object,
    onGet: PropTypes.func,
    onPutAndGet: PropTypes.func,
    secondModal: PropTypes.object,
    setState: PropTypes.func,
    setToastW: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func,
}

export default ModalModem