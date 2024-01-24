import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"

import TableInputs from "./tableInputs"
import Table from "./table"
import TableMobile from "./tableMobile"

import { useMediaQuery } from "react-responsive"

import { tableFilter, tableSorter } from "components/tableFilter"
import { SpinnerL } from "components/components"

const keysToSort = ["code", "imei", "active", "mBrand_name"]

const TableIndex = ({_crudName, onGet, onPost, localStore, setState, state, t}) => {
    const [mList, setMList] = useState([])
    const [sorter, zetSorter] = useState(1)
    const [tableStatus, setTableStatus] = useState(1) //0 init, 1 loading, 2 success, 3 error
    
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
                active: modem.active ? "activo" : "inactivo",
                platform_id: modem.platform ? modem.platform.id : null,
                platform_name: modem.platform ? modem.platform.name : null,
                mark_modem_name: modem.modems_mark ? modem.modems_mark.name : null,
                mark_id: modem.modems_mark ? modem.modems_mark.id : null,
                is_pending: modem.is_pending,
                user_successor_id: modem.user_successor_id,
                sim_number: modem.sim ? modem.sim.number : null,
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
                    onPost={onPost}
                    setState={setState}
                    state={state}
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
    onPost: PropTypes.func,
    localStore: PropTypes.object,
    setState: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func
}

export default TableIndex