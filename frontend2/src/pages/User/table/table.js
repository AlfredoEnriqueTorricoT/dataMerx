import React from 'react'
import PropTypes from 'prop-types'

import { OptionsButton } from 'components/tableElements';

const Table = ({_crudName, listToShow, onGet, setSorter, setState, sorter, t}) => {

    const showHeader = (name, id) => {
          return (
            <React.Fragment>
              <b
                onClick={() => {
                  setSorter(id);
                }}
                style={{ cursor: "pointer" }}
              >
                {name}
              </b>
              {Math.abs(sorter) === id && (
                <i
                  className={`fa fa-caret-${sorter < 0 ? "up" : "down"} mx-2`}
                  onClick={() => {
                    setSorter(id);
                  }}
                  style={{ cursor: "pointer" }}
                />
              )}
            </React.Fragment>
          );
      };

    return(
            <div className="grayScroll table-responsive" style={{maxHeight: "55vh", overflow: "auto"}}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>{showHeader(t("Name"), 1)}</th>
                            <th>{showHeader("Email", 2)}</th>
                            <th><b>Editar</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listToShow.length == 0 ?
                          <tr>
                            <td colSpan="3">
                              <h4 className="text-secondary">
                                {t("No " + _crudName.multiple + " found")}
                              </h4>
                            </td>
                          </tr> :
                        listToShow.map((mBrand, idx)=>(
                            <tr key={"mBrandItem-" + idx}>
                                <td>{mBrand.name}</td>
                                <td>{mBrand.email}</td>
                                <td>
                                    <button 
                                        className='btn btn-sm'
                                        onClick={()=>{
                                            setState({
                                                modalOpen: true,
                                                modalType: "Edit",
                                                elementSelected: mBrand
                                            })
                                        }}
                                        title='Editar usuario'
                                      >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button 
                                        className='btn btn-sm'
                                        onClick={()=>{
                                            onGet({
                                              saveAs: "permissionsList",
                                              url: "user-permission/" + mBrand.id
                                            })
                                            setState({
                                                modalOpen: true,
                                                modalType: "Permission",
                                                elementSelected: mBrand
                                            })
                                        }}
                                        title='Permisos de usuario'
                                      >
                                        <i className="fas fa-tasks"></i>
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