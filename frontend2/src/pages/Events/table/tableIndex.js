import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"

import TableInputs from "./tableInputs"
import Table from "./table"
import TableMobile from "./tableMobile"

import { useMediaQuery } from "react-responsive"

import { tableFilter, tableSorter } from "components/tableFilter"

const keysToSort = [
    "title",
    "detail",
    "type_id",
    "car_id",
    "modem_id",
    "sim_id",
    "platform_id",
    "user_id",
    "created_at"
]

const TableIndex = ({_crudName, localStore, setState, t}) => {
    const [filter, setFilter] = useState("")
    // const [sorter, zetSorter] = useState(1)
    
    const [tableFiltered, setTableFiltered] = useState(localStore[_crudName.cod + "List"])

    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 760px)" });

    // const setSorter = numero => {
    //     Math.abs(sorter) === numero ? zetSorter(sorter * -1) : zetSorter(numero)
    // }

    useEffect(()=>{
        if (filter == "")
            setTableFiltered(localStore[_crudName.cod + "List"])
        else
        setTableFiltered(tableFilter(localStore[_crudName.cod + "List"], filter, keysToSort))
    }, [filter, localStore[_crudName.cod + "List"]])

    // useEffect(()=>{
    //     let _keys = keysToSort[Math.abs(sorter) -1]
    //     let _multiplier = (sorter / Math.abs(sorter))
    //     setTableFiltered(tableSorter(tableFiltered, _keys, _multiplier))
    // }, [sorter])

    return(
        <React.Fragment>
            <div className="card">
                <div className="card-body">
                    <div className="card-title mb-4 h4">
                        {t("List of") + " " + t(_crudName.multiple)}
                    </div>
                    <TableInputs
                        _crudName={_crudName}
                        filter={filter}
                        setFilter={setFilter}
                        setState={setState}
                        t={t}
                    />
                </div>
            </div>
                    {/* {
                    isTabletOrMobile ?
                        <TableMobile
                            _crudName={_crudName}
                            listToShow={tableFiltered}
                            setState={setState}
                            t={t}
                        />
                        : */}
                        <div className="container grayScroll" style={{maxHeight: "55vh", overflow: "auto"}}>
                            <Table
                                _crudName={_crudName}
                                listToShow={tableFiltered}
                                // setSorter={setSorter}
                                setState={setState}
                                // sorter={sorter}
                                t={t}
                            />
                        </div>
                    {/* } */}
                
        </React.Fragment>
    )
}

TableIndex.propTypes = {
    _crudName: PropTypes.object,
    localStore: PropTypes.object,
    setState: PropTypes.func,
    t: PropTypes.func
}

export default TableIndex