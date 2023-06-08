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

    const modalIcon = {Add: "plus", Edit: "edit"}

    const modalToShow = () => {
        switch (state.modalType) {
            case "Add":
                return(
                    <ModalAdd
                        _crudName={_crudName}
                        formName={state.modalType}
                        onPostAndGet={onPostAndGet}
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
                        onPutAndGet={onPutAndGet}
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
                        className={`btn dm-button text-light btn-label`}
                        disabled={toastWaiting}
                        form={_crudName.cod + "_" + state.modalType}
                        type="submit"
                    >
                        {
                            toastWaiting ?
                            <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> :
                            <i className={`fas fa-${modalIcon[state.modalType]} label-icon`}></i>
                        }
                        {t(state.modalType)}
                    </button>
                </div>
            </div>
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