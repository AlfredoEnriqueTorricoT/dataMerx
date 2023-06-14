import React from 'react'
import PropTypes from 'prop-types'

import { EmptyData, OptionsButton } from 'components/tableElements'

const TableMobile = ({_crudName, listToShow, onGet, setState, t}) => {
    return(
      <React.Fragment>
        {listToShow.length ?
        listToShow.map((listItem, idx)=>(
            // <div className="card" key={_crudName.cod + "Item-" + idx}>
            //   <div className="card-body">
                <div className="row" key={_crudName.cod + "Item-" + idx}>
                  <div className="col-10">
                    <div className="row">
                      <div className="col-4">
                        <b>{t("License plate")}</b><br />
                        <b>{t("Mark")}</b><br />
                        <b>{t("Model")}</b><br />
                        <b>{t("Name")}</b><br />
                        {/* <b>{t("Platform")}</b><br /> */}
                        <b>Módem id</b><br />
                      </div>
                      <div className="col-8">
                        {listItem.placa}<br />
                        {listItem.mark}<br />
                        {listItem.model}<br />
                        {listItem.name || <EmptyData />}<br />
                        {/* {listItem.platform_name || "- - -"}<br /> */}
                        {listItem.modem_id || <EmptyData />}<br />
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                  <OptionsButton
                                    buttonsList={[
                                        {
                                            _label: "Ver detalles",
                                            onClick: ()=>{
                                                onGet({saveAs: "carDetails", url: "car/details/" + listItem.id})
                                                setState({
                                                    modalOpen: true,
                                                    modalType: "Details"
                                                })
                                            }
                                        },
                                        {
                                            _label: "Editar vehículo",
                                            onClick: ()=>{
                                                setState({
                                                    modalOpen: true,
                                                    modalType: "Edit",
                                                    elementSelected: listItem
                                                })
                                            }
                                        },
                                        {
                                            _label: "Vincular módem",
                                            onClick: ()=>{
                                                setState({
                                                    modalOpen: true,
                                                    modalType: "Modem",
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
                                              onGet({saveAs: "eventList", url: "event/car/" + listItem.id})
                                              setState({
                                                  modalType: "Events",
                                                  modalOpen: true,
                                                  modalSize: "lg",
                                                  elementSelected: listItem
                                              })
                                          }
                                      }
                                    ]}
                                />
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
          <h4 className="text-secondary my-5">{t("No cars found")}</h4>
        </center>}
      </React.Fragment>
    )
}

TableMobile.propTypes = {
    _crudName: PropTypes.object,
    onGet: PropTypes.func,
    listToShow: PropTypes.object,
    setSorterer: PropTypes.func,
    setState: PropTypes.func,
    sorterer: PropTypes.number,
    t: PropTypes.func
}

export default TableMobile