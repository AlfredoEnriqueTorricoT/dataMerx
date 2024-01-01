import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import ModalAdd from './modalAdd';
import ModalEdit from './modalEdit';
import ModalDelete from './modalDelete';
import ModalSettings from './modalSettings';
import { showToast } from 'components/toast';

const ModalIndex = ({
    _crudName,
    localStore,
    onDeleteAndGet,
    onPostAndGet,
    onGet,
    onPost,
    onPut,
    onPutAndGet,
    onGetPlatform,
    platformStore,
    setState,
    state,
    t
}) => {
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
        Add: "The watch has been added",
        Edit: "The watch has been edited",
        Settings: "El reloj ha sido configurado",
        ["Add event to"]: "The event has been registered"
    }
    const toastFailMessages = {
        Add: "The watch could not be added",
        Edit: "The watch could not be edited",
        Settings: "El reloj no pudo ser configurado",
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
            case "Delete":
                return(
                    <ModalDelete
                        _crudName={_crudName}
                        CancelModalButton={CancelModalButton}
                        CloseModalButton={CloseModalButton}
                        localStore={localStore}
                        onDeleteAndGet={onDeleteAndGet}
                        setState={setState}
                        state={state}
                        t={t}
                        toastWaiting={toastWaiting}
                    />
                )
            case "Settings":
                return(
                    <ModalSettings
                        _crudName={_crudName}
                        CancelModalButton={CancelModalButton}
                        CloseModalButton={CloseModalButton}
                        localStore={localStore}
                        onPostAndGet={onPostAndGet}
                        onGetPlatform={onGetPlatform}
                        platformStore={platformStore}
                        setState={setState}
                        setToastW={setToastW}
                        state={state}
                        t={t}
                        toastWaiting={toastWaiting}
                    />
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
    onDeleteAndGet: PropTypes.func,
    onGet: PropTypes.func,
    onPost: PropTypes.func,
    onPut: PropTypes.func,
    onPutAndGet: PropTypes.func,
    onGetPlatform: PropTypes.func,
    platformStore: PropTypes.object,
    setState: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func
}

export default ModalIndex