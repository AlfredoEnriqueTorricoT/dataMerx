import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import { SpinnerL } from 'components/components'

import { URL_IMAGE } from 'store/api/AxiosServices'

const ModalDetails = ({CloseModalButton, CancelModalButton, localStore}) => {
    const [modalMode, setModalMode] = useState(0) // 0 loading, 1 success, 2 error
    const [activeTab, setActiveTab] = useState(0) // sim, car, modem
    const [tabsLocked, setTabsLocked] = useState([false, false, false])
    const [showImg, setShowImg] = useState(0)

    useEffect(()=>{
        if(modalMode == 0 && localStore.status != "waiting response") {
            if (localStore.status == 200) {
                let newTabsLocked = [false, true, true]
                if (localStore.simDetails.car) newTabsLocked[1] = false
                if (localStore.simDetails.modem) newTabsLocked[2] = false
                setTabsLocked(newTabsLocked)
                setModalMode(1)
            }
            else setModalMode(2)
        }
    }, [localStore.status])

    const NavItem = ({_num, _name}) => {
        return(
            <li className="nav-item">
                <a
                className={`nav-link ${activeTab == _num ? "active" : ""} ${tabsLocked[_num] ? "disabled" : ""}`}
                onClick={tabsLocked[_num] ? "" : ()=>{setActiveTab(_num); setShowImg(0)}}
                aria-current="page"
                href="#"
                >
                    {_name}
                </a>
            </li>
        )
    }

    const ShowData = ({title, data}) => {
        return(
            <div className="row mt-1">
                <p><b>{title}: </b>{data}</p>
            </div>
        )
    }

    const Carrousel = ({images}) => {
        const maxImg = images.length - 1
        const prevF = () => {
            if(showImg == 0) setShowImg(maxImg)
            else setShowImg(showImg - 1)
        }
        const nextF = () => {
            if (showImg >= maxImg) setShowImg(0)
            else setShowImg(showImg + 1)
        }

        return(
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    {images.map((image, idx) => (
                        <li
                            className={showImg == idx ? "active" : ""}
                            key={"CInd-"+idx}
                            onClick={()=>setShowImg(idx)}>
                        </li>
                    ))}
                </ol>
                <div className="carousel-inner">
                    {images.map((image, idx) => (
                      <div
                        className={`carousel-item ${showImg == idx ? "active" : ""}`}
                        style={{width: "100%", height: "40vh"}}
                        key={"CImg-"+idx}
                      >
                        <img
                            className="d-block w-100 imgCover"
                            src={URL_IMAGE + image.url}
                            alt="Second slide"
                        />
                      </div>
                    ))}
                </div>
                <a className="carousel-control-prev" onClick={prevF} role="button" data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" onClick={nextF} role="button" data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }

    return(
        <React.Fragment>
            <div className="modal-header">
                <h4>Detalles del sim</h4>
                <CloseModalButton />
            </div>

            <div className="modal-body">
            {modalMode == 0 ? <SpinnerL /> : ""}
            {modalMode == 1 ?
                <React.Fragment>
                    <div className="chat-conversation">
                        <div className="chat-day-title m-1">
                            <span className='title'><b>Vehículo</b></span>
                        </div>
                        {localStore.simDetails.car ?
                        <React.Fragment>
                            <div className="row">
                            <div className="col">
                                    <ShowData title={"Nombre"} data={localStore.simDetails.car.name} />
                                    <ShowData title={"Placa"} data={localStore.simDetails.car.placa} />
                                    {/* <ShowData title={"Módem"} data={localStore.simDetails.car.modem_id} /> */}
                                    <ShowData title={"Plataforma"} data={localStore.simDetails.car.platform ? localStore.simDetails.car.platform.name : "- - -"} />
                                </div>
                                <div className="col">
                                    <ShowData title={"Marca"} data={localStore.simDetails.car.mark} />
                                    <ShowData title={"Modelo"} data={localStore.simDetails.car.model} />
                                </div>
                            </div>
                        </React.Fragment> : <center><h4 className='text-secondary mb-3'>Sin vehículo asignado</h4></center>}
                            <div className="chat-day-title m-1">
                                <span className='title'><b>Módem</b></span>
                            </div>
                        {localStore.simDetails.modem ?
                        <React.Fragment>
                            <div className="row">
                                <div className="col">
                                    <ShowData title={"Código"} data={localStore.simDetails.modem.code} />
                                    <ShowData title={"Imei"} data={localStore.simDetails.modem.imei} />
                                </div>
                                <div className="col">
                                    <ShowData title="Marca" data={localStore.simDetails.modem.modems_mark ? localStore.simDetails.modem.modems_mark.name : ""} />
                                    <ShowData title="Estado" data={
                                        <span
                                          className={`badge font-size-11 rounded-pill badge-soft-${
                                            localStore.simDetails.modem.active ? "primary" : "dark"
                                          } text-uppercase`}
                                        >
                                          {localStore.simDetails.modem.active ? "ACTIVO" : "INACTIVO"}
                                        </span>
                                    } />
                                    {/* <ShowData title={"Sim id"} data={localStore.simDetails.modem.sim_id || "- - -"} /> */}
                                </div>
                            </div>
                        </React.Fragment> : <center><h4 className='text-secondary mb-3'>Sin módem asignado</h4></center>}
                        <React.Fragment>
                            <div className="chat-day-title m-1">
                                <span className='title'><b>Sim</b></span>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <ShowData title="Número" data={localStore.simDetails.sim.number} />
                                    <ShowData title="Imei" data={localStore.simDetails.sim.imei} />
                                </div>
                                <div className="col">
                                    <ShowData title="Estado" data={
                                        <span
                                        className={`badge font-size-11 rounded-pill badge-soft-${
                                            localStore.simDetails.sim.active ? "primary" : "dark"
                                        } text-uppercase`}
                                      >
                                        {localStore.simDetails.sim.active ? "ACTIVO" : "INACTIVO"}
                                      </span>
                                    } />
                                    {/* <ShowData title="Código" data={localStore.simDetails.sim.code} /> */}
                                </div>
                            </div>
                        </React.Fragment>
                    </div>
                </React.Fragment>
            : ""}
            {modalMode == 2 ? "ERROR" : ""}
            </div>

            <div className="modal-footer">
                <CancelModalButton />
                <div className="ms-auto"></div>
            </div>
        </React.Fragment>
    )
}

ModalDetails.propTypes = {
    CloseModalButton: PropTypes.any,
    CancelModalButton: PropTypes.any,
    localStore: PropTypes.object
}

export default ModalDetails