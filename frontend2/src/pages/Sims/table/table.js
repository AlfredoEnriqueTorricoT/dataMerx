import React from 'react'
import PropTypes from 'prop-types'

import { OptionsButton } from 'components/tableElements';

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
            <div className="grayScroll table-responsive" style={{height: "52vh", overflow: "auto"}}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>{showHeader(t("Number"), 1)}</th>
                            <th>{showHeader(t("Imei"), 2)}</th>
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
                                <td>
                                  <OptionsButton
                                    buttonsList={[
                                      {_label: "Ver detalles",
                                      onClick: ()=>{
                                        onGet({saveAs: "simDetails", url: "sim/details/" + mBrand.id})
                                        setState({
                                            modalOpen: true,
                                            modalType: "Details"
                                        })
                                      }},
                                      {_label: "Editar sim",
                                      onClick: ()=>{
                                        setState({
                                            modalOpen: true,
                                            modalType: "Edit",
                                            modalSize: "md",
                                            elementSelected: mBrand
                                        })
                                      }},
                                      {_label: "Añadir evento",
                                      onClick: ()=>{
                                        setState({
                                          modalOpen: true,
                                          modalSize: "md",
                                          modalType: "Add event to",
                                          elementSelected: mBrand
                                        })
                                      }},
                                      {_label: "Añadir imágenes",
                                      onClick: ()=>{
                                        setState({
                                          modalOpen: true,
                                          modalSize: "md",
                                          modalType: "Add images",
                                          elementSelected: mBrand
                                        })
                                      }},
                                      {_label: "Ver eventos",
                                      onClick: ()=>{
                                        onGet({saveAs: "eventList", url: "event/sim/" + mBrand.id})
                                        setState({
                                          modalOpen: true,
                                          modalType: "Events",
                                          modalSize: "lg",
                                          elementSelected: mBrand
                                        })
                                      }}
                                    ]}
                                  />
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