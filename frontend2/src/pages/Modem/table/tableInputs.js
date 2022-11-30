import React from "react"
import PropTypes from "prop-types"

import { SearchBar } from "components/tableElements"

const TableInputs = ({filter, listLength, setFilter, setState, t}) => {
    return(
        <div className="d-flex flex-wrap mb-3">
          {listLength > 0 ?
          <SearchBar _onChange={setFilter} _value={filter} />
          : ""}
        
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
    filter: PropTypes.func,
    listLength: PropTypes.number,
    setFilter: PropTypes.func,
    setState: PropTypes.func,
    t: PropTypes.func
}

export default TableInputs