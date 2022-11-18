import React from 'react'
import PropTypes from 'prop-types'

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
                            <th>{showHeader(t("Number"), 1)}</th>
                            <th>{showHeader(t("Code"), 2)}</th>
                            <th>{showHeader(t("Imei"), 3)}</th>
                            <th><b>{t("Actions")}</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listToShow.length == 0 ?
                          <tr>
                            <td colSpan="4">
                              <h4 className="text-secondary">
                                {t("No " + _crudName.multiple + " found")}
                              </h4>
                            </td>
                          </tr> :
                        listToShow.map((mBrand, idx)=>(
                            <tr key={"mBrandItem-" + idx}>
                                <td>{mBrand.number}</td>
                                <td>{mBrand.code}</td>
                                <td>{mBrand.imei}</td>
                                <td>
                                    <button 
                                        className='btn btn-sm btn-primary'
                                        onClick={()=>{
                                            setState({
                                                modalOpen: true,
                                                modalType: "Edit",
                                                elementSelected: mBrand
                                            })
                                        }}
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