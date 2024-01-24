import React from 'react'
import PropTypes from 'prop-types'
import { DropdownButton, EmptyData } from 'components/tableElements'

const TableMobile = ({_crudName, onGet, listToShow, setState, t}) => {

  const MobileDataShow = ({title, desc}) => {
    return(
      <div className="row mb-1">
        <div className="col-5"><b>{title}</b></div>
        <div className="col-7">{desc}</div>
      </div>
    )
  }

  const detailsButton = data => {
    onGet({saveAs: "modemDetails", url: "modem/details/" + data.id})
    setState({
        modalOpen: true,
        modalType: "Details"
    })
}

const eventsButton = data => {
    onGet({saveAs: "eventList", url: "event/modem/" + data.id})
    setState({
        modalOpen: true,
        modalType: "Events",
        modalSize: "lg",
        elementSelected: data
    })
}

    return(
      <React.Fragment>
        {listToShow.length ?
        listToShow.map((listItem, idx)=>(
                <div className="row" key={_crudName.cod + "Item-" + idx}>
                  <div className="col-8">
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
                        desc={listItem.mark_modem_name || <EmptyData />}
                      />
                      <MobileDataShow
                        title="Plataforma"
                        desc={listItem.platform_name || <EmptyData />}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                  <div className="btn-group">
                                    <button
                                      className="btn button-sm py-0"
                                      title='Ver detalles'
                                      onClick={()=>detailsButton(listItem)}  
                                    >
                                      <i className="fas fa-eye"></i>
                                    </button>
                                    <button
                                      className="btn button-sm mx-1 py-0"
                                      title="Ver eventos"
                                      onClick={()=>eventsButton(listItem)}
                                      >
                                      <i className="fas fa-tasks"></i>
                                    </button>
                                    <DropdownButton
                                      className="btn button-sm py-0"
                                      title={<i className="mdi mdi-dots-horizontal font-size-18" />}
                                      buttons={[
                                        {
                                            title: "Editar módem",
                                            onClick: ()=>{
                                                setState({
                                                    modalOpen: true,
                                                    modalType: "Edit",
                                                    modalSize: "md",
                                                    elementSelected: listItem
                                                })
                                            }
                                        },
                                        {
                                            title: "Tarjeta sim",
                                            onClick: ()=>{
                                                onGet({saveAs: "modemDetails", url: "modem/details/" + listItem.id})
                                                setState({
                                                    modalOpen: true,
                                                    modalType: "Sim",
                                                    modalSize: "md",
                                                    elementSelected: listItem
                                                })
                                            }
                                        },
                                        {
                                            title: (listItem.active == "activo" ? "Desactivar" : "Activar") + " módem",
                                            onClick: ()=>{
                                                onGet({saveAs: "modemDetails", url: "modem/details/" + listItem.id})
                                                setState({
                                                    modalOpen: true,
                                                    modalType: "ChangeStatus",
                                                    modalSize: "md",
                                                    elementSelected: listItem
                                                })
                                            }
                                        },
                                        {
                                            title: "Añadir evento",
                                            onClick: ()=>{
                                                setState({
                                                    modalOpen: true,
                                                    modalType: "Add event to",
                                                    modalSize: "md",
                                                    elementSelected: listItem
                                                })
                                            }
                                        },
                                        {
                                            title: "Añadir imágenes",
                                            onClick: ()=>{
                                                setState({
                                                    modalOpen: true,
                                                    modalType: "Add images",
                                                    modalSize: "md",
                                                    elementSelected: listItem
                                                })
                                            }
                                        },
                                        {
                                          title: "Transferir",
                                          onClick: ()=>{
                                              setState({
                                                  modalOpen: true,
                                                  modalType: "Transfer",
                                                  modalSize: "md",
                                                  elementSelected: listItem
                                              })
                                          }
                                        }
                                      ]}
                                    />
                                    </div>
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