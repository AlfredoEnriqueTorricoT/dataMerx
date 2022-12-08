import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"

import TableInputs from "./tableInputs"
import Table from "./table"
import TableMobile from "./tableMobile"

import { useMediaQuery } from "react-responsive"

import { tableFilter, tableSorter } from "components/tableFilter"

const keysToSort = ["code", "imei", "active", "mBrand_name"]

const TableIndex = ({_crudName, localStore, setState, t}) => {
    const [filter, setFilter] = useState("")
    const [mList, setMList] = useState([])
    const [sorter, zetSorter] = useState(1)
    
    const [tableFiltered, setTableFiltered] = useState([])

    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 760px)" });

    const setSorter = numero => {
        Math.abs(sorter) === numero ? zetSorter(sorter * -1) : zetSorter(numero)
    }

    useEffect(()=>{
        const newList = 
            localStore.modemList.map(modem => ({
                id: modem.id,
                code: modem.code,
                imei: modem.imei,
                active: modem.active ? t("active") : t("inactive"),
                mark_id: modem.modems_mark.id,
                mBrand_name: modem.modems_mark.name,
                sim_id: modem.sim ? modem.sim.id : ""
            }))
            
        if (localStore.modemList.length)
            setMList(newList)

        if (filter == "")
            setTableFiltered(newList)
        else
            setTableFiltered(tableFilter(newList, filter, keysToSort))
        // XPSSDMQNA(!PSSDMQNA)
    }, [localStore.modemList])

    useEffect(()=>{
        if (mList.length) {
            if (filter == "")
                setTableFiltered(mList)
            else
            setTableFiltered(tableFilter(mList, filter, keysToSort))
        }
    }, [filter])

    useEffect(()=>{
        if (mList.length) {
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
                    _crudName={_crudName}
                    filter={filter}
                    listLength={mList.length}
                    setFilter={setFilter}
                    setState={setState}
                    t={t}
                />
                {
                mList.length == 0 ?
                    <center>
                        <h4 className="text-secondary my-5">
                            {t("No ") + " " + t(_crudName.multiple)}
                        </h4>
                    </center>
                :
                isTabletOrMobile ?
                    <TableMobile
                        _crudName={_crudName}
                        listToShow={tableFiltered}
                        setState={setState}
                        t={t}
                    />
                    :
                    <Table
                        _crudName={_crudName}
                        listToShow={tableFiltered}
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
    setState: PropTypes.func,
    t: PropTypes.func
}

export default TableIndex