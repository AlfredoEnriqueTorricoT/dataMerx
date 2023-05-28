import React from 'react'
import PropTypes from 'prop-types'
import { OptionsButton, MobileDataShow } from 'components/tableElements'

const TableMobile = ({_crudName, listToShow, setState, t}) => {
    return(
      <React.Fragment>
        {listToShow.length ?
        listToShow.map((listItem, idx)=>(
                <div className="row" key={_crudName.cod + "Item-" + idx}>
                  <div className="col-10">
                    <div className="row">
                      <MobileDataShow
                        title={t("Name")}
                        desc={listItem.name}
                      />
                      <MobileDataShow
                        title={t("Details")}
                        desc={listItem.detail || "- - -"}
                      />
                    </div>
                  </div>
                  <div className="col-2">
                    <OptionsButton
                        buttonsList={[
                          {
                            _label: "Editar",
                            onClick: ()=>{
                              setState({
                                  modalOpen: true,
                                  modalType: "Edit",
                                  elementSelected: listItem
                              })
                          }
                          }
                        ]}
                      />
                    {/* <center>
                    <button
                        className='btn btn-sm btn-primary mb-1'
                        onClick={()=>{
                            setState({
                                modalOpen: true,
                                modalType: "Edit",
                                elementSelected: listItem
                            })
                        }}
                        title='Editar marca de módem'
                        >
                        <i className="fas fa-edit"></i>
                    </button>
                    </center> */}
                  </div>
                  {
                    listToShow.length -1 > idx ?
                    <hr
                      style={{
                        marginTop: "5px",
                        border: "0",
                        clear:"both",
                        display:"block",
                        width: "96%",
                        backgroundColor:"#909090",
                        height: "1px"
                      }}
                    />
                    : ""
                  }
                </div>
        )) :
        <center>
          <h4 className="text-secondary my-5">{t("No " + _crudName.multple + " found")}</h4>
        </center>
        }
      </React.Fragment>
    )
}

TableMobile.propTypes = {
    _crudName: PropTypes.object,
    listToShow: PropTypes.array,
    setSorterer: PropTypes.func,
    setState: PropTypes.func,
    sorterer: PropTypes.number,
    t: PropTypes.func
}

export default TableMobile