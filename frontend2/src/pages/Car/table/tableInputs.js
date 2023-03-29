import React, {useState} from "react"
import PropTypes from "prop-types"

const TableInputs = ({onGet, setState, setTableStatus, status, t}) => {
  const [placa, setPlaca] = useState("")

  const searchFunction = () => {
    onGet({saveAs: "carList", url: "car/" + placa})
    setTableStatus("loading")
  }
 
    return(
        <div className="d-flex flex-wrap mb-3">
          <div className="d-inline-block">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                min={0}
                onChange={i => setPlaca(i.target.value)}
                placeholder="Buscar por placa..."
                value={placa}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  disabled={status == "waiting response" || placa == ""}
                  onClick={searchFunction}
                >
                  {status == "waiting response" && placa != "" ?
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