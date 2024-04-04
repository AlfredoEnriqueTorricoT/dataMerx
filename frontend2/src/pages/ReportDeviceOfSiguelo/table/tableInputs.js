import React from "react"
import PropTypes from "prop-types"

import { SearchBar } from "components/tableElements"

const TableInputs = ({_crudName, filter, onPost, setFilter, setState, setTableStatus, status, t}) => {

  const searchFunction = () => {
    onPost({
      url: "siguelo/getByImei",
      payload: {imei: filter},
      saveAs: "reportDeviceSigueloList"
    })
    setTableStatus(2)
  }

    return(
        <div className="d-sm-flex flex-wrap mb-3">
          <div className="d-inline-block">
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                min={0}
                onChange={i => setFilter(i.target.value)}
                placeholder="Buscar por imei..."
                value={filter}
              />
              <div className="input-group-append">
                <button
                  className="btn dm-button text-light"
                  disabled={status == "waiting response" || filter == ""}
                  onClick={searchFunction}
                >
                  {status == "waiting response" && filter != "" ?
                  <i className="bx bx-loader bx-spin"></i> :
                  <i className="fas fa-search"></i>}
                </button>
              </div>
            </div>
          </div>
        
            <div className="ms-auto">
                <button
                  className="btn btn-sm dm-button text-light btn-label waves-effect waves-light"
                  onClick={()=>{
                    setState({modalOpen: true, modalType: "Add"})
                  }}
                >
                    <i className="fas fa-plus label-icon"></i>
                  {t("Add")}
                </button>
            </div>
        </div>)
}

TableInputs.propTypes = {
    filter: PropTypes.func,
    setFilter: PropTypes.func,
    onPost: PropTypes.func,
    _crudName: PropTypes.object,
    setState: PropTypes.func,
    setTableStatus: PropTypes.func,
    status: PropTypes.any,
    t: PropTypes.func
}

export default TableInputs