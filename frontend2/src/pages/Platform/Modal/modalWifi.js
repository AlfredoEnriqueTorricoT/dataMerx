import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'reactstrap'

import ModalAddWifi from './modalAddWifi'
import { THeaderSorter } from 'components/tableElements'
import { SpinnerL } from 'components/components'
import { showToast } from 'components/toast'


const ModalWifi = ({
    _crudName,
    FooterButtonClose,
    HeaderButtonClose,
    elementSelected,
    localStore,
    onPost,
    onDelete,
    onPostAndGet,
    setToastW,
    setState, t
}) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState("Add")
    const [tWaiting, setTWaiting] = useState(false)
    const [tableState, setTableState] = useState(0)
    const [sorter, setSorter] = useState(1)

    useEffect(()=>{
        if (tWaiting && localStore.status != "waiting response") {
            if (localStore.status != 204) {
                showToast({type: "warning", title: "Error (" + localStore.status + ")", message: t("No se ha podido eliminar la red wi-fi")})
            }
            setTWaiting(false)
        }
    }, [localStore.status])

    useEffect(()=>{
        if (tableState == 0 && localStore.status != "waiting response") {
            if (localStore.status == 200) setTableState(1)
            else setTableState(-1)
        }
    }, [localStore.status])

    const displayData = () => {
    if (tableState == 0)
        return(
                <center>
                    <SpinnerL />
                </center>
            )
    else if (tableState == 1)
        return(
        <React.Fragment>
                <div className="grayScroll table-responsive" style={{maxHeight: "55vh", overflow: "auto"}}>
                    <table className="table table-striped">
                        <THeaderSorter
                          sorter={sorter}
                          setSorter={setSorter}
                          headerNames={[
                            {name: "SSID", arrow: true},
                            {name: "Eliminar", arrow: false}
                          ]}
                         />
                        <tbody>
                            {localStore.wifiList.length == 0 ?
                              <tr>
                                <td colSpan="5">
                                  <h4 className="text-secondary">
                                    {t("No wi-fi found")}
                                  </h4>
                                </td>
                              </tr> :
                            localStore.wifiList.map((listItem, idx)=>(
                                <tr key={_crudName.cod + "Item-" + idx}>
                                    <td>{listItem.ssid}</td>
                                    <td>
                                        <button 
                                            className='btn btn-sm'
                                            disabled={tWaiting}
                                            onClick={()=>{
                                                onDelete({
                                                    url: "wifi/" + listItem.id,
                                                    saveAs: "wifiList",
                                                    payload: localStore.wifiList.filter((item, index)=>item.id != listItem.id)
                                                })
                                                setTWaiting({tWaiting: true})
                                            }}
                                            title='Eliminar red wi-fi'
                                          >
                                            <i className="fas fa-trash-alt text-danger"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </React.Fragment>
    )
    else
        return(
                <center>
                    <h4 className="text-secondary">Error ({localStore.status})</h4>
                    <br />
                    <button
                        className='btn btn-primary'
                    >
                        {t("Retry")}
                    </button>
                </center>
            )
        }

            return(
                <React.Fragment>
                    <div className='modal-header'>
                        <h4>Redes wi-fi de {elementSelected.name}</h4>
                        <HeaderButtonClose />
                    </div>

                    <div className='modal-body'>
                        {displayData()}
                    </div>

                    <div className='modal-footer'>
                        <FooterButtonClose />
                        <div className='ms-auto'>
                            <button
                                className='btn btn-success btn-label'
                                onClick={()=>{setModalOpen(true)}}
                            >
                                {t("Add")}
                                <i className='fas fa-plus label-icon' />
                            </button>
                        </div>
                    </div>

                    <Modal isOpen={modalOpen}>
                        <ModalAddWifi
                            _crudName={_crudName}
                            elementSelected={elementSelected}
                            formName={"AddWifi"}
                            onPostAndGet={onPostAndGet}
                            setModalOpen={setModalOpen}
                            localStore={localStore}
                            t={t}
                        />
                    </Modal>
                </React.Fragment>
            )
        }


ModalWifi.propTypes = {
    _crudName: PropTypes.object,
    FooterButtonClose: PropTypes.func,
    HeaderButtonClose: PropTypes.func,
    formName: PropTypes.string,
    localStore: PropTypes.object,
    onPost: PropTypes.func,
    onDelete: PropTypes.func,
    onPostAndGet: PropTypes.func,
    setToastW: PropTypes.func,
    setState: PropTypes.func,
    t: PropTypes.func,
}

export default ModalWifi