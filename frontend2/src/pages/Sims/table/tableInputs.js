import React from "react"
import PropTypes from "prop-types"

import { SearchBar } from "components/tableElements"

const TableInputs = ({_crudName, filter, setFilter, setState, t}) => {
    return(
        <div className="d-flex flex-wrap mb-3">
          <SearchBar _onChange={setFilter} _value={filter} />
        
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
    filter: PropTypes.string,
    setFilter: PropTypes.func,
    _crudName: PropTypes.object,
    setState: PropTypes.func,
    t: PropTypes.func
}

export default TableInputs