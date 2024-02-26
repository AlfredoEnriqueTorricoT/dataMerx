import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"

const TableInputs = ({isTabletOrMobile, onGet, onPost, setState, setTableStatus, state, status, t}) => {
  const [imei, setImei] = useState("")

  const addUser = () => setState({modalOpen: true, modalType: "Add"})
  const openFilter = () => setState({modalOpen: true, modalType: "Filter"})
  
  useEffect(()=>{
    setImei(imei)
    console.log(state.lastSearch);
  }, [isTabletOrMobile])

  const searchMyModems = () => {
    setTableStatus(1)
    onGet({
      saveAs: "modemList",
      url: "modem"
    })
    setState({lastSearch: "my"})
  }

  const searchFunction = () => {
    setTableStatus(1)
    setState({imeiToSearch: imei, lastSearch: "imei"})

    if (state.filters.length) {
      let payload = {user_responsability_id: 0, platform_id: 0};
      state.filters.forEach(element => {
        element.type == "user" ?
          payload.user_responsability_id = element.id :
          payload.platform_id = element.id
      })

      onPost({
        saveAs: "modemList",
        payload: payload,
        url: "modem/filter"
      })
    }
    else {
      onGet({
        saveAs: "modemList",
        url: "modem/" + imei
      })
    }
  }

  const checkActive = name => 
    state.lastSearch == name ? " text-light" : "-outline"

  const checkActiveFilter = () => 
    (state.lastSearch == "filter" || (isTabletOrMobile && state.lastSearch == "my")) ? " text-light" : "-outline"

  const removeFilter = filt => {
    let newFilters = [...state.filters]
    newFilters = newFilters.filter(filtro => filtro != filt)
    setState({filters: newFilters})
  }

    return(
        <div className="d-flex col mb-3" style={{maxHeight: "35px"}}>
          {isTabletOrMobile ? "" :
          <button
            className={`btn dm-button${checkActive("my")}`}
            style={{minWidth: "110px"}}
            onClick={searchMyModems}
          >
            {t("My modems")}
          </button>
          }

          {/* <span className="badge badge-info">
                  CHESSE
                </span> */}

          <div className="input-group row-4 mx-2">
            <div class="form-control d-flex lilGrayScroll" style={{maxWidth: "300px", maxHeight: "35px", overflowY: "none", overflowX: "none"}}>
              {
                state.filters.length?
                state.filters.map((filt, idx) => (
                  <span
                    className="badge text-light dm-button me-1"
                    onClick={()=>removeFilter(filt)}
                    style={{cursor: "pointer"}}
                  >
                    {filt.name + "   "} <i class="fas fa-times"></i>
                  </span>
                ))
                :
                <input
                  type="number"
                  className="invisible-input"
                  min={0}
                  onChange={i => setImei(i.target.value)}
                  placeholder={state.filters.length ? "" : "Buscar por imei..."}
                  // style={{maxWidth: "200px", maxHeight: "35px"}}
                  value={imei}
                />
              }
            </div>
            <div className="input-group-append">
              <button
                className={`btn dm-button${checkActive("imei")}`}
                disabled={status == "waiting response" || (imei == "" && state.filters.length == 0)}
                title="Buscar por imei"
                onClick={searchFunction}
              >
                <i className="fas fa-search"></i>
              </button>
              <button
                className={`btn dm-button${checkActiveFilter()}`}
                disabled={status == "waiting response"}
                title="Filtros"
                onClick={openFilter}
              >
                <i className="fas fa-filter"></i>
              </button>
            </div>
          </div>
          
          <button className={`btn row-2 ${isTabletOrMobile ? "" : "btn-label"} dm-button text-light`} onClick={addUser}>
            {isTabletOrMobile ? "" : t("Add")}
            <i class="fas fa-plus label-icon"></i>
          </button>
        </div>
  )
}

TableInputs.propTypes = {
    isTabletOrMobile: PropTypes.bool,
    onGet: PropTypes.func,
    onPost: PropTypes.func,
    setState: PropTypes.func,
    setTableStatus: PropTypes.func,
    state: PropTypes.object,
    status: PropTypes.any,
    t: PropTypes.func
}

export default TableInputs