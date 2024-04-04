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
                        {name: "Cantidad", arrow: true},
                        
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
                                <td>{listItem.count || "- - -"}</td>
                                
                                
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