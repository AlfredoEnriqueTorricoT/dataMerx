import React from 'react'
import PropTypes from 'prop-types'
import { EmptyData, OptionsButton, MobileDataShow } from 'components/tableElements'

const TableMobile = ({_crudName, onGet, listToShow, setState, t}) => {
    return(
      <React.Fragment>
        {listToShow.length ?
        listToShow.map((listItem, idx)=>(
                <div className="row" key={_crudName.cod + "Item-" + idx}>
                  <div className="col-10">
                    <div className="row">
                      <MobileDataShow
                        title="Código"
                        desc={listItem.code}
                      />
                      <MobileDataShow
                        title="Imei"
                        desc={listItem.imei}
                      />
                      <MobileDataShow
                        title="Estado"
                        desc={
                          <span
                              className={`badge font-size-11 rounded-pill badge-soft-${
                                listItem.active[0] == "a" ? "primary" : "dark"
                              } text-uppercase`}
                            >
                              {listItem.active}
                          </span>  
                        }
                      />
                      <MobileDataShow
                        title="Marca de módem"
                        desc={listItem.mBrand_name || <EmptyData />}
                      />
                      <MobileDataShow
                        title="Número"
                        desc={listItem.sim_number || <EmptyData />}
                      />
                    </div>
                  </div>
                  <div className="col-2">
                  <OptionsButton
                                        buttonsList={[
                                            {
                                                _label: "Ver detalles",
                                                onClick: ()=>{
                                                    onGet({saveAs: "modemDetails", url: "modem/details/" + listItem.id})
                                                    setState({
                                                        modalOpen: true,
                                                        modalType: "Details"
                                                    })
                                                }
                                            },
                                            {
                                                _label: "Editar módem",
                                                onClick: ()=>{
                                                    setState({
                                                        modalOpen: true,
                                                        modalType: "Edit",
                                                        elementSelected: listItem
                                                    })
                                                }
                                            },
                                            {
                                                _label: "Tarjeta sim",
                                                onClick: ()=>{
                                                    setState({
                                                        modalOpen: true,
                                                        modalType: "Sim",
                                                        elementSelected: listItem
                                                    })
                                                }
                                            },
                                            {
                                                _label: "Añadir evento",
                                                onClick: ()=>{
                                                    setState({
                                                        modalOpen: true,
                                                        modalType: "Add event to",
                                                        elementSelected: listItem
                                                    })
                                                }
                                            },
                                            {
                                              _label: "Ver eventos",
                                              onClick: ()=>{
                                                  onGet({saveAs: "eventList", url: "event/modem/" + listItem.id})
                                                  setState({
                                                      modalOpen: true,
                                                      modalType: "Events",
                                                      modalSize: "lg",
                                                      elementSelected: listItem
                                                  })
                                              }
                                          }
                                        ]}
                                    />
                    {/* <center>
                    <button
                                        className="btn btn-sm btn-info mb-1"
                                        title='Ver detalles'
                                        onClick={()=>{
                                            onGet({saveAs: "modemDetails", url: "modem/details/" + listItem.id})
                                            setState({
                                                modalOpen: true,
                                                modalType: "Details"
                                            })
                                        }}
                                    ><i className="fas fa-eye"></i></button>
                                    <br />
                    <button
                        className='btn btn-sm btn-primary'
                        onClick={()=>{
                            setState({
                                modalOpen: true,
                                modalType: "Edit",
                                elementSelected: listItem
                            })
                        }}
                        title='Editar módem'
                        >
                        <i className="fas fa-edit"></i>
                    </button>
                    <br />
                    <button 
                        className='btn btn-sm btn-secondary my-1'
                        onClick={()=>{
                            setState({
                                modalOpen: true,
                                modalType: "Sim",
                                elementSelected: listItem
                            })
                        }}
                        title='Sim del módem'
                        >
                        <i className="fas fa-sim-card"></i>
                    </button>
                    <br />
                    <button
                        className="btn btn-sm btn-info mb-1"
                        onClick={()=>{
                          onGet({saveAs: "eventList", url: "event/modem/" + listItem.id})
                          setState({
                              tableMode: "events",
                              elementSelected: listItem
                          })
                        }}
                        title='Ver eventos'
                      >
                          <i className="fas fa-eye"></i>
                    </button>
                    <br />
                    <button 
                        className='btn btn-sm btn-primary'
                        onClick={()=>{
                            setState({
                                modalOpen: true,
                                modalType: "Add event to",
                                elementSelected: listItem
                            })
                        }}
                        title='Añadir evento'
                        >
                        <i className="fas fa-tasks"></i>
                    </button>
                    </center> */}
                  </div>
                  {
                    listToShow.length -1 > idx ?
                    <hr
                      style={{
                        marginTop: "5px",
                        border: "0",
                        clear:"both",
                        display:"block",
                        width: "96%",
                        backgroundColor:"#909090",
                        height: "1px"
                      }}
                    />
                    : ""
                  }
                </div>
        )) :
        <center>
          <h4 className="text-secondary my-5">{t("No " + _crudName.multple + " found")}</h4>
        </center>
        }
      </React.Fragment>
    )
}

TableMobile.propTypes = {
    _crudName: PropTypes.object,
    onGet: PropTypes.func,
    listToShow: PropTypes.array,
    setSorterer: PropTypes.func,
    setState: PropTypes.func,
    sorterer: PropTypes.number,
    t: PropTypes.func
}

export default TableMobile