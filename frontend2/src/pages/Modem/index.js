import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"
import { connect } from "react-redux"

import { Modal } from "reactstrap"

import Breadcrumbs from "../../components/Common/Breadcrumb"

import {
    getModem as petitionGet,
    postModem as petitionPost,
    putModem as petitionPut,
    deleteModem as petitionDelete,
    postAndGetModem as petitionPostAndGet,
    putAndGetModem as petitionPutAndGet,
    deleteAndGetModem as petitionDeleteAndGet,
} from "store/modem/actions"
import TableIndex from "./table/tableIndex"
import ModalIndex from "./Modal/modalIndex"
import EventsTableIndex from "./events/tableIndex"
import { ErrorTable } from "components/tableElements"
import { SpinnerL } from "components/components"

const _crudName = {single: "modem", multiple: "modems", cod: "modem"}

const ModemPage = ({
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
            tableMode: "modems",
            modalOpen: false,
            modalSize: "md",
            modalType: "Add",
            elementSelected: {},
    })

    const setState = (data) => {
        _zetState({...state, ...data})
    }

    useEffect(()=>{
        // onGet({ saveAs: _crudName.cod + "List", url: "modem" })
        onGet({ saveAs: "modemBrandList", url: "modem-mark" })
        onGet({ saveAs: "carList", url: "car" })
        onGet({ saveAs: "simList", url: "sim" })
    }, [])

    return(
        <React.Fragment>
            <div className="page-content mb-0 pb-0">
                <div className="container">
                    <Breadcrumbs title="Cuadros de mando" breadcrumbItem={t(_crudName.multiple)} />
                    <div className="tab-content">
                        <div className={`tab-pane fade ${state.tableMode == "modems" ? "show active" : ""}`}>

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
                    onPostAndGet={onPostAndGet}
                    onPost={onPost}
                    onPut={onPut}
                    onPutAndGet={onPutAndGet}
                    setState={setState}
                    state={state}
                    t={t}
                />
            </Modal>
        </React.Fragment>
    )
}

ModemPage.propTypes = {
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
    localStore: state.Modem
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ModemPage))