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
                        {name: t("Code"), arrow: true},
                        {name: "Imei", arrow: true},
                        {name: t("State"), arrow: true},
                        {name: t("Modem brand"), arrow: true},
                        {name: t("Actions"), arrow: false}
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
                                                modalType: "Sim",
                                                elementSelected: listItem
                                            })
                                        }}
                                        >
                                        <i className="fas fa-sim-card"></i>
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
    listToShow: PropTypes.array,
    setSorterer: PropTypes.func,
    setState: PropTypes.func,
    sorterer: PropTypes.number,
    t: PropTypes.func
}

export default Table