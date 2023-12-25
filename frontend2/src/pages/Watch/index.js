import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"
import { connect } from "react-redux"

import { Modal } from "reactstrap"

import Breadcrumbs from "../../components/Common/Breadcrumb"

import {
    getWatch as petitionGet,
    postWatch as petitionPost,
    putWatch as petitionPut,
    deleteWatch as petitionDelete,
    postAndGetWatch as petitionPostAndGet,
    putAndGetWatch as petitionPutAndGet,
    deleteAndGetWatch as petitionDeleteAndGet,
} from "store/watch/actions"
import { getPlatform } from "store/platform/actions"
import TableIndex from "./table/tableIndex"
import ModalIndex from "./Modal/modalIndex"
import EventsTableIndex from "./events/tableIndex"
import { ErrorTable } from "components/tableElements"
import { SpinnerL } from "components/components"

const _crudName = {single: "watch", multiple: "watches", cod: "watch"}

const WatchPage = ({
    localStore,
    onGet,
    onPost,
    onPut,
    onDelete,
    onPostAndGet,
    onPutAndGet,
    onDeleteAndGet,
    onGetPlatform,
    platformStore,
    t
}) => {
    const [state, _zetState] = useState({
            eventTableStatus: "loading",
            imeiToSearch: "",
            tableMode: "watches",
            modalOpen: false,
            modalSize: "md",
            modalType: "Add",
            elementSelected: {},
    })

    const setState = (data) => {
        _zetState({...state, ...data})
    }

    useEffect(()=>{
        document.title = "Síguelo | Relojes";
        // onGet({ saveAs: "simList", url: "sim" })
    }, [])

    return(
        <React.Fragment>
            <div className="page-content mb-0 pb-0">
                <div className="container">
                    <Breadcrumbs title="Cuadros de mando" breadcrumbItem={t(_crudName.multiple)} />
                    <div className="tab-content">
                        <div className={`tab-pane fade ${state.tableMode == "watches" ? "show active" : ""}`}>

                                <TableIndex
                                    _crudName={_crudName}
                                    localStore={localStore}
                                    onGet={onGet}
                                    setState={setState}
                                    state={state}
                                    t={t} />
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
                    onPostAndGet={onPostAndGet}
                    onGet={onGet}
                    onPost={onPost}
                    onPut={onPut}
                    onDeleteAndGet={onDeleteAndGet}
                    onPutAndGet={onPutAndGet}
                    onGetPlatform={onGetPlatform}
                    platformStore={platformStore}
                    setState={setState}
                    state={state}
                    t={t}
                />
            </Modal>
        </React.Fragment>
    )
}

WatchPage.propTypes = {
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
    localStore: state.Watch,
    platformStore: state.Platform
})

const mapDispatchToProps = dispatch => ({
    onGet: data => dispatch(petitionGet(data)),
    onPost: data => dispatch(petitionPost(data)),
    onPut: data => dispatch(petitionPut(data)),
    onDelete: data => dispatch(petitionDelete(data)),
    onPostAndGet: data => dispatch(petitionPostAndGet(data)),
    onPutAndGet: data => dispatch(petitionPutAndGet(data)),
    onDeleteAndGet: data => dispatch(petitionDeleteAndGet(data)),
    onGetPlatform: data => dispatch(getPlatform(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(WatchPage))