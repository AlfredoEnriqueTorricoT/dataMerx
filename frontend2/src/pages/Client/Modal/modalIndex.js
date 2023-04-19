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
import ModalCar from './modalCar';

const ModalIndex = ({_crudName, localStore, onDelete, onGet, onPost, onPostAndGet, onPutAndGet, setState, state, t}) => {
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


    const buttonIcon = {Add: "plus", Edit: "edit", Modem: "plus", ["Add event to"]: "plus"}
    const buttonText = {Add: "Add", Edit: "Edit", Modem: "Assign", ["Add event to"]: "Add"}

    const modalToShow = () => {
        switch (state.modalType) {
            case "Add":
                return(
                    <ModalAdd
                        _crudName={_crudName}
                        formName={state.modalType}
                        localStore={localStore}
                        onPost={onPost}
                        setState={setState}
                        setToastW={setToastW}
                        t={t}
                        />
                )
            case "Vehículos del":
                return(
                    <ModalCar
                        _crudName={_crudName}
                        formName={state.modalType}
                        localStore={localStore}
                        onDelete={onDelete}
                        onGet={onGet}
                        onPost={onPost}
                        setState={setState}
                        setToastW={setToastW}
                        state={state}
                        t={t}
                        />
                )
                
            default:
                break;
        }
    }

    return(
        <React.Fragment>
            <div className="modal-header">
                <h4>{t(state.modalType) + " " + t(_crudName.single)}</h4>
                <button
                    type="button"
                    onClick={()=>{
                        setState({modalOpen: false})
                      }}
                    className="close"
                    aria-label="Close"
                ></button>
            </div>
            <div className="modal-body">
                {modalToShow()}
            </div>
            <div className="modal-footer">
                <button
                    className='btn btn-secondary'
                    onClick={()=>{
                        setState({modalOpen: false})
                    }}
                >
                    {t("Cancel")}
                </button>
                <div className="ms-auto">
                    <button
                        className={`btn btn-${toastWaiting ? "light" : "primary btn-label"}`}
                        disabled={toastWaiting}
                        form={_crudName.cod + "_" + state.modalType}
                        hidden={["Events", "Details", "Vehículos del"].includes(state.modalType)}
                        type="submit"
                    >
                        {
                            toastWaiting ?
                            <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> :
                            <i className={`fas fa-${buttonIcon[state.modalType]} label-icon`}></i>
                        }
                        {t(buttonText[state.modalType])}
                    </button>
                </div>
            </div>

            <Modal isOpen={secondModal.open} size="sm">
                        <div className="modal-header">
                            <h4>{t("Modem already assigned")}</h4>
                            <button
                                type="button"
                                onClick={()=>{
                                    setSecondModal({open: false});
                                    setToastW(false)
                                  }}
                                className="close"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {localStore.message}
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                onClick={()=>{
                                    setSecondModal({open: false})
                                    setToastW(false)
                                }}
                            >
                                {t("Cancel")}
                            </button>
                            <div className="ms-auto">

                                <button
                                    className={`btn btn-${localStore.status == "waiting response" ? "light" : "primary btn-label"}`}
                                    disabled={localStore.status == "waiting response"}
                                    form={_crudName.cod + "_" + state.modalType}
                                >
                                    {
                                        localStore.status == "waiting response" ?
                                        <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> :
                                        <i className="fas fa-plus label-icon"></i>
                                    }
                                    {t("Assign")}
                                </button>
                            </div>
                        </div>
            </Modal>
        </React.Fragment>
    )
}

ModalIndex.propTypes = {
    _crudName: PropTypes.object,
    localStore: PropTypes.object,
    onDelete: PropTypes.func,
    onGet: PropTypes.func,
    onPost: PropTypes.func,
    onPostAndGet: PropTypes.func,
    onPutAndGet: PropTypes.func,
    setState: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func
}

export default ModalIndex