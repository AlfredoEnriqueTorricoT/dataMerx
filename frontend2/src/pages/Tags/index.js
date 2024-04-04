import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"
import { connect } from "react-redux"

import { Modal } from "reactstrap"

import Breadcrumbs from "../../components/Common/Breadcrumb"

import {
    getTag as petitionGet,
    postTag as petitionPost,
    putTag as petitionPut,
    deleteTag as petitionDelete,
    postAndGetTag as petitionPostAndGet,
    putAndGetTag as petitionPutAndGet,
    deleteAndGetTag as petitionDeleteAndGet,
} from "store/tags/actions"
import { getPlatform } from "store/platform/actions"
import TableIndex from "./table/tableIndex"
import ModalIndex from "./Modal/modalIndex"
import EventsTableIndex from "./events/tableIndex"

const _crudName = {single: "tag", multiple: "tags", cod: "tag"}

const TagsPage = ({
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
            tableMode: "tags",
            modalOpen: false,
            modalSize: "md",
            modalType: "Add",
            elementSelected: {},
    })

    const setState = (data) => {
        _zetState({...state, ...data})
    }

    useEffect(()=>{
        document.title = "Síguelo | Tags";
        onGet({ saveAs: "tagList", url: "tag" })
    }, [])

    

    return(
        <React.Fragment>
            <div className="page-content mb-0 pb-0">
                <div className="container">
                    <Breadcrumbs title="Cuadros de mando" breadcrumbItem={t(_crudName.multiple)} />
                    <div className="tab-content">
                        <div className={`tab-pane fade ${state.tableMode == "tags" ? "show active" : ""}`}>

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

TagsPage.propTypes = {
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
    localStore: state.Tag,
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(TagsPage))