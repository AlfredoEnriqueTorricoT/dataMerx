import React from 'react'
import PropTypes from 'prop-types'

import { THeaderSorter } from 'components/tableElements';

const Table = ({_crudName, listToShow, setSorter, setState, sorter, t}) => {
    return(
            <div className="grayScroll table-responsive" style={{maxHeight: "55vh", overflow: "auto"}}>
                <table className="table table-striped">
                    <THeaderSorter
                      sorter={sorter}
                      setSorter={setSorter}
                      headerNames={[
                        {name: t("Name"), arrow: true},
                        {name: t("Model"), arrow: true},
                        {name: t("Mark"), arrow: true},
                        {name: t("License plate"), arrow: true},
                        {name: t("Platform"), arrow: true},
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
                                <td>{listItem.name}</td>
                                <td>{listItem.model}</td>
                                <td>{listItem.mark}</td>
                                <td>{listItem.placa}</td>
                                <td>{listItem.platform_name || "- - -"}</td>
                                <td>{listItem.modem_code || "- - -"}</td>
                                <td>
                                    <button 
                                        className='btn btn-sm btn-primary me-2'
                                        onClick={()=>{
                                            setState({
                                                modalOpen: true,
                                                modalType: "Edit",
                                                elementSelected: listItem
                                            })
                                        }}
                                        >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button 
                                        className='btn btn-sm btn-secondary'
                                        onClick={()=>{
                                            setState({
                                                modalOpen: true,
                                                modalType: "Modem",
                                                elementSelected: listItem
                                            })
                                        }}
                                        >
                                        <i className="fas fa-digital-tachograph"></i>
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
    setSorterer: PropTypes.func,
    setState: PropTypes.func,
    sorterer: PropTypes.number,
    t: PropTypes.func
}

export default Table