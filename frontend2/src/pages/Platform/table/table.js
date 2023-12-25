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
                        {name: "Nombre", arrow: true},
                        {name: "Detalles", arrow: true},
                        {name: "Página web", arrow: true},
                        {name: "Email", arrow: true},
                        {name: "Editar", arrow: false}
                      ]}
                     />
                    <tbody>
                        {listToShow.length == 0 ?
                          <tr>
                            <td colSpan="5">
                              <h4 className="text-secondary">
                                {t("No " + _crudName.multiple + " found")}
                              </h4>
                            </td>
                          </tr> :
                        listToShow.map((listItem, idx)=>(
                            <tr key={_crudName.cod + "Item-" + idx}>
                                <td>{listItem.name}</td>
                                <td>{listItem.detail || "- - -"}</td>
                                <td>{listItem.url}</td>
                                <td>{listItem.email}</td>
                                <td>
                                    <button 
                                        className='btn btn-sm'
                                        onClick={()=>{
                                            setState({
                                                modalOpen: true,
                                                modalType: "Edit",
                                                elementSelected: listItem
                                            })
                                        }}
                                        title='Editar plataforma'
                                      >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button 
                                        className='btn btn-sm'
                                        onClick={()=>{
                                          onGet({url: "wifi/" + listItem.id, saveAs: "wifiList"})
                                            setState({
                                                modalOpen: true,
                                                modalType: "Wifi",
                                                elementSelected: listItem
                                            })
                                        }}
                                        title='Ver redes wi-fi'
                                      >
                                        <i className="fas fa-wifi"></i>
                                    </button>
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