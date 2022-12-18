import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"
import { connect } from "react-redux"

import { Modal } from "reactstrap"

import Breadcrumbs from "../../components/Common/Breadcrumb"

import {
    getCar as petitionGet,
    postCar as petitionPost,
    putCar as petitionPut,
    deleteCar as petitionDelete,
    postAndGetCar as petitionPostAndGet,
    putAndGetCar as petitionPutAndGet,
    deleteAndGetCar as petitionDeleteAndGet,
} from "store/car/actions"
import TableIndex from "./table/tableIndex"
import EventsTableIndex from "./events/tableIndex"
import ModalIndex from "./Modal/modalIndex"
import { ErrorTable } from "components/tableElements"
import { SpinnerL } from "components/components"

const _crudName = {single: "car", multiple: "cars", cod: "car"}

const CarPage = ({
    localStore,
    onGet,
    onPost,
    onPut,
    onDelete,
    onPostAndGet,
    onPutAndGet,
    onDeleteAndGet,
    t
}) => {
    const [state, _zetState] = useState({
            tableMode: "cars",
            eventTableStatus: "loading",
            modalOpen: false,
            modalSize: "md",
            modalType: "Add",
            elementSelected: {},
            tableStatus: "loading"
    })

    const setState = (data) => {
        _zetState({...state, ...data})
    }

    useEffect(()=>{
        onGet({ saveAs: _crudName.cod + "List", url: "car" })
        onGet({ saveAs: "modemList", url: "modem" })
        onGet({ saveAs: "platformList", url: "platform" })
    }, [])

    useEffect(()=>{
        if (state.tableStatus == "loading" && localStore.status != "waiting response") {
            if (localStore.status == 200) setState({tableStatus: "success"})
            else setState({tableStatus: "error"})
        }
    }, [localStore.status])

    return(
        <React.Fragment>
            <div className="page-content mb-0 pb-0">
                <div className="container">
                    <Breadcrumbs title="Cuadros de mando" breadcrumbItem={t(_crudName.multiple)} />
                    {state.tableStatus == "loading" ? <SpinnerL /> : ""}
                    <div className="tab-content">
                        <div className={`tab-pane fade ${state.tableMode == "cars" ? "show active" : ""}`}>
                        {state.tableStatus == "success" ?
                        <TableIndex
                            _crudName={_crudName}
                            localStore={localStore}
                            onGet={onGet}
                            setState={setState}
                            t={t} /> : ""
                        }
                        {state.tableStatus == "error" ?
                            <ErrorTable
                                cod={localStore.status}
                                retryFunction={()=>{
                                    onGet({ saveAs: _crudName.cod + "List", url: "car" });
                                    setState({tableStatus: "loading"})
                                }}
                            >
                                {t("Retry")}
                            </ErrorTable> : ""
                        }
                        </div>
                        <div className={`tab-pane fade ${state.tableMode == "events" ? "show active" : ""}`}>
                            <EventsTableIndex
                            _crudName={_crudName}
                            localStore={localStore}
                            onGet={onGet}
                            setState={setState}
                            state={state}
                            t={t} />
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={state.modalOpen} size={state.modalSize}>
                <ModalIndex
                    _crudName={_crudName}
                    localStore={localStore}
                    onPost={onPost}
                    onPostAndGet={onPostAndGet}
                    onPutAndGet={onPutAndGet}
                    setState={setState}
                    state={state}
                    t={t}
                />
            </Modal>
        </React.Fragment>
    )
}

CarPage.propTypes = {
    localStore: PropTypes.object,
    onGet: PropTypes.func,
    onPost: PropTypes.func,
    onPut: PropTypes.func,
    onDelete: PropTypes.func,
    onPostAndGet: PropTypes.func,
    onPutAndGet: PropTypes.func,
    onDeleteAndGet: PropTypes.func,
    t: PropTypes.func
}

const mapStateToProps = state => ({
    localStore: state.Car
})

const mapDispatchToProps = dispatch => ({
    onGet: data => dispatch(petitionGet(data)),
    onPost: data => dispatch(petitionPost(data)),
    onPut: data => dispatch(petitionPut(data)),
    onDelete: data => dispatch(petitionDelete(data)),
    onPostAndGet: data => dispatch(petitionPostAndGet(data)),
    onPutAndGet: data => dispatch(petitionPutAndGet(data)),
    onDeleteAndGet: data => dispatch(petitionDeleteAndGet(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CarPage))