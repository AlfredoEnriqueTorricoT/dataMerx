import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"

import TableInputs from "./tableInputs"
import Table from "./table"
import TableMobile from "./tableMobile"

import { useMediaQuery } from "react-responsive"

import { tableSorter } from "components/tableFilter"
import { SpinnerL } from "components/components"

const keysToSort = ["fullName", "ci"]

const TableIndex = ({_crudName, localStore, onGet, setState, t}) => {
    const [cList, setCList] = useState([])
    const [filter, setFilter] = useState("")
    const [sorter, zetSorter] = useState(1)
    const [tableStatus, setTableStatus] = useState("init")
    
    const [tableFiltered, setTableFiltered] = useState([])

    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 760px)" });

    const setSorter = numero => {
        Math.abs(sorter) === numero ? zetSorter(sorter * -1) : zetSorter(numero)
    }

    useEffect(()=>{
        const newList = 
            localStore.clientList.map(client => ({
                id: client.id,
                ci: client.ci,
                name: client.name,
                last_name: client.last_name,
                last_mother_name: client.last_mother_name,
                cars: client.cars,
                fullName:
                    client.name + " " + (client.last_name || "") + " " + (client.last_mother_name || "")
            }))
            
        if (localStore.clientList.length)
            setCList(newList)

        setTableFiltered(newList)
    }, [localStore.clientList])

    useEffect(()=>{
        if (tableStatus == "loading" && localStore.status != "waiting response") {
            if (localStore.status == 200) setTableStatus("success")
            else setTableStatus("error")
        }
    }, [localStore.status])

    useEffect(()=>{
        if (cList.length) {
            let _keys = keysToSort[Math.abs(sorter) -1]
            let _multiplier = (sorter / Math.abs(sorter))
            setTableFiltered(tableSorter(tableFiltered, _keys, _multiplier))
        }
    }, [sorter])

    return(
        <div className="card">
            <div className="card-body">
                <div className="card-title mb-4 h4">
                    {t("List of") + " " + t(_crudName.multiple)}
                </div>
                <TableInputs
                    onGet={onGet}
                    setState={setState}
                    setTableStatus={setTableStatus}
                    status={localStore.status}
                    t={t}
                />
                {
                tableStatus == "init" ?
                <center>
                    <h4 className="text-secondary my-5">
                        Ingrese el ci del cliente
                    </h4>
                </center>:
                tableStatus == "loading" ?
                <SpinnerL /> :
                localStore[_crudName.cod + "List"].length == 0 ?
                    <center>
                        <h4 className="text-secondary my-5">
                            No hay clientes que coincidan con su busqueda
                        </h4>
                    </center>
                :
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
                        onGet={onGet}
                        setSorter={setSorter}
                        setState={setState}
                        sorter={sorter}
                        t={t}
                    />
                }
            </div>
        </div>
    )
}

TableIndex.propTypes = {
    _crudName: PropTypes.object,
    localStore: PropTypes.object,
    onGet: PropTypes.func,
    status: PropTypes.any,
    setState: PropTypes.func,
    t: PropTypes.func
}

export default TableIndex