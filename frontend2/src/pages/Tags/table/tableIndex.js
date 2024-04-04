import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"

import TableInputs from "./tableInputs"
import Table from "./table"
import TableMobile from "./tableMobile"

import { useMediaQuery } from "react-responsive"

import { tableFilter, tableSorter } from "components/tableFilter"
import { SpinnerL } from "components/components"

const keysToSort = ["name", "imei", "active", "mBrand_name"]

const TableIndex = ({_crudName, onGet, localStore, setState, t}) => {
    const [mList, setMList] = useState([]);
    const [mListUser, setMListUser] = useState([]);
    const [sorter, zetSorter] = useState(1)
    const [tableStatus, setTableStatus] = useState(0) //0 init, 1 loading, 2 success, 3 error
    
    const [tableFiltered, setTableFiltered] = useState([])

    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 760px)" });

    const setSorter = numero => {
        Math.abs(sorter) === numero ? zetSorter(sorter * -1) : zetSorter(numero)
    }


    useEffect(()=>{
        
        setMList(localStore?.tagList?.tags);
        setMListUser(localStore?.tagList?.users);
        setTableStatus(2);
    }, [localStore?.tagList?.tags?.length])

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
                        Ingrese el imei del reloj
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
                mList?.length == 0 ?
                    <center>
                        <h4 className="text-secondary my-5">
                            {t("No ") + " " + t(_crudName.multiple)}
                        </h4>
                    </center>
                :/*
                isTabletOrMobile ?
                    <TableMobile
                        _crudName={_crudName}
                        onGet={onGet}
                        listToShow={mList}
                        setState={setState}
                        t={t}
                    />
                    :
                    <Table
                        _crudName={_crudName}
                        onGet={onGet}
                        listToShow={mList}
                        setSorter={setSorter}
                        setState={setState}
                        sorter={sorter}
                        t={t}
                    />*/
                    <Table
                        _crudName={_crudName}
                        onGet={onGet}
                        listToShow={mList}
                        listUser={mListUser}
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