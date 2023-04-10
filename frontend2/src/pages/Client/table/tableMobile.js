import React from 'react'
import PropTypes from 'prop-types'

const TableMobile = ({_crudName, listToShow, onGet, setState, t}) => {
    return(
      <React.Fragment>
        {listToShow.length ?
        listToShow.map((listItem, idx)=>(
            // <div className="card" key={_crudName.cod + "Item-" + idx}>
            //   <div className="card-body">
                <div className="row" key={_crudName.cod + "Item-" + idx}>
                  <div className="col-10">
                    <div className="row">
                      <div className="col-4">
                        <b>Nombre</b><br />
                        <b>C. I.</b><br />
                      </div>
                      <div className="col-8">
                        {listItem.fullName}<br />
                        {listItem.ci}<br />
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <center>
                    <button
                                        className="btn btn-sm mb-1"
                                        // onClick={()=>{
                                        //     onGet({saveAs: "carDetails", url: "car/details/" + listItem.id})
                                        //     setState({
                                        //         modalOpen: true,
                                        //         modalType: "Details"
                                        //     })
                                        // }}
                                        title='Ver detalles'
                                    >
                                        <i className="fas fa-eye text-info"></i>
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
        )) :
        <center>
          <h4 className="text-secondary my-5">{t("No cars found")}</h4>
        </center>}
      </React.Fragment>
    )
}

TableMobile.propTypes = {
    _crudName: PropTypes.object,
    onGet: PropTypes.func,
    listToShow: PropTypes.object,
    setSorterer: PropTypes.func,
    setState: PropTypes.func,
    sorterer: PropTypes.number,
    t: PropTypes.func
}

export default TableMobile