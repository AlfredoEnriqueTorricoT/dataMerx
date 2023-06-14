import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'

import {FormikSelect} from "components/formElements"
import { SearchBar } from 'components/components'
import { SpinnerL } from 'components/components'
import { ErrorTable } from 'components/tableElements'
import { showToast } from 'components/toast'

import ModalModemConfirm from './modalModemConfirm'

const ModalSim = ({CancelModalButton, CloseModalButton, localStore, onGet, onPut, setState, state}) => {
    const [number, setImei] = useState("")
    const [simName, setSimName] = useState("")
    const [simId, setSimId] = useState(0)
    const [mDataStatus, setMDataStatus] = useState(0)//-1 error, 0 loading, 1 success
    const [tableStatus, setTableStatus] = useState(-2)//-2 init, -1 error, 0 loading, 1 success
    const [toastW, setToastW] = useState(false)
    const [secondModalOpen, setSecondModalOpen] = useState(false)
    
    useEffect(()=>{
        setSimId(state.elementSelected.sim_id || 0)
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
                    <ErrorTable cod={localStore.status} retryFunction={()=>onGet({saveAs: "modemDetails", url: "modem/details/" + state.elementSelected.id})} >Reintentar</ErrorTable>
                )
            case 0:
                return(
                    <SpinnerL />
                )
            case 1:
                return(
                    localStore.modemDetails.sim ?
                    <React.Fragment>
                        <div className="bg-secondary bg-soft row">
                            <div className="col-4">
                                <center>
                                    <i className="fas fa-sim-card mt-3"></i>
                                </center>
                            </div>
                            <div className="col-8">
                                <b>{localStore.modemDetails.sim.number}</b>
                                <br />
                                <p className="my-0">{localStore.modemDetails.sim.imei} {localStore.modemDetails.sim.code}</p>
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
                    localStore.simList.length && mDataStatus == 1 ?
                        localStore.simList.map((sim, idx) => (
                            sim.number != state.elementSelected.sim_number ?
                                    <div className={`row py-1 ${idx%2 == 0 ? "" : "bg-secondary bg-soft"}`} key={idx}>
                                        <div className="col-2">
                                            <center>
                                                <i className="fas fa-sim-card mt-3"></i>
                                            </center>
                                        </div>
                                        <div className="col-8">
                                            <b>{sim.number}</b>
                                            <br />
                                            <p className="my-0">{sim.imei} {sim.code}</p>
                                        </div>
                                        <div className="col-2">
                                            <center>
                                                <input
                                                    className="form-check-input mt-3"
                                                    checked={simId == sim.id}
                                                    onChange={()=>setSimId(sim.id)}
                                                    type="radio"
                                                />
                                            </center>
                                        </div>
                                    </div>
                             : localStore.simList.length === 1 ?
                                <div className="card" key={idx}>
                                     <div className="card-body">
                                         <center>
                                             <h4 className='text-secondary'>No hay sims que coincidan con su busqueda</h4>    
                                         </center>    
                                     </div>
                                </div> : ""
                        ))
                    :
                        <div className="card">
                            <div className="card-body">
                                <center>
                                    <h4 className='text-secondary'>No hay sims que coincidan con su busqueda</h4>    
                                </center>    
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
          saveAs: "simList",
          url: "sim/" + number
        })
    }
    
    const assignModem = () => {
      setToastW(true)

      const values = {
        id: state.elementSelected.id,
        sim_id: simId,
        name: simName,
        confirm: secondModalOpen
      }

      onPut({
        saveAs: "UNUSED-DATA",
        payload: values,
        url: "modem/update-sim",
        })
    }

    return(
        <React.Fragment>
            <div className="modal-header">
                <h4>Vincular sim</h4>
                <CloseModalButton />
            </div>
        
            <div className="modal-body">
                    <ShowActiveModem />
                {/* <center>
                    <div className="d-inline-block">
                        <input
                            className="form-control"
                            onChange={i=>setSimName(i.target.value)}
                            type="text"
                            placeholder='Nombre del usuario'
                            value={simName}
                        />
                    </div>
                </center> */}
                <br />
                <center>
                    <SearchBar
                        type="text"
                        className="form-control"
                        onChange={i => setImei(i.target.value)}
                        placeholder="Buscar por número..."
                        value={number}
                    >
                        <button
                          className="btn dm-button text-light"
                          disabled={number == "" || mDataStatus != 1}
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
                        disabled={simId == 0 || toastW}
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

ModalSim.propTypes = {
    CancelModalButton: PropTypes.any,
    CloseModalButton: PropTypes.any,
    localStore: PropTypes.object,
    onGet: PropTypes.func,
    onPut: PropTypes.func,
    setState: PropTypes.func,
    setToastW: PropTypes.func,
    state: PropTypes.object,
}

export default ModalSim