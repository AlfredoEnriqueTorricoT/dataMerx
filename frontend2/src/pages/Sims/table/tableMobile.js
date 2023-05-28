import React from 'react'
import PropTypes from 'prop-types'
import { OptionsButton, MobileDataShow } from 'components/tableElements'

const TableMobile = ({_crudName, onGet, listToShow, setState, t}) => {

    return(
      <React.Fragment>
        {listToShow.length ?
        listToShow.map((listItem, idx)=>(
                <div className="row" key={_crudName.cod + "Item-" + idx}>
                  <div className="col-10">
                    <MobileDataShow
                      title={t("Number")}
                      desc={listItem.number}
                    />
                    <MobileDataShow
                      title={t("Code")}
                      desc={listItem.code}
                    />
                    <MobileDataShow
                      title={"Imei"}
                      desc={listItem.imei}
                    />
                  </div>
                  <div className="col-2 mt-3">
                  <OptionsButton
                                    buttonsList={[
                                      {_label: "Ver detalles",
                                      onClick: ()=>{
                                        onGet({saveAs: "simDetails", url: "sim/details/" + listItem.id})
                                        setState({
                                            modalOpen: true,
                                            modalType: "Details"
                                        })
                                      }},
                                      {_label: "Editar sim",
                                      onClick: ()=>{
                                        setState({
                                            modalOpen: true,
                                            modalType: "Edit",
                                            modalSize: "md",
                                            elementSelected: listItem
                                        })
                                      }},
                                      {_label: "Ver eventos",
                                      onClick: ()=>{
                                        onGet({saveAs: "eventList", url: "event/sim/" + listItem.id})
                                        setState({
                                          modalOpen: true,
                                          modalType: "Events",
                                          modalSize: "lg",
                                          elementSelected: listItem
                                        })
                                      }},
                                      {_label: "Añadir evento",
                                      onClick: ()=>{
                                        setState({
                                          modalOpen: true,
                                          modalSize: "md",
                                          modalType: "Add event to",
                                          elementSelected: listItem
                                        })
                                      }},
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
          <h4 className="text-secondary my-5">{t("No " + _crudName.multple + " found")}</h4>
        </center>
        }
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