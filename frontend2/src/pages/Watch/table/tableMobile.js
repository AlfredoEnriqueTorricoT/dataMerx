import React from 'react'
import PropTypes from 'prop-types'
import { DropdownButton, EmptyData } from 'components/tableElements'

const TableMobile = ({_crudName, onGet, listToShow, setState, t}) => {

  const MobileDataShow = ({title, desc}) => {
    return(
      <div className="row mb-1">
        <div className="col-5"><b>{title}</b></div>
        <div className="col-7">{desc}</div>
      </div>
    )
  }

  const editWatch = data => {
    setState({
      modalOpen: true,
      modalType: "Edit",
      modalSize: "md",
      elementSelected: data
    })
  }

  const configWatch = data => {
    setState({
      modalOpen: true,
      modalType: "Settings",
      modalSize: "md",
      elementSelected: data
    })
  }

  const deleteWatch = data => {
    setState({
      modalOpen: true,
      modalType: "Delete",
      modalSize: "md",
      elementSelected: data
    })
  }

    return(
      <React.Fragment>
        {listToShow.length ?
        listToShow.map((listItem, idx)=>(
                <div className="row" key={_crudName.cod + "Item-" + idx}>
                  <div className="col-8">
                    <div className="row">
                      <MobileDataShow
                        title="Imei"
                        desc={listItem.imei}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="btn-group">
                      <button
                        className="btn button-sm py-0"
                        title='Editar reloj'
                        onClick={()=>editWatch(listItem)}  
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn button-sm py-0"
                        title='Configurar reloj'
                        onClick={()=>configWatch(listItem)}  
                      >
                        <i className="fas fa-wrench"></i>
                      </button>
                      <button
                        className="btn button-sm py-0"
                        title='Eliminar reloj'
                        onClick={()=>deleteWatch(listItem)}  
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
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
    onGet: PropTypes.func,
    listToShow: PropTypes.array,
    setSorterer: PropTypes.func,
    setState: PropTypes.func,
    sorterer: PropTypes.number,
    t: PropTypes.func
}

export default TableMobile