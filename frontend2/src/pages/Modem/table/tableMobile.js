import React from 'react'
import PropTypes from 'prop-types'

const TableMobile = ({_crudName, listToShow, setState, t}) => {
    return(
      <React.Fragment>
        {listToShow.map((listItem, idx)=>(
            <div className="card" key={_crudName.cod + "Item-" + idx}>
              <div className="card-body">
                <div className="row">
                  <div className="col-10">
                    <div className="row">
                      <div className="col-4">
                        <b>{t("Name")}</b><br />
                        <b>{t("Detail")}</b><br />
                        <b>{t("Page web")}</b><br />
                        <b>{"Email"}</b><br />
                      </div>
                      <div className="col-8">
                        <b>{listItem.name}</b><br />
                        <b>{listItem.detail || "- - -"}</b><br />
                        <b>{listItem.url}</b><br />
                        <b>{listItem.email}</b><br />
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <button
                        className='btn btn-sm btn-primary'
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
                  </div>
                </div>
              </div>
            </div>
        ))}
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