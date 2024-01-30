import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import ModalAdd from './modalAdd';
import ModalEdit from './modalEdit';
import { showToast } from 'components/toast';
import ModalPermissions from './modalPermissions';

const ModalIndex = ({_crudName, getUser, onPost, localStore, onPostAndGet, onPutAndGet, setState, state, t}) => {

    const ModalCloseButton = () => (
        <button
            type="button"
            onClick={()=>{
                setState({modalOpen: false})
              }}
            className="close"
            aria-label="Close"
        ></button>
    )

    const ModalCancelButton = () => (
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
                        ModalCancelButton={ModalCancelButton}
                        ModalCloseButton={ModalCloseButton}

                        _crudName={_crudName}
                        onPostAndGet={onPostAndGet}
                        setState={setState}
                        localStore={localStore}
                        t={t}
                    />
                )
            case "Edit":
                return(
                    <ModalEdit
                        ModalCancelButton={ModalCancelButton}
                        ModalCloseButton={ModalCloseButton}

                        _crudName={_crudName}
                        localStore={localStore}
                        onPutAndGet={onPutAndGet}
                        setState={setState}
                        state={state}
                        t={t}
                    />
                )
            case "Permission":
                return(
                    <ModalPermissions
                        ModalCancelButton={ModalCancelButton}
                        ModalCloseButton={ModalCloseButton}
                        getUser={getUser}
                        localStore={localStore}
                        onPost={onPost}
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
    getUser: PropTypes.object,
    localStore: PropTypes.object,
    onPost: PropTypes.func,
    onPostAndGet: PropTypes.func,
    onPutAndGet: PropTypes.func,
    setState: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func
}

export default ModalIndex