import React from 'react'
import PropTypes from 'prop-types'

const DisplayDetails = ({activeTab, eventDetails, setActiveTab, setShowImg, tabsLocked}) => {

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

DisplayDetails.propTypes = {
    activeTab: PropTypes.any,
    eventDetails: PropTypes.any,
    setActiveTab: PropTypes.func,
    setShowImg: PropTypes.func,
    tabsLocked: PropTypes.any
}

export default DisplayDetails