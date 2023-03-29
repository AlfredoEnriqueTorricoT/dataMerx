import React, {useState} from "react"
import PropTypes from "prop-types"

const TableInputs = ({onGet, setState, setTableStatus, status, t}) => {
  const [imei, setImei] = useState("")

  const searchFunction = () => {
    onGet({saveAs: "simList", url: "sim/"+imei})
    setTableStatus("loading")
  }

    return(
        <div className="d-flex flex-wrap mb-3">
          <div className="d-inline-block">
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                min={0}
                onChange={i => setImei(i.target.value)}
                placeholder="Buscar por imei..."
                value={imei}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  disabled={status == "waiting response" || imei == ""}
                  onClick={searchFunction}
                >
                  {status == "waiting response" && imei != "" ?
                  <i className="bx bx-loader bx-spin"></i> :
                  <i className="fas fa-search"></i>}
                </button>
              </div>
            </div>
          </div>
        
            <div className="ms-auto">
                <button
                  className="btn btn-sm btn-success btn-label waves-effect waves-light"
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
    onGet: PropTypes.func,
    setState: PropTypes.func,
    setTableStatus: PropTypes.func,
    status: PropTypes.any,
    t: PropTypes.func
}

export default TableInputs