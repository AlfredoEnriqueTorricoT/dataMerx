import React, {useState} from "react"
import PropTypes from "prop-types"

const TableInputs = ({onGet, setState, setTableStatus, status, t}) => {
  const [ci, setCi] = useState("")

  const searchFunction = () => {
    onGet({saveAs: "clientList", url: "client/" + ci})
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
                onChange={i => setCi(i.target.value)}
                placeholder="Buscar por ci..."
                value={ci}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  disabled={status == "waiting response" || ci == ""}
                  onClick={searchFunction}
                >
                  {status == "waiting response" && ci != "" ?
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
                  Añadir
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