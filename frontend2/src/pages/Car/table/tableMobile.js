import React from 'react'
import PropTypes from 'prop-types'

const TableMobile = ({_crudName, listToShow, setState, t}) => {
    return(
      <React.Fragment>
        <hr />
        {listToShow.length ?
        listToShow.map((listItem, idx)=>(
            // <div className="card" key={_crudName.cod + "Item-" + idx}>
            //   <div className="card-body">
                <div className="row" key={_crudName.cod + "Item-" + idx}>
                  <div className="col-10">
                    <div className="row">
                      <div className="col-4">
                        <b>{t("Name")}</b><br />
                        <b>{t("Model")}</b><br />
                        <b>{t("Mark")}</b><br />
                        <b>{t("License plate")}</b><br />
                        <b>{t("Platform")}</b><br />
                        <b>{t("Modem")}</b><br />
                      </div>
                      <div className="col-8">
                        {listItem.name}<br />
                        {listItem.model}<br />
                        {listItem.mark}<br />
                        {listItem.placa}<br />
                        {listItem.platform_name || "- - -"}<br />
                        {listItem.modem_code || "- - -"}<br />
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <center>
                      <button
                          className='btn btn-sm btn-primary mb-3'
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
                      <button
                          className='btn btn-sm btn-secondary'
                          onClick={()=>{
                              setState({
                                  modalOpen: true,
                                  modalType: "Modem",
                                  elementSelected: listItem
                              })
                          }}
                          >
                          <i className="fas fa-digital-tachograph"></i>
                      </button>
                    </center>
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
            //   </div>
            // </div>
        )) :
        <center>
          <h4 className="text-secondary my-5">{t("No cars found")}</h4>
        </center>}
      </React.Fragment>
    )
}

TableMobile.propTypes = {
    _crudName: PropTypes.object,
    listToShow: PropTypes.object,
    setSorterer: PropTypes.func,
    setState: PropTypes.func,
    sorterer: PropTypes.number,
    t: PropTypes.func
}

export default TableMobile