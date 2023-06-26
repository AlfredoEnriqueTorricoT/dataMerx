import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import ModalAdd from './modalAdd';
import ModalEdit from './modalEdit';
import { showToast } from 'components/toast';
import ModalAddEvent from './modalAddEvent';
import ModalDetails from './modalDetails';
import ModalEvent from './Modal events/modalEvents';
import ModalAddImages from './modalAddImages';
import ModalChangeStatus from './modalChangeStatus';

const ModalIndex = ({_crudName, localStore, onGet, onPost, onPostAndGet, onPutAndGet, setState, state, t}) => {
    const [toastWaiting, setToastW] = useState(false)

    useEffect(()=>{
        if (toastWaiting && localStore.status !== "waiting response"){
            setToastW(false)
            toastFunction()
        }
    }, [localStore.status])

    const successMessage = {
        Add: "The " + _crudName.single + " has been added",
        Edit: "The " + _crudName.single + " has been edited",
        ["Add event to"]: "The event has been registered",
    }
    const errorMessage = {
        Add: "The " + _crudName.single + " could not be added",
        Edit: "The " + _crudName.single + " could not be edited",
        ["Add event to"]: "The event could not be registered",
    }

    const toastFunction = () => {
        const itsOk = localStore.status == 200
        const okMessage = successMessage[state.modalType]
        const failMessage = errorMessage[state.modalType]

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

        if (itsOk) setState({modalOpen: false})
    }

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
            className='btn btn-secondary'
            onClick={()=>{
                setState({modalOpen: false})
            }}
        >
            {t("Cancel")}
        </button>
    )

    const buttonText = {Add: "Add", Edit: "Edit", ["Add event to"]: "Add"}
    // const buttonColor = {Add: "success", Edit: "primary", ["Add event to"]: "success"}
    const modalIcon = {Add: "plus", Edit: "edit", ["Add event to"]: "plus"}

    const modalToShow = () => {
        switch (state.modalType) {
            case "Add":
                return(
                    <ModalAdd
                        CloseModalButton={CloseModalButton}
                        CancelModalButton={CancelModalButton}
                        _crudName={_crudName}
                        localStore={localStore}
                        onPost={onPost}
                        setState={setState}
                        t={t}
                    />
                )
            case "Edit":
                return(
                    <ModalEdit
                        CloseModalButton={CloseModalButton}
                        CancelModalButton={CancelModalButton}
                        _crudName={_crudName}
                        onPutAndGet={onPutAndGet}
                        setState={setState}
                        state={state}
                        t={t}
                    />
                )
            case "Add event to":
                return(
                    <ModalAddEvent
                        CloseModalButton={CloseModalButton}
                        CancelModalButton={CancelModalButton}
                        _crudName={_crudName}
                        localStore={localStore}
                        onPost={onPost}
                        setToastW={setToastW}
                        state={state}
                        t={t}
                    />
                )
            case "Details":
                return(
                    <ModalDetails
                        CloseModalButton={CloseModalButton}
                        CancelModalButton={CancelModalButton}
                        localStore={localStore}
                    />
                )
            case "ChangeStatus" :
                return(
                    <ModalChangeStatus
                        CloseModalButton={CloseModalButton}
                        CancelModalButton={CancelModalButton}
                        localStore={localStore}
                        onGet={onGet}
                        onPost={onPost}
                        setState={setState}
                        state={state}
                        t={t}
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
            case "Events":
                return(
                    <ModalEvent
                        CloseModalButton={CloseModalButton}
                        CancelModalButton={CancelModalButton}
                        localStore={localStore}
                        onGet={onGet}
                        state={state}
                    />
                    )
                
            default:
                break;
        }
    }

    return(
        <React.Fragment>
            {modalToShow()}
        </React.Fragment>
    )
}

ModalIndex.propTypes = {
    _crudName: PropTypes.object,
    localStore: PropTypes.object,
    onGet: PropTypes.func,
    onPost: PropTypes.func,
    onPostAndGet: PropTypes.func,
    onPutAndGet: PropTypes.func,
    setState: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func
}

export default ModalIndex