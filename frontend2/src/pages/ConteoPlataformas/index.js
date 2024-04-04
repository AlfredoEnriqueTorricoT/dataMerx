import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"
import { connect } from "react-redux"

import { Modal } from "reactstrap"

import Breadcrumbs from "../../components/Common/Breadcrumb"

import {
    getPlatformCount as petitionGet,
    postPlatformCount as petitionPost,
    putPlatformCount as petitionPut,
    deletePlatformCount as petitionDelete,
    postAndGetPlatformCount as petitionPostAndGet,
    putAndGetPlatformCount as petitionPutAndGet,
    deleteAndGetPlatformCount as petitionDeleteAndGet,
} from "store/platform-count/actions"
import TableIndex from "./table/tableIndex"
import ModalIndex from "./Modal/modalIndex"

const _crudName = {single: "platformCount", multiple: "platformCounts", cod: "platformCount"}

const PlatformCountPage = ({
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
    
    const [listModal, setListModal] = useState(localStore["reportDeviceSigueloListByPlatform"]);
    const [state, _zetState] = useState({
            modalOpen: false,
            modalSize: "md",
            modalType: "Add",
            elementSelected: {},
            tableStatus: "loading",
            name: "",
    });

    

    const setState = (data) => {
        _zetState({...state, ...data})
    }

    useEffect(()=>{
        document.title = "Síguelo | Conteo de dispositivos";
        localStore["reportDeviceSigueloListByPlatform"] = [];
        //onPost({ saveAs: _crudName.cod + "List", url: "siguelo/getByImei" })
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
                    <Breadcrumbs title="Cuadros de mando" breadcrumbItem={"Conteo de dispositivos en plataformas"} />
                        {/* <button
                            onClick={()=>{console.log(localStore);}}
                        >
                            log
                        </button>
                        <button
                            onClick={()=>{console.log(localStore[_crudName.cod + "List"]);}}
                        >
                            log
                        </button> */}
                        <TableIndex
                            _crudName={_crudName}
                            localStore={localStore}
                            setListModal={setListModal}
                            localStoreModalList={localStore["reportDeviceSigueloListByPlatform"]}
                            onGet={onGet}
                            onPost={onPost}
                            state={state}
                            setState={setState}
                            t={t}
                        />
                </div>
            </div>

            <Modal isOpen={state.modalOpen} size={state.modalSize}>
                <ModalIndex
                    _crudName={_crudName}
                    localStoreModalList={localStore["reportDeviceSigueloListByPlatform"]}
                    onGet={petitionGet}
                    onPost={petitionPost}
                    onDelete={onDelete}
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

PlatformCountPage.propTypes = {
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
    localStore: state.PlatformCountReducer
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(PlatformCountPage))