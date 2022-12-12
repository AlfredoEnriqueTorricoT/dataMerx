import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"
import { connect } from "react-redux"

import { Modal } from "reactstrap"

import Breadcrumbs from "../../components/Common/Breadcrumb"

import {
    getEvent as petitionGet,
    postEvent as petitionPost,
    putEvent as petitionPut,
    deleteEvent as petitionDelete,
    postAndGetEvent as petitionPostAndGet,
    putAndGetEvent as petitionPutAndGet,
    deleteAndGetEvent as petitionDeleteAndGet,
} from "store/event/actions"
import TableIndex from "./table/tableIndex"
import ModalIndex from "./Modal/modalIndex"
import { ErrorTable } from "components/tableElements"
import { SpinnerL } from "components/components"

const _crudName = {single: "event", multiple: "events", cod: "event"}

const EventPage = ({
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
        onGet({ saveAs: _crudName.cod + "List", url: "event" })
        onGet({ saveAs: "simList", url: "sim" })
        onGet({ saveAs: "modemList", url: "modem" })
        onGet({ saveAs: "carList", url: "car" })
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
                                onGet({ saveAs: _crudName.cod + "List", url: "event" });
                                setState({tableStatus: "loading"})
                            }}
                        >
                            {t("Retry")}
                        </ErrorTable> : ""
                    }
                </div>
            </div>

            <Modal isOpen={state.modalOpen} size={state.modalSize}>
                <ModalIndex
                    _crudName={_crudName}
                    localStore={localStore}
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

EventPage.propTypes = {
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
    localStore: state.Event
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(EventPage))