import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import { SpinnerL } from 'components/components'

import { URL_IMAGE } from 'store/api/AxiosServices'

const ModalDetails = ({CloseModalButton, CancelModalButton, localStore}) => {
    const [modalMode, setModalMode] = useState(0) // 0 loading, 1 success, 2 error
    const [activeTab, setActiveTab] = useState(0) // car, modem, sim
    const [tabsLocked, setTabsLocked] = useState([false, false, false])
    const [showImg, setShowImg] = useState(0)

    useEffect(()=>{
        if(modalMode == 0 && localStore.status != "waiting response") {
            if (localStore.status == 200) {
                let newTabsLocked = [false, true, true]
                if (localStore.carDetails.modem) newTabsLocked[1] = false
                if (localStore.carDetails.sim) newTabsLocked[2] = false
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
                <h4>Detalles del vehículo</h4>
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
                                <div className="row">
                                    <div className="col">
                                        <ShowData title={"Nombre"} data={localStore.carDetails.car.name} />
                                        <ShowData title={"Placa"} data={localStore.carDetails.car.placa} />
                                        {/* <ShowData title={"Módem"} data={localStore.carDetails.car.modem_id || "- - -"} /> */}
                                        <ShowData title={"Plataforma"} data={localStore.carDetails.car.platform ? localStore.carDetails.car.platform.name : "- - -"} />
                                    </div>
                                    <div className="col">
                                        <ShowData title={"Marca"} data={localStore.carDetails.car.mark} />
                                        <ShowData title={"Modelo"} data={localStore.carDetails.car.model} />
                                    </div>
                                    
                                </div>
                            {/* </div> */}
                            <div className="chat-day-title m-1">
                                <span className='title'><b>Módem</b></span>
                            </div>
                            {localStore.carDetails.modem ?
                            <React.Fragment>
                                <div className="row">
                                    <div className="col">
                                        <ShowData title={"Código"} data={localStore.carDetails.modem.code} />
                                        <ShowData title={"Imei"} data={localStore.carDetails.modem.imei} />
                                    </div>
                                    <div className="col">
                                        <ShowData title="Marca" data={localStore.carDetails.modem.modems_mark ? localStore.carDetails.modem.modems_mark.name : "Sin sim"} />
                                        <ShowData title="Estado" data={
                                            <span
                                              className={`badge font-size-11 rounded-pill badge-soft-${
                                                localStore.carDetails.modem.active ? "primary" : "dark"
                                              } text-uppercase`}
                                            >
                                              {localStore.carDetails.modem.active ? "ACTIVO" : "INACTIVO"}
                                            </span>
                                        } />
                                    </div>
                                </div>
                            </React.Fragment> : <center><h4 className='text-secondary mb-3'>Sin módem asignado</h4></center>}
                            <div className="chat-day-title m-1">
                                <span className='title'><b>Sim</b></span>
                            </div>
                            {localStore.carDetails.sim ?
                            <React.Fragment>
                                <div className="row">
                                    <div className="col">
                                        <ShowData title="Número" data={localStore.carDetails.sim.number} />
                                        <ShowData title="Imei" data={localStore.carDetails.sim.imei} />
                                    </div>
                                    <div className="col">
                                        <ShowData title="Estado" data={
                                            <span
                                            className={`badge font-size-11 rounded-pill badge-soft-${
                                                localStore.carDetails.sim.active ? "primary" : "dark"
                                            } text-uppercase`}
                                          >
                                            {localStore.carDetails.sim.active ? "ACTIVO" : "INACTIVO"}
                                          </span>
                                        } />
                                        {/* <ShowData title="Código" data={localStore.carDetails.sim.code} /> */}
                                    </div>
                                </div>
                                </React.Fragment> : <center><h4 className='text-secondary mb-3'>Sin sim asignado</h4></center>}
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
    localStore: PropTypes.object,
}

export default ModalDetails