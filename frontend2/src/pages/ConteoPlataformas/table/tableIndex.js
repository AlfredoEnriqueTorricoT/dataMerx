import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"

import TableInputs from "./tableInputs"
import Table from "./table"
import TableMobile from "./tableMobile"
import { SpinnerL } from "components/components"

import { useMediaQuery } from "react-responsive"

import { tableFilter, tableSorter } from "components/tableFilter"

const keysToSort = ["platform", "name", "date"]

const TableIndex = ({_crudName, localStore, setListModal, state, onGet, onPost, setState, t, localStoreModalList}) => {
    const [filter, setFilter] = useState("")
    const [sorter, zetSorter] = useState(1)
    
    const [tableFiltered, setTableFiltered] = useState(localStore[_crudName.cod + "List"]);
    

    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 760px)" });

    const [tableStatus, setTableStatus] = useState(-1) //-1 init, 0 error, 1 success, 2 loading
    // ########################
    useEffect(()=>{
      if (tableStatus == 2 && localStore.status != "waiting response") {
        if (localStore.status == 200) {
          setTableFiltered(localStore.reportDeviceSigueloList)
          setTableStatus(1)
        }
        else setTableStatus(0)
      }
    }, [localStore.status])
  
    const retryFunc = () => {
      onPost({
        url: "siguelo/getByImei",
        payload: {imei: filter},
        saveAs: "reportDeviceSigueloList"
      })
      setTableStatus(2)
    }
    // ########################

    const setSorter = numero => {
        Math.abs(sorter) === numero ? zetSorter(sorter * -1) : zetSorter(numero)
    }


    useEffect(()=>{
        let _keys = keysToSort[Math.abs(sorter) -1]
        let _multiplier = (sorter / Math.abs(sorter))
        setTableFiltered(tableSorter(tableFiltered, _keys, _multiplier))
    }, [sorter])

    const DisplayTable = () => {
        switch (tableStatus) {
            case -1:
              return(
                <center className="my-5 py-5">
                    <h4 className="text-secondary">Ingrese el imei</h4>
                </center>
              )
        
            case 0:
              return(
                <center className="my-4 py-4">
                  <h4 className="text-secondary">Error ({localStore.status})</h4>
                  <button onClick={retryFunc} className="btn dm-button">Reintentar</button>
                </center>
              )
           
            case 1:
                return(
                    isTabletOrMobile ?
                        <TableMobile
                            _crudName={_crudName}
                            listToShow={tableFiltered}
                            onGet={onGet}
                            setState={setState}
                            t={t}
                        />
                        :
                        <Table
                            _crudName={_crudName}
                            listToShow={tableFiltered}
                            localStore={localStore}
                            setListModal={setListModal}
                            localStoreModalList= {localStoreModalList}
                            filter={filter}
                            onGet={onGet}
                            onPost={onPost}
                            setSorter={setSorter}
                            setState={setState}
                            sorter={sorter}
                            t={t}
                        />
                )

            
    case 2:
        return(
          <center className="my-5 py-5">
            <SpinnerL />
          </center>
        )
          
      default:
        break;
    }
    }

    return(
        <div className="card">
            <div className="card-body">
              {/* <button onClick={()=>{console.log(localStore);}}>
                log
              </button>
              <button onClick={()=>{console.log(localStore[_crudName.cod + "List"]);}}>
                log
              </button>
              <button onClick={()=>{console.log(tableFiltered);}}>
                log
              </button> */}
              
            <TableInputs
                    _crudName={_crudName}
                    filter={filter}
                    onPost={onPost}
                    setFilter={setFilter}
                    setTableStatus={setTableStatus}
                    setState={setState}
                    status={localStore.status}
                    t={t}
                />
            <DisplayTable />
            </div>
        </div>
    )
}

TableIndex.propTypes = {
    _crudName: PropTypes.object,
    onGet: PropTypes.func,
    onPost: PropTypes.func,
    localStore: PropTypes.object,
    state: PropTypes.object,
    setState: PropTypes.func,
    t: PropTypes.func
}

export default TableIndex