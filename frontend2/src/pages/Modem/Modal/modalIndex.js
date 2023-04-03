import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import ModalAdd from './modalAdd';
import ModalEdit from './modalEdit';
import ModalAddEvent from './modalAddEvent';
import { showToast } from 'components/toast';
import ModalSim from './modalSim';
import {Modal} from "reactstrap"
import ModalDetails from './modalDetails';
import ModalEvent from './modalEvents';

const ModalIndex = ({_crudName, localStore, onPostAndGet, onGet, onPost, onPutAndGet, setState, state, t}) => {
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
                type: "warning",
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
            case "Edit":
                return(
                    <ModalEdit
                        _crudName={_crudName}
                        formName={state.modalType}
                        localStore={localStore}
                        onPutAndGet={onPutAndGet}
                        setState={setState}
                        setToastW={setToastW}
                        state={state}
                        t={t}
                    />
                )
            case "Sim":
                return(
                    <ModalSim
                        _crudName={_crudName}
                        localStore={localStore}
                        onPutAndGet={onPutAndGet}
                        secondModal={secondModal}
                        setToastW={setToastW}
                        state={state}
                        t={t}
                    />
                )
            case "Add event to":
                return(
                    <ModalAddEvent
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
                    <ModalDetails localStore={localStore} />
                )
            case "Events":
                return(
                    <ModalEvent localStore={localStore} onGet={onGet} state={state} />
                )
            default:
                break;
        }
    }

    return(
        <React.Fragment>
            <div className="modal-header">
                {state.modalType != "Sim" ?
                    <h4>{t(state.modalType) + " " + t(_crudName.single)}</h4> :
                    <h4>{t("Modem sim")}</h4>
                }
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
                    {state.modalType == "Details" ? "Cerrar" : "Cancelar"}
                </button>
                <div className="ms-auto">
                    <button
                        className={`btn btn-${toastWaiting ? "light" : "primary btn-label"}`}
                        hidden={state.modalType == "Details" || state.modalType == "Events"}
                        disabled={toastWaiting}
                        form={_crudName.cod + "_" + state.modalType}
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
                            <h4>{t("Sim already assigned")}</h4>
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
    onPostAndGet: PropTypes.func,
    onGet: PropTypes.func,
    onPost: PropTypes.func,
    onPutAndGet: PropTypes.func,
    setState: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func
}

export default ModalIndex