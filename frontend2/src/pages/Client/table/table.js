import React from 'react'
import PropTypes from 'prop-types'

import { THeaderSorter } from 'components/tableElements';

const Table = ({_crudName, onGet, listToShow, setSorter, setState, sorter, t}) => {

    return(
            <div className="grayScroll table-responsive" style={{maxHeight: "55vh", overflow: "auto"}}>
                <table className="table table-striped">
                    <THeaderSorter
                      sorter={sorter}
                      setSorter={setSorter}
                      headerNames={[
                        {name: "Nombre", arrow: true},
                        {name: "C. I:", arrow: true},
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
                                <td>{listItem.fullName}</td>
                                <td>{listItem.ci}</td>
                                <td>
                                <button
                                        className="btn btn-sm me-1"
                                        // onClick={()=>{
                                        //     onGet({saveAs: "carDetails", url: "car/details/" + listItem.id})
                                        //     setState({
                                        //         modalOpen: true,
                                        //         modalType: "Details"
                                        //     })
                                        // }}
                                        title='Ver detalles'
                                    >
                                        <i className="fas fa-eye text-info"></i>
                                    </button>
                                    {/* <button 
                                        className='btn btn-sm btn-primary me-1'
                                        onClick={()=>{
                                            setState({
                                                modalOpen: true,
                                                modalType: "Edit",
                                                elementSelected: listItem
                                            })
                                        }}
                                        title='Editar vehículo'
                                        >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button 
                                        className='btn btn-sm btn-secondary me-1'
                                        onClick={()=>{
                                            setState({
                                                modalOpen: true,
                                                modalType: "Modem",
                                                elementSelected: listItem
                                            })
                                        }}
                                        title='Módem del vehículo'
                                        >
                                        <i className="fas fa-digital-tachograph"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-info me-1"
                                        onClick={()=>{
                                            onGet({saveAs: "eventList", url: "event/car/" + listItem.id})
                                            setState({
                                                modalType: "Events",
                                                modalOpen: true,
                                                modalSize: "lg",
                                                elementSelected: listItem
                                                // tableMode: "events",
                                            })
                                        }}
                                        title='Ver eventos'
                                    >
                                        <i className="fas fa-eye"></i>
                                    </button>
                                    <button 
                                        className='btn btn-sm btn-primary'
                                        onClick={()=>{
                                            setState({
                                                modalOpen: true,
                                                modalType: "Add event to",
                                                elementSelected: listItem
                                            })
                                        }}
                                        title='Añadir evento'
                                    >
                                        <i className="fas fa-tasks"></i>
                                    </button> */}
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