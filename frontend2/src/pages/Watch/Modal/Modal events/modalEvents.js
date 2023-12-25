import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { getThisDate, SpinnerL } from 'components/components'
import { ErrorTable } from 'components/tableElements'
import DisplayEventList from './displayList'

const ModalEvent = ({CancelModalButton, CloseModalButton, localStore, onGet, state}) => {
    const [modalStatus, setModalStatus] = useState(0) //0 loading, 1 success, 2 error
    const [detailStatus, setDetailStatus] = useState(-1) //-1 init, "", ...
    const [showImg, setShowImg] = useState(0)
    const [idSelected, setIdSelected] = useState(-1)

    const [activeTab, setActiveTab] = useState(0) // car, modem, sim
    const [tabsLocked, setTabsLocked] = useState([false, false, false])

    useEffect(()=>{
        if (modalStatus == 0 && localStore.status != "waiting response") {
            if (localStore.status == 200) setModalStatus(1)
            else setModalStatus(2)
        }
        if (detailStatus == 0 && localStore.status != "waiting response") {
            if (localStore.status == 200) setDetailStatus(1)
            else setDetailStatus(2)
        }
    }, [localStore.status])

    const EmptyEventList = () => {
        return(
            <center>
                <h4 className="text-secondary my-5 py-5">
                    Sin eventos
                </h4>
            </center>
        )
    }

    const RetryFDetail = () => {
        onGet({saveAs: "eventImage", url: "event-images/" + idSelected})
        setDetailStatus(0)
    }
    const RetryFModal = () => {
        onGet({saveAs: "eventList", url: "event/car/" + state.elementSelected.id})
        setModalStatus(0)
    }

    return(
        <React.Fragment>
            <div className="modal-header">
                <h4>Eventos del módem</h4>
                <CloseModalButton />
            </div>

            <div className="modal-body">
            {modalStatus == 0 ? <SpinnerL /> : ""}

            {
                modalStatus == 1 ?
                    (localStore.eventList.length ?
                    <DisplayEventList
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    detailStatus={detailStatus}
                    idSelected={idSelected}
                    localStore={localStore}
                    onGet={onGet}
                    tabsLocked={tabsLocked}
                    RetryFDetail={RetryFDetail}
                    setDetailStatus={setDetailStatus}
                    setIdSelected={setIdSelected}
                    setShowImg={setShowImg}
                    showImg={showImg}
                    /> : <EmptyEventList />)
                : ""
            }

            {modalStatus == 2 ?
                <ErrorTable cod={localStore.status} retryFunction={RetryFModal} /> : ""
            }
            </div>

            <div className="modal-footer">
                <CancelModalButton />
                <div className="ms-auto"></div>
            </div>
        </React.Fragment>
    )
}

ModalEvent.propTypes = {
    CancelModalButton: PropTypes.any,
    CloseModalButton: PropTypes.any,
    localStore: PropTypes.object,
    onGet: PropTypes.func,
    state: PropTypes.object
}

export default ModalEvent