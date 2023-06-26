import React from 'react'
import PropTypes from 'prop-types'
import { DropdownButton, MobileDataShow } from 'components/tableElements'

const TableMobile = ({_crudName, onGet, listToShow, setState, t}) => {

  const detailsButton = (data) => {
    onGet({saveAs: "simDetails", url: "sim/details/" + data.id})
    setState({
        modalOpen: true,
        modalType: "Details"
    })
  }

  const eventsButton = (data) => {
    onGet({saveAs: "eventList", url: "event/sim/" + data.id})
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
                    <MobileDataShow
                      title={t("Number")}
                      desc={listItem.number}
                    />
                    <MobileDataShow
                      title={"Imei"}
                      desc={listItem.imei}
                    />
                  </div>
                  <div className="col-4 mt-3">
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
                                        {title: "Editar sim",
                                        onClick: ()=>setState({
                                          modalOpen: true,
                                          modalType: "Edit",
                                          modalSize: "md",
                                          elementSelected: listItem
                                        })},
                                        {title: (listItem.active ? "Desactivar" : "Activar") + " sim",
                                        onClick: ()=>setState({
                                          modalOpen: true,
                                          modalType: "ChangeStatus",
                                          modalSize: "md",
                                          elementSelected: listItem
                                        })},
                                        {title: "Añadir evento",
                                        onClick: ()=>setState({
                                          modalOpen: true,
                                          modalSize: "md",
                                          modalType: "Add event to",
                                          elementSelected: listItem
                                        })},
                                        {title: "Añadir imágenes",
                                        onClick: ()=>setState({
                                          modalOpen: true,
                                          modalSize: "md",
                                          modalType: "Add images",
                                          elementSelected: listItem
                                        })},
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
    listToShow: PropTypes.object,
    setSorterer: PropTypes.func,
    setState: PropTypes.func,
    sorterer: PropTypes.number,
    t: PropTypes.func
}

export default TableMobile