import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import ModalAdd from './modalAdd';
import ModalEdit from './modalEdit';
import { showToast } from 'components/toast';
import ModalModem from './modalModem';
import { Modal } from 'reactstrap';
import ModalAddEvent from './modalAddEvent';
import ModalDetails from './modalDetails';
import ModalEvent from './Modal events/modalEvents';

const ModalIndex = ({_crudName, localStore, onGet, onPost, onPut, onPostAndGet, onPutAndGet, setState, state, t}) => {
    const [secondModal, setSecondModal] = useState({open: false})
    const [toastWaiting, setToastW] = useState(false)

    useEffect(()=>{
        if (toastWaiting && localStore.status !== "waiting response"){
            if (localStore.status == 232) setSecondModal({open: true})
            else {
            setToastW(false)
            toastFunction()
            }
        }
    }, [localStore.status])

    const _432message = "The modem does not have a sim added, you need to add a sim to the modem or find another modem"

    const toastSuccessMessages = {
        Add: "The car has been added",
        Edit: "The car has been edited",
        Modem: "The modem has been assigned",
        ["Add event to"]: "The event has been registered"
    }
    const toastFailMessages = {
        Add: "The car could not be added",
        Edit: "The car could not be edited",
        Modem: "The modem could not be assigned",
        ["Add event to"]: "The event could not be registered"
    }

    const toastFunction = () => {
        setSecondModal({open: false})
        const itsOk = localStore.status == 200
        const okMessage = toastSuccessMessages[state.modalType]
        const failMessage = toastFailMessages[state.modalType]

        showToast({
            type: itsOk ? "success" : "warning",
            title: itsOk ? t("Success") : (localStore.status == 432 ? "" : t("Error") + " (" + localStore.status + ")"),
            message: t(itsOk ? okMessage : (localStore.status == 432 ? t(_432message) : failMessage))
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

    const modalToShow = () => {
        switch (state.modalType) {
            case "Add":
                return(
                    <ModalAdd
                        CloseModalButton={CloseModalButton}
                        CancelModalButton={CancelModalButton}

                        _crudName={_crudName}
                        formName={state.modalType}
                        localStore={localStore}
                        onPost={onPost}
                        setState={setState}
                        setToastW={setToastW}
                        t={t}
                        />
                )
            case "Edit":
                return(
                    <ModalEdit
                        CloseModalButton={CloseModalButton}
                        CancelModalButton={CancelModalButton}

                        _crudName={_crudName}
                        formName={state.modalType}
                        localStore={localStore}
                        onPutAndGet={onPutAndGet}
                        setToastW={setToastW}
                        state={state}
                        t={t}
                    />
                )
            case "Modem":
                return(
                    <ModalModem
                        CloseModalButton={CloseModalButton}
                        CancelModalButton={CancelModalButton}

                        localStore={localStore}
                        onGet={onGet}
                        onPut={onPut}
                        secondModal={secondModal}
                        setToastW={setToastW}
                        setState={setState}
                        state={state}
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
                return (
                    <ModalDetails
                        CloseModalButton={CloseModalButton}
                        CancelModalButton={CancelModalButton}

                        localStore={localStore}
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
                    {/* <button
                        className={`btn btn-${toastWaiting ? "light" : "primary btn-label"}`}
                        disabled={toastWaiting}
                        form={_crudName.cod + "_" + state.modalType}
                        hidden={state.modalType == "Details" || state.modalType == "Events"}
                        type="submit"
                    >
                        {
                            toastWaiting ?
                            <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> :
                            <i className={`fas fa-${buttonIcon[state.modalType]} label-icon`}></i>
                        }
                        {t(buttonText[state.modalType])}
                    </button> */}
        </React.Fragment>
    )
}

ModalIndex.propTypes = {
    _crudName: PropTypes.object,
    localStore: PropTypes.object,
    onGet: PropTypes.func,
    onPost: PropTypes.func,
    onPut: PropTypes.func,
    onPostAndGet: PropTypes.func,
    onPutAndGet: PropTypes.func,
    setState: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func
}

export default ModalIndex