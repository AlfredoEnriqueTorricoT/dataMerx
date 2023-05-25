import React from 'react'
import PropTypes from 'prop-types'

import { OptionsButton, THeaderSorter } from 'components/tableElements';

const Table = ({_crudName, listToShow, onGet, setSorter, setState, sorter, t}) => {
    return(
            <div className="grayScroll table-responsive" style={{maxHeight: "55vh", overflow: "auto"}}>
                <table className="table table-striped">
                    <THeaderSorter
                      sorter={sorter}
                      setSorter={setSorter}
                      headerNames={[
                        {name: "Código", arrow: true},
                        {name: "Imei", arrow: true},
                        {name: "Estado", arrow: true},
                        {name: "Marca de módem", arrow: true},
                        {name: "Número", arrow: true},
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
                            <tr key={_crudName.cod + "Item-" + idx}>
                                <td>{listItem.code}</td>
                                <td>{listItem.imei}</td>
                                <td>
                                <span
                                  className={`badge font-size-11 rounded-pill badge-soft-${
                                    listItem.active[0] == "a" ? "primary" : "dark"
                                  } text-uppercase`}
                                >
                                  {listItem.active}
                                </span>
                                </td>
                                <td>{listItem.mBrand_name}</td>
                                <td>{listItem.sim_number || "- - -"}</td>
                                <td>
                                    <OptionsButton
                                        buttonsList={[
                                            {
                                                _label: "Ver detalles",
                                                onClick: ()=>{
                                                    onGet({saveAs: "modemDetails", url: "modem/details/" + listItem.id})
                                                    setState({
                                                        modalOpen: true,
                                                        modalType: "Details"
                                                    })
                                                }
                                            },
                                            {
                                                _label: "Editar módem",
                                                onClick: ()=>{
                                                    setState({
                                                        modalOpen: true,
                                                        modalType: "Edit",
                                                        elementSelected: listItem
                                                    })
                                                }
                                            },
                                            {
                                                _label: "Tarjeta sim",
                                                onClick: ()=>{
                                                    setState({
                                                        modalOpen: true,
                                                        modalType: "Sim",
                                                        elementSelected: listItem
                                                    })
                                                }
                                            },
                                            {
                                                _label: "Ver eventos",
                                                onClick: ()=>{
                                                    onGet({saveAs: "eventList", url: "event/modem/" + listItem.id})
                                                    setState({
                                                        modalOpen: true,
                                                        modalType: "Events",
                                                        modalSize: "lg",
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
    listToShow: PropTypes.array,
    onGet: PropTypes.func,
    setSorterer: PropTypes.func,
    setState: PropTypes.func,
    sorterer: PropTypes.number,
    t: PropTypes.func
}

export default Table