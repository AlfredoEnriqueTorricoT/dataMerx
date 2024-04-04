import React, {useEffect, useState} from 'react'
import PropTypes, { array } from 'prop-types'

import { OptionsButton, THeaderSorter } from 'components/tableElements';

const Table = ({_crudName, listToShow, setSorter, sorter, t, state, setState, onPost, filter}) => {

  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  const confirmRequest = data => {
    setState({
        elementSelected: data,
        modalOpen: true,
        modalSize: "md",
        modalType: "TransferRequest"
    })
  }

  const getDevices = platform_id => {
    onPost({
      url: "siguelo/getImeiByDate",
      payload: {fecha: filter, platform_id: platform_id},
      saveAs: "reportDeviceSigueloListByPlatform"
    })
    //setTableStatus(2)
  }

  const openModel = (namePlatform, platform_id) => {

    getDevices(platform_id);
    setState({
      ...state,
      modalOpen: true,
      name: namePlatform,
    });
  }

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
                    {name: "Conteo", arrow: true},
                    {name: "Accion", arrow: false},
                    
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
                            <td>{listItem.count}</td>

                            <td>
                              <button
                                className="btn button-sm py-0"
                                title='Detalles'
                                onClick={ ()=> openModel(listItem.platform, listItem.id) }>
                                  
                                  <i className="fas fa-eye"></i>
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
    listToShow: PropTypes.object,
    setSorterer: PropTypes.func,
    sorter: PropTypes.number,
    t: PropTypes.func
}

export default Table