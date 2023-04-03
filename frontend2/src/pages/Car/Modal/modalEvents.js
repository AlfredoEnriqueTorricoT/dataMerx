import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { getThisDate, SpinnerL } from 'components/components'
import { ErrorTable } from 'components/tableElements'

const ModalEvent = ({localStore, onGet, state}) => {
    const [modalStatus, setModalStatus] = useState(0) //0 loading, 1 success, 2 error
    const [idSelected, setIdSelected] = useState(-1)

    useEffect(()=>{
        if (modalStatus == 0 && localStore.status != "waiting response") {
            if (localStore.status == 200) setModalStatus(1)
            else setModalStatus(2)
        }
    }, [localStore.status])

    const badgeColor = ["buen", "info", "warning", "danger"]
    const badgeText = ["dia", "Informativo", "Advertencia", "Peligro"]
    const DisplayEventList = () => {
        return(
            <div className="row">
                <div className="col-7">
                    <div className="row border-dark border-bottom">
                        <div className="col-6">
                            <b>Evento</b>
                        </div>
                        <div className="col-3">
                            <b>Fecha</b>
                        </div>
                        <div className="col-3">
                            <b>Tipo</b>
                        </div>
                    </div>
                    
                    <div
                        className="m-0 p-0 grayScroll"
                        style={{maxHeight: "55vh", overflowY: "auto", overflowX: "hidden"}}
                    >
                        {localStore.eventList.map((event, idx)=>(
                            <div
                                className={`row border-bottom py-1 ${idSelected == event.id ? ("bg-soft bg-secondary") : ""}`}
                                style={{cursor: "pointer"}}
                                onClick={()=>{setIdSelected(event.id); console.log(event.id);}}
                                key={"eventItem-"+idx}>
                                <div className="col-6">
                                    <b>{event.title}</b><br />
                                    <p>{event.detail}</p>
                                </div>
                                <div className="col-3 justify-content-center">
                                    {getThisDate(event.created_at)}
                                </div>
                                <div className="col-3 align-items-center">
                                    <center>
                                        <span
                                          className={`badge font-size-11 rounded-pill badge-soft-${
                                            badgeColor[event.type_id]
                                          } text-uppercase`}
                                        >
                                          {badgeText[event.type_id]}
                                        </span>
                                    </center>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-5">
                    <center>
                        <h4 className="text-secondary my-5 py-5">Seleccione un evento</h4>
                    </center>
                </div>
            </div>
        )
    }

    const EmptyEventList = () => {
        return(
            <center>
                <h4 className="text-secondary my-5 py-5">
                    Sin eventos
                </h4>
            </center>
        )
    }

    const RetryF = () => {
        onGet({saveAs: "eventList", url: "event/car/" + state.elementSelected.id})
        setModalStatus(0)
    }

    return(
        <React.Fragment>
            {modalStatus == 0 ? <SpinnerL /> : ""}

            {
                modalStatus == 1 ?
                    (localStore.eventList.length ?
                    <DisplayEventList /> : <EmptyEventList />)
                : ""
            }

            {modalStatus == 2 ?
                <ErrorTable cod={localStore.status} retryFunction={RetryF} /> : ""
            }
        </React.Fragment>
    )
}

ModalEvent.propTypes = {
    localStore: PropTypes.object,
    onGet: PropTypes.func,
    state: PropTypes.object
}

export default ModalEvent