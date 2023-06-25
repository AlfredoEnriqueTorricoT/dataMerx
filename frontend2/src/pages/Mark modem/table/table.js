import React from 'react'
import PropTypes from 'prop-types'
import { OptionsButton } from 'components/tableElements';

const Table = ({_crudName, listToShow, setSorter, setState, sorter, t}) => {

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
                            <th>{showHeader(t("Detail"), 2)}</th>
                            <th><b>{"Editar"}</b></th>
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
                                <td>{mBrand.detail || "- - -"}</td>
                                <td>
                                  <button
                                    className="btn btn-sm"
                                    onClick={()=>setState({
                                      modalOpen: true,
                                      modalType: "Edit",
                                      elementSelected: mBrand
                                  })}
                                  title="Editar marca de módem"
                                  >
                                    <i className="fas fa-edit"></i>
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