import React from 'react'
import PropTypes from 'prop-types'

import { EmptyData, OptionsButton, THeaderSorter } from 'components/tableElements';

const Table = ({_crudName, onGet, listToShow, setSorter, setState, sorter, t}) => {
    return(
            <div className="grayScroll table-responsive" style={{height: "52vh", overflow: "auto"}}>
                <table className="table table-striped">
                    <THeaderSorter
                      sorter={sorter}
                      setSorter={setSorter}
                      headerNames={[
                        {name: t("License plate"), arrow: true},
                        {name: t("Mark"), arrow: true},
                        {name: t("Model"), arrow: true},
                        {name: t("Name"), arrow: true},
                        {name: t("Modem"), arrow: true},
                        {name: t("Actions"), arrow: false}
                      ]}
                     />
                    <tbody>
                        {listToShow.length == 0 ?
                          <tr>
                            <td colSpan="7">
                              <h4 className="text-secondary">
                                {t("No " + _crudName.multiple + " found")}
                              </h4>
                            </td>
                          </tr> :
                        listToShow.map((listItem, idx)=>(
                            <tr key={_crudName.cod + "Item-" + idx}>
                                <td>{listItem.placa}</td>
                                <td>{listItem.mark}</td>
                                <td>{listItem.model}</td>
                                <td>{listItem.name || <EmptyData />}</td>
                                <td>{listItem.modem_code || <EmptyData />}</td>
                                <td>
                                <OptionsButton
                                    buttonsList={[
                                        {
                                            _label: "Ver detalles",
                                            onClick: ()=>{
                                                onGet({saveAs: "carDetails", url: "car/details/" + listItem.id})
                                                setState({
                                                    modalOpen: true,
                                                    modalType: "Details"
                                                })
                                            }
                                        },
                                        {
                                            _label: "Editar vehículo",
                                            onClick: ()=>{
                                                setState({
                                                    modalOpen: true,
                                                    modalType: "Edit",
                                                    elementSelected: listItem
                                                })
                                            }
                                        },
                                        {
                                            _label: "Vincular módem",
                                            onClick: ()=>{
                                                onGet({saveAs: "carDetails", url: "car/details/" + listItem.id})
                                                setState({
                                                    modalOpen: true,
                                                    modalType: "Modem",
                                                    elementSelected: listItem
                                                })
                                            }
                                        },
                                        {
                                            _label: "Añadir evento",
                                            onClick: ()=>{
                                                setState({
                                                    modalOpen: true,
                                                    modalType: "Add event to",
                                                    elementSelected: listItem
                                                })
                                            }
                                        },
                                        {
                                            _label: "Ver eventos",
                                            onClick: ()=>{
                                                onGet({saveAs: "eventList", url: "event/car/" + listItem.id})
                                                setState({
                                                    modalType: "Events",
                                                    modalOpen: true,
                                                    modalSize: "lg",
                                                    elementSelected: listItem
                                                })
                                            }
                                        }
                                    ]}
                                />
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
    listToShow: PropTypes.object,
    onGet: PropTypes.func,
    setSorterer: PropTypes.func,
    setState: PropTypes.func,
    sorterer: PropTypes.number,
    t: PropTypes.func
}

export default Table