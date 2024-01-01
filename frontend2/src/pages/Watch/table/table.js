import React from 'react'
import PropTypes from 'prop-types'

import { DropdownButton, EmptyData, THeaderSorter } from 'components/tableElements';

const Table = ({_crudName, listToShow, onGet, setSorter, setState, sorter, t}) => {

    const editWatch = data => {
      setState({
        modalOpen: true,
        modalType: "Edit",
        modalSize: "md",
        elementSelected: data
      })
    }

    const configWatch = data => {
      setState({
        modalOpen: true,
        modalType: "Settings",
        modalSize: "md",
        elementSelected: data
      })
    }

    const deleteWatch = data => {
      setState({
        modalOpen: true,
        modalType: "Delete",
        modalSize: "md",
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
                        {name: "Código", arrow: true},
                        {name: "Imei", arrow: true},
                        {name: "Nombre", arrow: true},
                        {name: "Device id", arrow: true},
                        {name: "Plataforma", arrow: true},
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
                                <td>{listItem.device_name || "- - -"}</td>
                                <td>{listItem.siguelo_device_id || "- - -"}</td>
                                <td>{listItem.platform_id || "- - -"}</td>
                                <td>
                                    <div className="btn-group">
                                    <button
                                      className="btn button-sm py-0"
                                      title='Editar reloj'
                                      onClick={()=>editWatch(listItem)}  
                                    >
                                      <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                      className="btn button-sm py-0"
                                      title='Configurar reloj'
                                      onClick={()=>configWatch(listItem)}  
                                    >
                                      <i className="fas fa-wrench"></i>
                                    </button>
                                    <button
                                      className="btn button-sm py-0"
                                      title='Eliminar reloj'
                                      onClick={()=>deleteWatch(listItem)}  
                                    >
                                      <i className="fas fa-trash-alt"></i>
                                    </button>
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