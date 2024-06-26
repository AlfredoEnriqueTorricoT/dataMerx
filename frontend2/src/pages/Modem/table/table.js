import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'react-avatar';

import { DropdownButton, EmptyData, THeaderSorter } from 'components/tableElements';

const Table = ({_crudName, listToShow, onGet, setSorter, setState, sorter, t}) => {

    const userId = JSON.parse(localStorage.getItem("authUser")).id
    const resAdmin = JSON.parse(localStorage.getItem("userPermission")).includes("responsability_admin")

    const confirmRequest = data => {
        setState({
            elementSelected: data,
            modalOpen: true,
            modalSize: "md",
            modalType: "TransferRequest"
        })
    }

    const createRequest = data => {
        setState({
            modalOpen: true,
            modalType: data.is_pending ? "CancelTransfer" : "Transfer",
            modalSize: "md",
            elementSelected: data
        })
    }

    const detailsButton = data => {
        onGet({saveAs: "modemDetails", url: "modem/details/" + data.id})
        setState({
            modalOpen: true,
            modalSize: "md",
            modalType: "Details"
        })
    }

    const eventsButton = data => {
        onGet({saveAs: "eventList", url: "event/modem/" + data.id})
        setState({
            modalOpen: true,
            modalType: "Events",
            modalSize: "lg",
            elementSelected: data
        })
    }

    const requestResponsabilityStyle = (id, idx) => {
        if (idx%2 == 0) {
            if (id == userId) 
                return ({background: "#C5E7E4"})
            else
                return ({background: "#F8F9FA"})
        } else {
            if (id == userId)
                return ({background: "#E4EFEE"})
            else
                return ({background: "#FFFFFF"})
        }
    }

    return(
            <div className="grayScroll table-responsive" style={{height: "52vh", overflow: "auto"}}>
                <table className="table">
                    <THeaderSorter
                      sorter={sorter}
                      setSorter={setSorter}
                      headerNames={[
                        {name: "Código", arrow: true},
                        {name: "Imei", arrow: true},
                        {name: "Marca de módem", arrow: true},
                        {name: "Plataforma", arrow: true},
                        {name: "Rsp.", arrow: true},
                        {name: "Estado", arrow: true},
                        {name: "Acciones", arrow: false}
                      ]}
                     />
                    <tbody>
                        {listToShow.length == 0 ?
                          <tr>
                            <td colSpan="6">
                              <h4 className="text-secondary">
                                {t("No " + _crudName.multiple + " found")}
                              </h4>
                            </td>
                          </tr> :
                        listToShow.map((listItem, idx)=>(
                            <tr
                                style={requestResponsabilityStyle(listItem.user_successor_id, idx)}
                                key={_crudName.cod + "Item-" + idx}
                            >
                                <td>{listItem.code}</td>
                                <td>{listItem.imei}</td>
                                <td>{listItem.mark_modem_name || <EmptyData />}</td>
                                <td>{listItem.platform_name || <EmptyData />}</td>
                                <td className='pt-2'>
                                    {listItem.responsability ?
                                        <Avatar
                                            name={listItem.responsability.name}
                                            size='30px'
                                            round
                                        />
                                    : "- - -"}
                                </td>
                                <td>
                                <span
                                  className={`badge font-size-11 rounded-pill badge-soft-${
                                    listItem.active[0] == "a" ? "success" : "dark"
                                  } text-uppercase`}
                                >
                                  {listItem.active}
                                </span>
                                </td>
                                <td>
                                    <div className="btn-group">
                                    {(listItem.user_responsability_id == userId) && listItem.is_pending ? <button
                                      className="btn btn-danger button-sm py-0"
                                      title='Anular transferencia'
                                      onClick={()=>setState({
                                        modalOpen: true,
                                        modalType: "CancelTransfer",
                                        modalSize: "md",
                                        elementSelected: listItem
                                    })} 
                                    >
                                      <i class="fas fa-backspace"></i>
                                    </button> : ""}
                                    {listItem.user_successor_id == userId ? <button
                                      className="btn btn-success button-sm py-0"
                                      title='Solicitud de transferencia pediente'
                                      onClick={()=>confirmRequest(listItem)} 
                                    >
                                      <i class="fas fa-exchange-alt"></i>
                                    </button> : ""}
                                    <button
                                      className="btn button-sm py-0"
                                      title='Ver detalles'
                                      onClick={()=>detailsButton(listItem)}  
                                    >
                                      <i className="fas fa-eye"></i>
                                    </button>
                                    <button
                                      className="btn button-sm mx-2 py-0"
                                      title="Ver eventos"
                                      onClick={()=>eventsButton(listItem)}
                                      >
                                      <i className="fas fa-tasks"></i>
                                    </button>
                                    <DropdownButton
                                      className="btn button-sm py-0"
                                      title={<i className="mdi mdi-dots-horizontal font-size-18" />}
                                      buttons={[
                                        {
                                            title: "Editar módem",
                                            onClick: ()=>{
                                                setState({
                                                    modalOpen: true,
                                                    modalType: "Edit",
                                                    modalSize: "md",
                                                    elementSelected: listItem
                                                })
                                            }
                                        },
                                        {
                                            title: "Tarjeta sim",
                                            onClick: ()=>{
                                                onGet({saveAs: "modemDetails", url: "modem/details/" + listItem.id})
                                                setState({
                                                    modalOpen: true,
                                                    modalType: "Sim",
                                                    modalSize: "md",
                                                    elementSelected: listItem
                                                })
                                            }
                                        },
                                        {
                                            title: (listItem.active == "activo" ? "Desactivar" : "Activar") + " módem",
                                            onClick: ()=>{
                                                onGet({saveAs: "modemDetails", url: "modem/details/" + listItem.id})
                                                setState({
                                                    modalOpen: true,
                                                    modalType: "ChangeStatus",
                                                    modalSize: "md",
                                                    elementSelected: listItem
                                                })
                                            }
                                        },
                                        {
                                            title: "Añadir evento",
                                            onClick: ()=>{
                                                setState({
                                                    modalOpen: true,
                                                    modalType: "Add event to",
                                                    modalSize: "md",
                                                    elementSelected: listItem
                                                })
                                            }
                                        },
                                        {
                                            title: "Añadir imágenes",
                                            onClick: ()=>{
                                                setState({
                                                    modalOpen: true,
                                                    modalType: "Add images",
                                                    modalSize: "md",
                                                    elementSelected: listItem
                                                })
                                            }
                                        },
                                        {
                                            title: listItem.is_pending ? "Anular transferencia" : "Transferir",
                                            hidden: listItem.user_responsability_id != userId && !( resAdmin && listItem.user_responsability_id == null),
                                            onClick: ()=>{
                                                setState({
                                                    modalOpen: true,
                                                    modalType: listItem.is_pending ? "CancelTransfer" : "Transfer",
                                                    modalSize: "md",
                                                    elementSelected: listItem
                                                })
                                            }
                                        }
                                      ]}
                                    />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    )
}

Table.propTypes = {
    _crudName: PropTypes.object,
    listToShow: PropTypes.array,
    onGet: PropTypes.func,
    setSorterer: PropTypes.func,
    setState: PropTypes.func,
    sorterer: PropTypes.number,
    t: PropTypes.func
}

export default Table