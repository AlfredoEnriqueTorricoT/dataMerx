import React from 'react'
import PropTypes from 'prop-types'

import { DropdownButton, EmptyData, OptionsButton, THeaderSorter } from 'components/tableElements';

const Table = ({_crudName, onGet, listToShow, setSorter, setState, sorter, t}) => {

    const detailsButton = (data) => {
        onGet({saveAs: "carDetails", url: "car/details/" + data.id})
        setState({
            modalOpen: true,
            modalType: "Details"
        })
    }

    const eventsButton = data => {
        onGet({saveAs: "eventList", url: "event/car/" + data.id})
        setState({
            modalType: "Events",
            modalOpen: true,
            modalSize: "lg",
            elementSelected: data
        })
    }

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
                        {name: "Módem id", arrow: true},
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
                                <td>{listItem.modem_id || <EmptyData />}</td>
                                <td>
                                    <div className="btn-group">
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
                                                title: "Editar vehículo",
                                                onClick: ()=>{
                                                    setState({
                                                        modalOpen: true,
                                                        modalType: "Edit",
                                                        elementSelected: listItem
                                                    })
                                                }
                                            },
                                            {
                                                title: "Vincular módem",
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
                                                title: "Añadir evento",
                                                onClick: ()=>{
                                                    setState({
                                                        modalOpen: true,
                                                        modalType: "Add event to",
                                                        elementSelected: listItem
                                                    })
                                                }
                                            },
                                            {
                                                title: "Añadir imágenes",
                                                onClick: ()=>{
                                                    setState({
                                                        modalType: "Add images",
                                                        modalOpen: true,
                                                        modalSize: "md",
                                                        elementSelected: listItem
                                                    })
                                                }
                                            },
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
    listToShow: PropTypes.object,
    onGet: PropTypes.func,
    setSorterer: PropTypes.func,
    setState: PropTypes.func,
    sorterer: PropTypes.number,
    t: PropTypes.func
}

export default Table