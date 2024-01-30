import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"

import TableInputs from "./tableInputs"
import Table from "./table"

import { SpinnerL } from "components/components"
import { tableFilter, tableSorter } from "components/tableFilter"
import { ErrorTable } from "components/tableElements"

const TableIndex = ({_crudName, localStore, onGet, setState, t}) => {
    const [filter, setFilter] = useState("")
    const [tableStatus, setTableStatus] = useState("loading")
    const [sorter, zetSorter] = useState(1)
    
    const [tableFiltered, setTableFiltered] = useState([])

    const setSorter = numero => {
        Math.abs(sorter) === numero ? zetSorter(sorter * -1) : zetSorter(numero)
    }

    useEffect(()=>{
        if (tableStatus == "loading" && localStore.status != "waiting response")
            if (localStore.status == 200) {setTableFiltered(localStore[_crudName.cod + "List"]); setTableStatus("success")}
            else setTableStatus("error")
    }, [localStore.status])

    const keysToSort = ["name", "detail"]
    useEffect(()=>{
        if (filter == "")
            setTableFiltered(localStore[_crudName.cod + "List"])
        else
        setTableFiltered(tableFilter(localStore[_crudName.cod + "List"], filter, keysToSort))
    }, [filter, localStore[_crudName.cod + "List"]])

    useEffect(()=>{
        let _keys = keysToSort[Math.abs(sorter) -1]
        let _multiplier = (sorter / Math.abs(sorter))
        setTableFiltered(tableSorter(tableFiltered, _keys, _multiplier))
    }, [sorter])

    return(
        <div className="card">
            <div className="card-body">
                <div className="card-title mb-4 h4">
                    {t("List of " + _crudName.multiple)}
                </div>
                <TableInputs
                    _crudName={_crudName}
                    filter={filter}
                    setFilter={setFilter}
                    setState={setState}
                    t={t}
                />
                {tableStatus == "loading" && <SpinnerL />}
                {tableStatus == "success" ?
                        (localStore[_crudName.cod + "List"].length == 0 ?
                            <center>
                                <h4 className="text-secondary my-5">{t("No " + _crudName.multiple)}</h4>
                            </center> :
                            <Table
                                _crudName={_crudName}
                                listToShow={tableFiltered}
                                onGet={onGet}
                                setSorter={setSorter}
                                setState={setState}
                                sorter={sorter}
                                t={t}
                            />
                        )
                    : ""
                }
                {tableStatus == "error" &&
                    <ErrorTable cod={localStore.status}>{t("Retry")}</ErrorTable>
                }
            </div>
        </div>
    )
}

TableIndex.propTypes = {
    _crudName: PropTypes.object,
    localStore: PropTypes.object,
    onGet: PropTypes.func,
    setState: PropTypes.func,
    t: PropTypes.func
}

export default TableIndex