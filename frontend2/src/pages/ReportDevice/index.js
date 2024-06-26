import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"
import { connect } from "react-redux"

import { Modal } from "reactstrap"

import Breadcrumbs from "../../components/Common/Breadcrumb"

import {
    getReportDevice as petitionGet,
    postReportDevice as petitionPost,
    putReportDevice as petitionPut,
    deleteReportDevice as petitionDelete,
    postAndGetReportDevice as petitionPostAndGet,
    putAndGetReportDevice as petitionPutAndGet,
    deleteAndGetReportDevice as petitionDeleteAndGet,
} from "store/report-device/actions"
import TableIndex from "./table/tableIndex"
import ModalIndex from "./Modal/modalIndex"
import { ErrorTable } from "components/tableElements"
import { SpinnerL } from "components/components"

const _crudName = { single: "reportDevice", multiple: "reportDevices", cod: "reportDevice" }

const ReportDevicePage = ({
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
        _zetState({ ...state, ...data })
    }

    useEffect(() => {
        document.title = "Síguelo | Reporte";
        onGet({ saveAs: _crudName.cod + "List", url: "platform/count" })
    }, [])

    useEffect(() => {
        if (state.tableStatus == "loading" && localStore.status != "waiting response") {
            if (localStore.status == 200) setState({ tableStatus: "success" })
            else {
                console.log(localStore.status);
                setState({ tableStatus: "error" })
            }
        }
    }, [localStore.status])

    return (
        <React.Fragment>
            <div className="page-content mb-0 pb-0">
                <div className="container">
                    <Breadcrumbs title="Cuadros de mando" breadcrumbItem={"Conteo de dispositivos"} />
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
                            retryFunction={() => {
                                onGet({ saveAs: _crudName.cod + "List", url: "platform" });
                                setState({ tableStatus: "loading" })
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

ReportDevicePage.propTypes = {
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
    localStore: state.ReportDevice
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ReportDevicePage))