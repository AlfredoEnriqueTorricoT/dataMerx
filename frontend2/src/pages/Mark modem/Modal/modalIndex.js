import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import ModalAdd from './modalAdd';
import ModalEdit from './modalEdit';
import { showToast } from 'components/toast';

const ModalIndex = ({_crudName, localStore, onPostAndGet, onPutAndGet, setState, state, t}) => {
    const [toastWaiting, setToastW] = useState(false)

    useEffect(()=>{
        if (toastWaiting && localStore.status !== "waiting response"){
            setToastW(false)
            toastFunction()
        }
    }, [localStore.status])

    const toastFunction = () => {
        const itsOk = localStore.status == 200
        const okMessage = "The " + _crudName.single + " has been " + state.modalType.toLowerCase() + (state.modalType != "delete" ? "ed" : "d")
        const failMessage = "The " + _crudName.single + " could not be " + state.modalType.toLowerCase() + (state.modalType != "delete" ? "ed" : "d")

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

    const modalToShow = () => {
        switch (state.modalType) {
            case "Add":
                return(
                    <ModalAdd
                        CancelModalButton={CancelModalButton}
                        CloseModalButton={CloseModalButton}

                        _crudName={_crudName}
                        localStore={localStore}
                        onPostAndGet={onPostAndGet}
                        setState={setState}
                        t={t}
                    />
                )
            case "Edit":
                return(
                    <ModalEdit
                        CancelModalButton={CancelModalButton}
                        CloseModalButton={CloseModalButton}

                        _crudName={_crudName}
                        localStore={localStore}
                        onPutAndGet={onPutAndGet}
                        setState={setState}
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
            {modalToShow()}
        </React.Fragment>
    )
}

ModalIndex.propTypes = {
    _crudName: PropTypes.object,
    localStore: PropTypes.object,
    onPostAndGet: PropTypes.func,
    onPutAndGet: PropTypes.func,
    setState: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func
}

export default ModalIndex