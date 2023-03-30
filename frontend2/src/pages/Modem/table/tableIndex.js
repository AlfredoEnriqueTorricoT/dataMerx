import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"

import TableInputs from "./tableInputs"
import Table from "./table"
import TableMobile from "./tableMobile"

import { useMediaQuery } from "react-responsive"

import { tableFilter, tableSorter } from "components/tableFilter"
import { SpinnerL } from "components/components"

const keysToSort = ["code", "imei", "active", "mBrand_name"]

const TableIndex = ({_crudName, onGet, localStore, setState, t}) => {
    const [mList, setMList] = useState([])
    const [sorter, zetSorter] = useState(1)
    const [tableStatus, setTableStatus] = useState(0) //0 init, 1 loading, 2 success, 3 error
    
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
                mark_id: modem.mark_id,
                sim_id: modem.sim_id,
            }))
            
        if (localStore.modemList.length)
            setMList(newList)

        setTableFiltered(newList)
        // XPSSDMQNA(!PSSDMQNA)
    }, [localStore.modemList])

    useEffect(()=>{
       if (tableStatus == 1 && localStore.status != "waiting response") {
        if (localStore.status == 200) setTableStatus(2)
        else setTableStatus(3)
       }
    }, [localStore.status])

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
                    onGet={onGet}
                    setState={setState}
                    setTableStatus={setTableStatus}
                    status={localStore.status}
                    t={t}
                />
                {
                tableStatus == 0 ?
                <center>
                    <h4 className="text-secondary my-5">
                        Ingrese el imei del módem
                    </h4>
                </center> :
                tableStatus == 1 ?
                <SpinnerL /> :
                tableStatus == 3 ?
                <center>
                    <h4 className="text-secondary my-5">
                        Error
                    </h4>
                </center> :
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
                        onGet={onGet}
                        listToShow={tableFiltered}
                        setState={setState}
                        t={t}
                    />
                    :
                    <Table
                        _crudName={_crudName}
                        onGet={onGet}
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
    onGet: PropTypes.func,
    localStore: PropTypes.object,
    setState: PropTypes.func,
    t: PropTypes.func
}

export default TableIndex