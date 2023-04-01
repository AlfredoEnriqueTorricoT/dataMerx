import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"
import { connect } from "react-redux"

import { Modal } from "reactstrap"

import Breadcrumbs from "../../components/Common/Breadcrumb"

import {
    getSim as petitionGet,
    postSim as petitionPost,
    putSim as petitionPut,
    deleteSim as petitionDelete,
    postAndGetSim as petitionPostAndGet,
    putAndGetSim as petitionPutAndGet,
    deleteAndGetSim as petitionDeleteAndGet,
} from "store/actions"
import TableIndex from "./table/tableIndex"
import EventsTableIndex from "./events/tableIndex"
import ModalIndex from "./Modal/modalIndex"

const _crudName = {single: "sim", multiple: "sims", cod: "sim"}

const SimPage = ({
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
            eventTableStatus: "loading",
            modalOpen: false,
            modalSize: "md",
            modalType: "Add",
            tableMode: "sims",
            elementSelected: {}
    })

    const setState = (data) => {
        _zetState({...state, ...data})
    }

    useEffect(()=>{
        // onGet({ saveAs: _crudName.cod + "List", url: "sim" })
        onGet({ saveAs: "modemList", url: "modem" })
        onGet({ saveAs: "carList", url: "car" })
    }, [])

    return(
        <React.Fragment>
            <div className="page-content mb-0 pb-0">
                <div className="container">
                    <Breadcrumbs title="Cuadros de mando" breadcrumbItem={t(_crudName.multiple)} />
                    <div className="tab-content">
                        <div className={`tab-pane fade ${state.tableMode == "sims" ? "show active" : ""}`}>
                            <TableIndex
                            _crudName={_crudName}
                            localStore={localStore}
                            onGet={onGet}
                            setState={setState}
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

SimPage.propTypes = {
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
    localStore: state.Sims
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(SimPage))