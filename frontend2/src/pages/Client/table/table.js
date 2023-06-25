import React from 'react'
import PropTypes from 'prop-types'

import { OptionsButton, THeaderSorter } from 'components/tableElements';

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
                        {name: "Ver vehículos", arrow: false}
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
                                        className="btn btm-sm"
                                        onClick={()=>{
                                            setState({
                                                elementSelected: {
                                                    id: listItem.id,
                                                    cars: listItem.cars
                                                },
                                                modalOpen: true,
                                                modalType: "Vehículos del",
                                                modalSize: "xl"
                                            })
                                        }}
                                        title="Ver vehículos del cliente"
                                        >
                                        <i className="fas fa-car"></i>
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