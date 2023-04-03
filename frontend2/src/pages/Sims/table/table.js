import React from 'react'
import PropTypes from 'prop-types'

const Table = ({_crudName, onGet, listToShow, setSorter, setState, sorter, t}) => {

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
                                      className="btn btn-sm btn-info mx-2"
                                      onClick={()=>{
                                          onGet({saveAs: "simDetails", url: "sim/details/" + mBrand.id})
                                          setState({
                                              modalOpen: true,
                                              modalType: "Details"
                                          })
                                      }}
                                      title='Ver detalles'
                                    >
                                        <i className="fas fa-eye"></i>
                                    </button>
                                    <button 
                                        className='btn btn-sm btn-primary'
                                        onClick={()=>{
                                            setState({
                                                modalOpen: true,
                                                modalType: "Edit",
                                                elementSelected: mBrand
                                            })
                                        }}
                                        title='Editar sim'
                                      >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                      className="btn btn-sm btn-info mx-2"
                                      onClick={()=>{
                                          onGet({saveAs: "eventList", url: "event/sim/" + mBrand.id})
                                          setState({
                                            modalOpen: true,
                                            modalType: "Events",
                                            modalSize: "lg",
                                            elementSelected: mBrand
                                            // tableMode: "events",
                                          })
                                      }}
                                      title='Ver eventos'
                                    >
                                        <i className="fas fa-eye"></i>
                                    </button>
                                    <button
                                      className="btn btn-sm btn-primary"
                                      onClick={()=>{
                                        setState({
                                          modalOpen: true,
                                          modalType: "Add event to",
                                          elementSelected: mBrand
                                        })
                                      }}
                                      title='Añadir evento'
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
    onGet: PropTypes.func,
    listToShow: PropTypes.array,
    setSorterer: PropTypes.func,
    setState: PropTypes.func,
    sorterer: PropTypes.number,
    t: PropTypes.func
}

export default Table