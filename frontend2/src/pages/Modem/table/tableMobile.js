import React from 'react'
import PropTypes from 'prop-types'

const TableMobile = ({_crudName, listToShow, setState, t}) => {
    return(
      <React.Fragment>
        {listToShow.map((listItem, idx)=>(
            <div className="card" key={_crudName.cod + "Item-" + idx}>
              <div className="card-body">
                <div className="row">
                  <div className="col-10">
                    <div className="row">
                      <div className="col-4">
                        <b>{t("Code")}</b><br />
                        <b>{"Imei"}</b><br />
                        <b>{t("State")}</b><br />
                        <b>{"Platform"}</b><br />
                        <b>{"Modem brand"}</b><br />
                      </div>
                      <div className="col-8">
                        {listItem.code}<br />
                        {listItem.imei}<br />
                          <span
                              className={`badge font-size-11 rounded-pill badge-soft-${
                                listItem.active[0] == "a" ? "primary" : "dark"
                              } text-uppercase`}
                            >
                              {listItem.active}
                          </span>  
                        <br />
                        {listItem.platform_name}<br />
                        {listItem.mBrand_name}<br />
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <center>
                    <button
                        className='btn btn-sm btn-primary mb-3'
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
                    <button 
                        className='btn btn-sm btn-secondary'
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
                    </center>
                  </div>
                </div>
              </div>
            </div>
        ))}
      </React.Fragment>
    )
}

TableMobile.propTypes = {
    _crudName: PropTypes.object,
    listToShow: PropTypes.array,
    setSorterer: PropTypes.func,
    setState: PropTypes.func,
    sorterer: PropTypes.number,
    t: PropTypes.func
}

export default TableMobile