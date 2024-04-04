import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"

import TableInputs from "./tableInputs"
import Table from "./table"

import { SpinnerL } from "components/components"
import { tableFilter, tableSorter } from "components/tableFilter"
import { ErrorTable } from "components/tableElements"
import TableMobile from "./tableMobile"

import { useMediaQuery } from "react-responsive"

const EventsTableIndex = ({_crudName, onGet, localStore, setState, state, t}) => {
    const [filter, setFilter] = useState("")
    const [sorter, zetSorter] = useState(1)
    
    const [tableFiltered, setTableFiltered] = useState([])

    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 760px)" });

    const setSorter = numero => {
        Math.abs(sorter) === numero ? zetSorter(sorter * -1) : zetSorter(numero)
    }

    useEffect(()=>{
        if (state.eventTableStatus == "loading" && localStore.status != "waiting response" && state.tableMode == "events") {
            if (localStore.status == 200) {setTableFiltered(localStore.eventList); setState({eventTableStatus: "success"})}
            else setState({eventTableStatus: "error"}) }
    }, [localStore.status])

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
    useEffect(()=>{
        if (filter == "")
            setTableFiltered(localStore.eventList)
        else
        setTableFiltered(tableFilter(localStore.eventList, filter, keysToSort))
    }, [filter, localStore.eventList])

    useEffect(()=>{
        let _keys = keysToSort[Math.abs(sorter) -1]
        let _multiplier = (sorter / Math.abs(sorter))
        setTableFiltered(tableSorter(tableFiltered, _keys, _multiplier))
    }, [sorter])

    return(
        <React.Fragment>
            <div className="card">
                <div className="card-body">
                    <div className="card-title mb-4 h4">
                        {t("Events of modem ") + state.elementSelected.code}
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
                {state.eventTableStatus == "loading" && <SpinnerL />}
                {state.eventTableStatus == "success" ?
                        (localStore.eventList.length == 0 ?
                            <div className="card">
                                <div className="card-body">
                                    <center>
                                        <h4 className="text-secondary my-5">{t("No events")}</h4>
                                    </center>
                                </div>
                            </div> :
                            <div className="container grayScroll" style={{maxHeight: "55vh", overflow: "auto"}}>
                                {/* {isTabletOrMobile ?
                                    <TableMobile
                                        _crudName={_crudName}
                                        listToShow={tableFiltered}
                                        onGet={onGet}
                                        setState={setState}
                                        t={t}
                                    />
                                    : */}
                                    <Table
                                        _crudName={_crudName}
                                        listToShow={tableFiltered}
                                        onGet={onGet}
                                        setSorter={setSorter}
                                        setState={setState}
                                        sorter={sorter}
                                        t={t}
                                    />
                                {/* } */}
                            </div>
                        )
                    : ""
                }
                {state.eventTableStatus == "error" &&
                    <ErrorTable
                        cod={localStore.status}
                        retryFunction={()=>{
                            onGet({ saveAs: "eventList", url: "event/modem/" + state.elementSelected.id })
                            setState({eventTableStatus: "loading"})
                        }}
                    >
                        {t("Retry")}
                    </ErrorTable>
                }
        </React.Fragment>
    )
}

EventsTableIndex.propTypes = {
    _crudName: PropTypes.object,
    onGet: PropTypes.func,
    localStore: PropTypes.object,
    state: PropTypes.object,
    setState: PropTypes.func,
    t: PropTypes.func
}

export default EventsTableIndex