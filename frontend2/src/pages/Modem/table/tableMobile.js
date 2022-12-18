import React from 'react'
import PropTypes from 'prop-types'
import { MobileDataShow } from 'components/tableElements'

const TableMobile = ({_crudName, onGet, listToShow, setState, t}) => {
    return(
      <React.Fragment>
        {listToShow.length ?
        listToShow.map((listItem, idx)=>(
                <div className="row" key={_crudName.cod + "Item-" + idx}>
                  <div className="col-10">
                    <div className="row">
                      <MobileDataShow
                        title={t("Code")}
                        desc={listItem.code}
                      />
                      <MobileDataShow
                        title={"Imei"}
                        desc={listItem.imei}
                      />
                      <MobileDataShow
                        title={t("State")}
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
                        title={t("Modem brand")}
                        desc={listItem.mBrand_name || "- - -"}
                      />
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
                        >
                        <i className="fas fa-sim-card"></i>
                    </button>
                    <br />
                    <button
                      onClick={()=>{
                          onGet({saveAs: "eventList", url: "event/modem/" + listItem.id})
                          setState({
                              tableMode: "events",
                              elementSelected: listItem
                          })
                      }}
                          className="btn btn-sm btn-info mb-1"
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