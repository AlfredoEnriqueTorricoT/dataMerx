import React from 'react'
import PropTypes from 'prop-types'

import { DropdownButton, OptionsButton } from 'components/tableElements';

const Table = ({_crudName, onGet, listToShow, setSorter, setState, sorter, t}) => {

  const detailsButton = (data) => {
    onGet({saveAs: "simDetails", url: "sim/details/" + data.id})
    setState({
        modalOpen: true,
        modalType: "Details"
    })
  }

  const eventsButton = (data) => {
    onGet({saveAs: "eventList", url: "event/sim/" + data.id})
    setState({
      modalOpen: true,
      modalType: "Events",
      modalSize: "lg",
      elementSelected: data
    })
  }

  const showStatus = (status) => (
    <span
      className={`badge font-size-11 rounded-pill badge-soft-${
        status ? "success" : "dark"
      } text-uppercase`}
    >
      {status ? "ACTIVO" : "INACTIVO"}
    </span>
  )

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
            <div className="grayScroll table-responsive" style={{height: "52vh", overflow: "auto"}}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>{showHeader(t("Number"), 1)}</th>
                            <th>{showHeader(t("Imei"), 2)}</th>
                            <th>{showHeader("Estado", 3)}</th>
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
                                <td>{mBrand.imei}</td>
                                <td>{showStatus(mBrand.active)}</td>
                                <td>
                                  <div className="btn-group">
                                    <button
                                      className="btn button-sm py-0"
                                      title='Ver detalles'
                                      onClick={()=>detailsButton(mBrand)}  
                                    >
                                      <i className="fas fa-eye"></i>
                                    </button>
                                    <button
                                      className="btn button-sm mx-2 py-0"
                                      title="Ver eventos"
                                      onClick={()=>eventsButton(mBrand)}
                                      >
                                      <i className="fas fa-tasks"></i>
                                    </button>
                                    <DropdownButton
                                      className="btn button-sm py-0"
                                      title={<i className="mdi mdi-dots-horizontal font-size-18" />}
                                      buttons={[
                                        {title: "Editar sim",
                                        onClick: ()=>setState({
                                          modalOpen: true,
                                          modalType: "Edit",
                                          modalSize: "md",
                                          elementSelected: mBrand
                                        })},
                                        {title: (mBrand.active ? "Desactivar" : "Activar") + " sim",
                                        onClick: ()=>setState({
                                          modalOpen: true,
                                          modalType: "ChangeStatus",
                                          modalSize: "md",
                                          elementSelected: mBrand
                                        })},
                                        {title: "Añadir evento",
                                        onClick: ()=>setState({
                                          modalOpen: true,
                                          modalSize: "md",
                                          modalType: "Add event to",
                                          elementSelected: mBrand
                                        })},
                                        {title: "Añadir imágenes",
                                        onClick: ()=>setState({
                                          modalOpen: true,
                                          modalSize: "md",
                                          modalType: "Add images",
                                          elementSelected: mBrand
                                        })},
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
    onGet: PropTypes.func,
    listToShow: PropTypes.array,
    setSorterer: PropTypes.func,
    setState: PropTypes.func,
    sorterer: PropTypes.number,
    t: PropTypes.func
}

export default Table