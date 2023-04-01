import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import { SpinnerL } from 'components/components'

const ModalDetails = ({localStore}) => {
    const [modalMode, setModalMode] = useState(0) // 0 loading, 1 success, 2 error
    const [activeTab, setActiveTab] = useState(0) // modem, car, sim
    const [tabsLocked, setTabsLocked] = useState([false, false, false])
    const [showImg, setShowImg] = useState(0)

    useEffect(()=>{
        if(modalMode == 0 && localStore.status != "waiting response") {
            if (localStore.status == 200) {
                let newTabsLocked = [false, true, true]
                if (localStore.modemDetails.car) newTabsLocked[1] = false
                if (localStore.modemDetails.sim) newTabsLocked[2] = false
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
                            src={"http://localhost:8000/storage/" + image.url}
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
            {modalMode == 0 ? <SpinnerL /> : ""}
            {modalMode == 1 ?
                <React.Fragment>
                    <ul className="nav nav-tabs">
                      <NavItem _num={0} _name="Módem" />
                      <NavItem _num={1} _name="Vehículo" />
                      <NavItem _num={2} _name="Sim" />
                    </ul>
                    <div className="tab-content pt-4">
                        <div className={`tab-pane fade ${activeTab == 0 ? "active show" : ""}`}>
                            {localStore.modemDetails.modem.images ?
                                <div className="row mb-1">
                                    <Carrousel images={localStore.modemDetails.modem.images} />
                                </div>
                            : ""}
                            <div className="row">
                                <div className="col">
                                    <ShowData title={"Código"} data={localStore.modemDetails.modem.code} />
                                    <ShowData title={"Imei"} data={localStore.modemDetails.modem.imei} />
                                </div>
                                <div className="col">
                                    <ShowData title={"Mark id"} data={localStore.modemDetails.modem.mark_id} />
                                    <ShowData title={"Sim id"} data={localStore.modemDetails.modem.sim_id || "Sin sim"} />
                                </div>
                            </div>
                        </div>
                        {localStore.modemDetails.car ?
                        <div className={`tab-pane fade ${activeTab == 1 ? "active show" : ""}`}>
                            {localStore.modemDetails.car.images ?
                                <div className="row mb-1">
                                    <Carrousel images={localStore.modemDetails.car.images} />
                                </div>
                            : ""}
                            <div className="row">
                                <div className="col">
                                    <ShowData title={"Nombre"} data={localStore.modemDetails.car.name} />
                                    <ShowData title={"Placa"} data={localStore.modemDetails.car.placa} />
                                    <ShowData title={"Módem"} data={localStore.modemDetails.car.modem_id} />
                                </div>
                                <div className="col">
                                    <ShowData title={"Marca"} data={localStore.modemDetails.car.mark} />
                                    <ShowData title={"Modelo"} data={localStore.modemDetails.car.model} />
                                    <ShowData title={"Plataforma"} data={localStore.modemDetails.car.platform_id} />
                                </div>
                            </div>
                        </div> : ""}
                        {localStore.modemDetails.sim ?
                        <div className={`tab-pane fade ${activeTab == 2 ? "active show" : ""}`}>
                            {localStore.modemDetails.sim.images ?
                                <div className="row mb-1">
                                    <Carrousel images={localStore.modemDetails.sim.images} />
                                </div>
                            : ""}
                            <div className="row">
                                <div className="col">
                                    <ShowData title="Número" data={localStore.modemDetails.sim.number} />
                                    <ShowData title="Imei" data={localStore.modemDetails.sim.imei} />
                                </div>
                                <div className="col">
                                    <ShowData title="Estado" data={localStore.modemDetails.sim.active} />
                                    <ShowData title="Código" data={localStore.modemDetails.sim.code} />
                                </div>
                            </div>
                        </div> : ""}
                    </div>
                </React.Fragment>
            : ""}
            {modalMode == 2 ? "ERROR" : ""}
        </React.Fragment>
    )
}

ModalDetails.propTypes = {
    localStore: PropTypes.object,
}

export default ModalDetails