import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"
import { connect } from "react-redux"

import { Modal } from "reactstrap"

import Breadcrumbs from "../../components/Common/Breadcrumb"

import {
    getClient as petitionGet,
    postClient as petitionPost,
    putClient as petitionPut,
    deleteClient as petitionDelete,
    postAndGetClient as petitionPostAndGet,
    putAndGetClient as petitionPutAndGet,
    deleteAndGetClient as petitionDeleteAndGet,
} from "store/clients/actions"
import TableIndex from "./table/tableIndex"
import EventsTableIndex from "./events/tableIndex"
import ModalIndex from "./Modal/modalIndex"
import { ErrorTable } from "components/tableElements"
import { SpinnerL } from "components/components"

const _crudName = {single: "cliente", multiple: "clientes", cod: "client"}

const ClientPage = ({
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
            tableMode: "clients",
            eventTableStatus: "loading",
            modalOpen: false,
            modalSize: "md",
            modalType: "Add",
            elementSelected: {},
    })

    const setState = (data) => {
        _zetState({...state, ...data})
    }

    useEffect(()=>{
        // onGet({ saveAs: _crudName.cod + "List", url: "client" })
        onGet({ saveAs: "modemList", url: "modem" })
        onGet({ saveAs: "platformList", url: "platform" })
    }, [])

    return(
        <React.Fragment>
            <div className="page-content mb-0 pb-0">
                <div className="container">
                    <Breadcrumbs title="Cuadros de mando" breadcrumbItem={t(_crudName.multiple)} />
                    <div className="tab-content">
                        <div className={`tab-pane fade ${state.tableMode == "clients" ? "show active" : ""}`}>
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
                    onDelete={onDelete}
                    onGet={onGet}
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

ClientPage.propTypes = {
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
    localStore: state.Client
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ClientPage))