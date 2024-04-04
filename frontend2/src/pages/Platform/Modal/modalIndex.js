import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import ModalAdd from './modalAdd';
import ModalEdit from './modalEdit';
import { showToast } from 'components/toast';

import ModalWifi from './modalWifi';

const ModalIndex = ({_crudName, localStore, onGet, onPost, onDelete, onPostAndGet, onPutAndGet, setState, state, t}) => {
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

    const HeaderButtonClose = () => (
        <button
        type="button"
        onClick={()=>{
            setState({modalOpen: false})
          }}
        className="close"
        aria-label="Close"
        ></button>
    )

    const FooterButtonClose = () => (
        <button
            className='btn btn-secondary'
            onClick={()=>{
                setState({modalOpen: false})
            }}
        >
            {t("Close")}
        </button>
    )

    const modalToShow = () => {
        switch (state.modalType) {
            case "Add":
                return(
                    <ModalAdd
                        _crudName={_crudName}
                        formName={state.modalType}
                        FooterButtonClose = {FooterButtonClose}
                        HeaderButtonClose={HeaderButtonClose}
                        onPostAndGet={onPostAndGet}
                        state={state}
                        setState={setState}
                        setToastW={setToastW}
                        toastWaiting={toastWaiting}
                        t={t}
                        />
                )
            case "Edit":
                return(
                    <ModalEdit
                        _crudName={_crudName}
                        formName={state.modalType}
                        FooterButtonClose = {FooterButtonClose}
                        HeaderButtonClose={HeaderButtonClose}
                        onPutAndGet={onPutAndGet}
                        setState={setState}
                        setToastW={setToastW}
                        toastWaiting={toastWaiting}
                        state={state}
                        t={t}
                    />
                )
            case "Wifi":
                return(
                    <ModalWifi
                        _crudName={_crudName}
                        elementSelected={state.elementSelected}
                        FooterButtonClose = {FooterButtonClose}
                        HeaderButtonClose={HeaderButtonClose}
                        localStore={localStore}
                        onGet={onGet}
                        onPost={onPost}
                        onDelete={onDelete}
                        onPostAndGet={onPostAndGet}
                        setToastW={setToastW}
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
    onGet: PropTypes.func,
    onPost: PropTypes.func,
    onDelete: PropTypes.func,
    onPostAndGet: PropTypes.func,
    onPutAndGet: PropTypes.func,
    setState: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func
}

export default ModalIndex