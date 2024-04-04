import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import { OptionsButton, THeaderSorter } from 'components/tableElements';

const Table = ({_crudName, listToShow, setSorter, sorter, t}) => {

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
        <div className="grayScroll table-responsive" style={{maxHeight: "55vh", overflow: "auto"}}>
            <table className="table table-striped">
                <THeaderSorter
                  sorter={sorter}
                  setSorter={setSorter}
                  headerNames={[
                    {name: "Plataforma", arrow: true},
                    {name: "Nombre", arrow: true},
                    {name: "Fecha", arrow: true},
                    
                  ]}
                 />
                <tbody>
                    {listToShow?.length == 0 ?
                      <tr>
                        <td colSpan="5">
                          <h4 className="text-secondary">
                            {t("No " + _crudName.multiple + " found")}
                          </h4>
                        </td>
                      </tr> :
                    listToShow.map((listItem, idx)=>(
                        <tr key={_crudName.cod + "Item-" + idx}>
                            
                            <td>{listItem.platform}</td>
                            <td>{listItem.name || "- - -"}</td>
                            <td>{showDate(listItem.date)}</td>
                            
                            
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
    sorter: PropTypes.number,
    t: PropTypes.func
}

export default Table