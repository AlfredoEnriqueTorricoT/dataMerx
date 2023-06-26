import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import ModalAdd from './modalAdd';
import ModalEdit from './modalEdit';
import ModalAddEvent from './modalAddEvent';
import { showToast } from 'components/toast';
import ModalSim from './modalSim';
import {Modal} from "reactstrap"
import ModalDetails from './modalDetails';
import ModalEvent from './Modal events/modalEvents';
import ModalAddImages from './modalAddImages';
import ModalChangeStatus from './modalChangeStatus';

const ModalIndex = ({_crudName, localStore, onPostAndGet, onGet, onPost, onPut, onPutAndGet, setState, state, t}) => {
    const [toastWaiting, setToastW] = useState(false)
    const [secondModal, setSecondModal] = useState({open: false})

    useEffect(()=>{
        if (toastWaiting && localStore.status !== "waiting response"){
            if (localStore.status == 232)
                setSecondModal({open: true});
            else {
                setToastW(false)
                toastFunction()
            }
        }
    }, [localStore.status])

    const toastSuccessMessages = {
        Add: "The modem has been added",
        Edit: "The modem has been edited",
        Sim: "The sim has been assigned",
        ["Add event to"]: "The event has been registered"
    }
    const toastFailMessages = {
        Add: "The modem could not be added",
        Edit: "The modem could not be edited",
        Sim: "The sim could not be assigned",
        ["Add event to"]: "The event could not be registered"
    }

    const toastFunction = () => {
        const itsOk = localStore.status == 200
        const okMessage = toastSuccessMessages[state.modalType]
        const failMessage = toastFailMessages[state.modalType]

        if (localStore.status == 432)
            showToast({
                type: "info",
                message: localStore.message
            })
        else
            showToast({
                type: itsOk ? "success" : "warning",
                title: itsOk ? t("Success") : t("Error") + " (" + localStore.status + ")",
                message: t(itsOk ? okMessage : failMessage)
            })

        if (itsOk) {
            setState({modalOpen: false});
            setSecondModal({open: false})
        }
    }

    const buttonIcon = {Add: "plus", Edit: "edit", Sim: "plus", ["Add event to"]: "plus"}
    const buttonText = {Add: "Add", Edit: "Edit", Sim: "Add", ["Add event to"]: "Add"}

    const CloseModalButton = () => (
        <button
            type="button"
            onClick={()=>{
                setState({modalOpen: false})
              }}
            className="close"
            aria-label="Close"
        ></button>
    )

    const CancelModalButton = () => (
        <button
            className="btn btn-secondary"
            onClick={()=>{
                setState({modalOpen: false})
            }}
        >
            {t("Cancel")}
        </button>
    )

    const modalToShow = () => {
        switch (state.modalType) {
            case "Add":
                return(
                    <ModalAdd
                        CancelModalButton={CancelModalButton}
                        CloseModalButton={CloseModalButton}
                        _crudName={_crudName}
                        formName={state.modalType}
                        localStore={localStore}
                        onPost={onPost}
                        setState={setState}
                        setToastW={setToastW}
                        t={t}
                        toastWaiting={toastWaiting}
                        />
                )
            case "Edit":
                return(
                    <ModalEdit
                        CancelModalButton={CancelModalButton}
                        CloseModalButton={CloseModalButton}
                        _crudName={_crudName}
                        formName={state.modalType}
                        localStore={localStore}
                        onPut={onPut}
                        setState={setState}
                        setToastW={setToastW}
                        state={state}
                        t={t}
                        toastWaiting={toastWaiting}
                    />
                )
            case "Sim":
                return(
                    <ModalSim
                        CancelModalButton={CancelModalButton}
                        CloseModalButton={CloseModalButton}
                        localStore={localStore}
                        onGet={onGet}
                        onPut={onPut}
                        setState={setState}
                        setToastW={setToastW}
                        state={state}
                    />
                )
            case "Add images":
                return(
                    <ModalAddImages
                        CloseModalButton={CloseModalButton}
                        CancelModalButton={CancelModalButton}
                        localStore={localStore}
                        onPost={onPost}
                        setState={setState}
                        state={state}
                    />
                )
            case "Add event to":
                return(
                    <ModalAddEvent
                        CancelModalButton={CancelModalButton}
                        CloseModalButton={CloseModalButton}
                        _crudName={_crudName}
                        localStore={localStore}
                        onPost={onPost}
                        setToastW={setToastW}
                        state={state}
                        t={t}
                        toastWaiting={toastWaiting}
                    />
                )
            case "ChangeStatus":
                return(
                    <ModalChangeStatus
                    _crudName={_crudName}
                    CancelModalButton={CancelModalButton}
                    CloseModalButton={CloseModalButton}
                    formName={state.modalType}
                    localStore={localStore}
                    onGet={onGet}
                    onPost={onPost}
                    setToastW={setToastW}
                    state={state}
                    setState={setState}
                    toastWaiting={toastWaiting}
                    />
                )
            case "Details":
                return(
                    <ModalDetails CancelModalButton={CancelModalButton} CloseModalButton={CloseModalButton} localStore={localStore} />
                )
            case "Events":
                return(
                    <ModalEvent CancelModalButton={CancelModalButton} CloseModalButton={CloseModalButton} localStore={localStore} onGet={onGet} state={state} />
                )
            default:
                break;
        }
    }

    return(

                modalToShow()
    )
}

ModalIndex.propTypes = {
    _crudName: PropTypes.object,
    localStore: PropTypes.object,
    onPostAndGet: PropTypes.func,
    onGet: PropTypes.func,
    onPost: PropTypes.func,
    onPut: PropTypes.func,
    onPutAndGet: PropTypes.func,
    setState: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func
}

export default ModalIndex