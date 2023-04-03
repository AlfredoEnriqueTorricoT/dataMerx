import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { getThisDate, SpinnerL } from 'components/components'
import { ErrorTable } from 'components/tableElements'

const ModalEvent = ({localStore, onGet, state}) => {
    const [modalStatus, setModalStatus] = useState(0) //0 loading, 1 success, 2 error
    const [detailStatus, setDetailStatus] = useState(-1) //-1 init, "", ...
    const [showImg, setShowImg] = useState(0)
    const [idSelected, setIdSelected] = useState(-1)

    const [activeTab, setActiveTab] = useState(0) // car, modem, sim
    const [tabsLocked, setTabsLocked] = useState([false, false, false])

    useEffect(()=>{
        if (modalStatus == 0 && localStore.status != "waiting response") {
            if (localStore.status == 200) setModalStatus(1)
            else setModalStatus(2)
        }
        if (detailStatus == 0 && localStore.status != "waiting response") {
            if (localStore.status == 200) setDetailStatus(1)
            else setDetailStatus(2)
        }
    }, [localStore.status])

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

      const DisplayDetails = ({eventDetails}) => {
        return(
            <React.Fragment>
                        <ul className="nav nav-tabs">
                          <NavItem _num={0} _name="Vehículo" />
                          <NavItem _num={1} _name="Módem" />
                          <NavItem _num={2} _name="Sim" />
                        </ul>
                        <div className="tab-content pt-4 grayScroll" style={{maxHeight: "55vh", overflowY: "auto", overflowX: "hidden"}}>
                                <div className={`tab-pane fade ${activeTab == 0 ? "active show" : ""}`}>
                            {eventDetails.car && !tabsLocked[0] ?
                                <div className="row">
                                    <div className="col">
                                        <ShowData title={"Nombre"} data={eventDetails.car.name} />
                                        <ShowData title={"Placa"} data={eventDetails.car.placa} />
                                        <ShowData title={"Módem"} data={eventDetails.car.modem_id || "- - -"} />
                                    </div>
                                    <div className="col">
                                        <ShowData title={"Marca"} data={eventDetails.car.mark} />
                                        <ShowData title={"Modelo"} data={eventDetails.car.model} />
                                        <ShowData title={"Plataforma"} data={eventDetails.car.platform_id || "- - -"} />
                                    </div>
                                </div>
                                 : <center><h4 className="text-secondary">Sin vehículo</h4></center>}
                            </div>
                            <div className={`tab-pane fade ${activeTab == 1 ? "active show" : ""}`}>
                            {eventDetails.modem && !tabsLocked[1] ?
                                <div className="row">
                                    <div className="col">
                                        <ShowData title={"Código"} data={eventDetails.modem.code} />
                                        <ShowData title={"Imei"} data={eventDetails.modem.imei} />
                                    </div>
                                    <div className="col">
                                        <ShowData title={"Mark id"} data={eventDetails.modem.mark_id} />
                                        <ShowData title={"Sim id"} data={eventDetails.modem.sim_id || "Sin sim"} />
                                    </div>
                                </div>
                                : <center><h4 className="text-secondary">Sin modem</h4></center>}
                            </div> 
                            <div className={`tab-pane fade ${activeTab == 2 ? "active show" : ""}`}>
                            {eventDetails.sim && !tabsLocked[2] ?
                                <div className="row">
                                    <div className="col">
                                        <ShowData title="Número" data={eventDetails.sim.number} />
                                        <ShowData title="Imei" data={eventDetails.sim.imei} />
                                    </div>
                                    <div className="col">
                                        <ShowData title="Estado" data={
                                            <span
                                            className={`badge font-size-11 rounded-pill badge-soft-${
                                                eventDetails.sim.active ? "primary" : "dark"
                                            } text-uppercase`}
                                          >
                                            {eventDetails.sim.active ? "ACTIVO" : "INACTIVO"}
                                          </span>
                                        } />
                                        <ShowData title="Código" data={eventDetails.sim.code} />
                                    </div>
                                </div>
                                : <center><h4 className="text-secondary">Sin sim</h4></center>}
                            </div>
                        </div>
                    </React.Fragment>
        )
    }

    const badgeColor = ["buen", "info", "warning", "danger"]
    const badgeText = ["dia", "Informativo", "Advertencia", "Peligro"]
    const DisplayEventList = () => {
        return(
            <div className="row">
                <div className="col-7">
                    <div className="row border-dark border-bottom">
                        <div className="col-6">
                            <b>Evento</b>
                        </div>
                        <div className="col-3">
                            <b>Fecha</b>
                        </div>
                        <div className="col-3">
                            <b>Tipo</b>
                        </div>
                    </div>
                    
                    <div
                        className="m-0 p-0 grayScroll"
                        style={{maxHeight: "55vh", overflowY: "auto", overflowX: "hidden"}}
                    >
                        {localStore.eventList.map((event, idx)=>(
                            <div
                                className={`row border-bottom py-1 ${idSelected == event.id ? ("bg-soft bg-secondary") : ""}`}
                                style={{cursor: "pointer"}}
                                onClick={()=>{onGet({saveAs: "eventImage", url: "event-images/"+event.id});setIdSelected(event.id); setDetailStatus(0)}}
                                key={"eventItem-"+idx}>
                                <div className="col-6">
                                    <b>{event.title}</b><br />
                                    <p>{event.detail}</p>
                                </div>
                                <div className="col-3 justify-content-center">
                                    {getThisDate(event.created_at)}
                                </div>
                                <div className="col-3 align-items-center">
                                    <center>
                                        <span
                                          className={`badge font-size-11 rounded-pill badge-soft-${
                                            badgeColor[event.type_id]
                                          } text-uppercase`}
                                        >
                                          {badgeText[event.type_id]}
                                        </span>
                                    </center>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-5 m-0 p-0 grayScroll" style={{maxHeight: "55vh", overflowY: "auto", overflowX: "hidden"}}>
                    {detailStatus == -1 ?
                        <center>
                            <h4 className="text-secondary my-5 py-5">Seleccione un evento</h4>
                        </center>
                    : ""}
                    {detailStatus == 0 ? <div className="my-5"><SpinnerL /></div> : ""}
                    {detailStatus == 1 ?
                        <React.Fragment>
                            <Carrousel images={localStore.eventImage} />
                            <DisplayDetails
                                eventDetails={{
                                    car: localStore.eventList.find((event)=>event.id == idSelected).car,
                                    modem: localStore.eventList.find((event)=>event.id == idSelected).modem,
                                    sim: localStore.eventList.find((event)=>event.id == idSelected).sim}}
                            />
                        </React.Fragment>
                    : ""}
                    {detailStatus == 2 ? <ErrorTable cod={localStore.status} retryFunction={RetryFDetail} /> : ""}
                </div>
            </div>
        )
    }

    const EmptyEventList = () => {
        return(
            <center>
                <h4 className="text-secondary my-5 py-5">
                    Sin eventos
                </h4>
            </center>
        )
    }

    const RetryFDetail = () => {
        onGet({saveAs: "eventImage", url: "event-images/" + idSelected})
        setDetailStatus(0)
    }
    const RetryFModal = () => {
        onGet({saveAs: "eventList", url: "event/car/" + state.elementSelected.id})
        setModalStatus(0)
    }

    return(
        <React.Fragment>
            {modalStatus == 0 ? <SpinnerL /> : ""}

            {
                modalStatus == 1 ?
                    (localStore.eventList.length ?
                    <DisplayEventList /> : <EmptyEventList />)
                : ""
            }

            {modalStatus == 2 ?
                <ErrorTable cod={localStore.status} retryFunction={RetryFModal} /> : ""
            }
        </React.Fragment>
    )
}

ModalEvent.propTypes = {
    localStore: PropTypes.object,
    onGet: PropTypes.func,
    state: PropTypes.object
}

export default ModalEvent