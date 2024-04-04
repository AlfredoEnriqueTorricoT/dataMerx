import React from 'react'
import PropTypes from 'prop-types'
import { OptionsButton, MobileDataShow } from 'components/tableElements'

const TableMobile = ({_crudName, listToShow, onGet, setState, t}) => {
  
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

  const showDate = date => {
    if (date == "")
      return "- - -"
    else {
      let _date = new Date(date)

      let _day = _date.getDate()
      let _month = meses[_date.getMonth()]
      let _year = _date.getFullYear()
      let _hour = _date.getHours()
      let _minutes = _date.getMinutes()
      let _seconds = _date.getSeconds()

      return (_day + " " + _month + " " + _year + "   " + _hour + ":" + _minutes + ":" + _seconds)
    }
  }

    return(
      <React.Fragment>
        {listToShow.length ?
        listToShow.map((listItem, idx)=>(
                <div className="row" key={_crudName.cod + "Item-" + idx}>
                  <div className="col-10">
                    <MobileDataShow
                      title="Plataforma"
                      desc={listItem.platform}
                    />
                    <MobileDataShow
                      title={t("Name")}
                      desc={listItem.name || "- - -"}
                    />
                    <MobileDataShow
                      title={"Fecha"}
                      desc={showDate(listItem.date)}
                    />
                  </div>
                  {/* <div className="col-2">
                    <button 
                        className='btn btn-sm'
                        onClick={()=>{
                            setState({
                                modalOpen: true,
                                modalType: "Edit",
                                elementSelected: listItem
                            })
                        }}
                        title='Editar plataforma'
                      >
                        <i className="fas fa-edit"></i>
                    </button>
                  </div> */}
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
    listToShow: PropTypes.object,
    onGet: PropTypes.func,
    setSorterer: PropTypes.func,
    setState: PropTypes.func,
    sorterer: PropTypes.number,
    t: PropTypes.func
}

export default TableMobile