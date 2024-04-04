import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import ModalAdd from './modalAdd';

const ModalIndex = ({_crudName, localStore, onGet, onPost, onDelete, onPostAndGet, onPutAndGet, setState, state, t}) => {
    const [toastWaiting, setToastW] = useState(false)

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
                        localStore={localStore}
                        onPostAndGet={onPostAndGet}
                        state={state}
                        setState={setState}
                        setToastW={setToastW}
                        toastWaiting={toastWaiting}
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