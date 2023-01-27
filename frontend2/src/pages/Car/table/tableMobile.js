import React from 'react'
import PropTypes from 'prop-types'

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
                        <b>{t("Name")}</b><br />
                        <b>{t("Model")}</b><br />
                        <b>{t("Mark")}</b><br />
                        <b>{t("License plate")}</b><br />
                        <b>{t("Platform")}</b><br />
                        <b>{t("Modem")}</b><br />
                      </div>
                      <div className="col-8">
                        {listItem.name}<br />
                        {listItem.model}<br />
                        {listItem.mark}<br />
                        {listItem.placa}<br />
                        {listItem.platform_name || "- - -"}<br />
                        {listItem.modem_code || "- - -"}<br />
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <center>
                      <button
                          className='btn btn-sm btn-primary'
                          onClick={()=>{
                              setState({
                                  modalOpen: true,
                                  modalType: "Edit",
                                  elementSelected: listItem
                              })
                          }}
                          title='Editar vehículo'
                          >
                          <i className="fas fa-edit"></i>
                      </button>
                      <button
                          className='btn btn-sm btn-secondary mt-1'
                          onClick={()=>{
                              setState({
                                  modalOpen: true,
                                  modalType: "Modem",
                                  elementSelected: listItem
                              })
                          }}
                          title='Módem del vehículo'
                          >
                          <i className="fas fa-digital-tachograph"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-info my-1"
                        onClick={()=>{
                            onGet({saveAs: "eventList", url: "event/car/" + listItem.id})
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
                    </center>
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