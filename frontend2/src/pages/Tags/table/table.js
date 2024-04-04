import React from 'react'
import PropTypes from 'prop-types'

import { DropdownButton, EmptyData, THeaderSorter } from 'components/tableElements';

const Table = ({ _crudName, listToShow, onGet, setSorter, setState, sorter, t }) => {

  const editWatch = data => {
    setState({
      modalOpen: true,
      modalType: "Edit",
      modalSize: "md",
      elementSelected: data
    })
  }



  const formatDate = (stringDate) => {
    let date = new Date(stringDate);
    return date.getFullYear() + '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
      ('0' + date.getDate()).slice(-2) + ' ' +
      ('0' + date.getHours()).slice(-2) + ':' +
      ('0' + date.getMinutes()).slice(-2);


  }

  return (
    <div className="grayScroll table-responsive" style={{ height: "52vh", overflow: "auto" }}>

      <table className="table table-striped">
        <THeaderSorter
          sorter={sorter}
          setSorter={setSorter}
          headerNames={[
            { name: "Nombre", arrow: true },
            { name: "Detalle", arrow: true },
            { name: "Creación", arrow: true },

            { name: "Acciones", arrow: false }
          ]}
        />
        <tbody>

          {listToShow?.length == 0 ?
            <tr>
              <td colSpan="6">
                <h4 className="text-secondary">
                  {t("No " + _crudName.multiple + " found")}
                </h4>
              </td>
            </tr> :
            listToShow?.map((listItem, idx) => (
              <tr key={_crudName.cod + "Item-" + idx}>
                <td>{listItem.name}</td>
                <td>{listItem.detail}</td>
                <td>{formatDate(listItem.created_at)}</td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn button-sm py-0"
                      title='Editar reloj'
                      onClick={() => editWatch(listItem)}
                    >
                      <i className="fas fa-user"></i>
                    </button>
                   
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
  listToShow: PropTypes.array,
  onGet: PropTypes.func,
  setSorterer: PropTypes.func,
  setState: PropTypes.func,
  sorterer: PropTypes.number,
  t: PropTypes.func
}

export default Table