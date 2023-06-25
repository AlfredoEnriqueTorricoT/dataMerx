import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import { SpinnerL } from 'components/components'
import { ErrorTable } from 'components/tableElements'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { MobileDataShow } from 'components/tableElements'

import {FormikInput} from "components/formElements"
import { showToast } from 'components/toast'

const ModalCar = ({_crudName, CancelModalButton, CloseModalButton, formName, localStore, onDelete, onGet, onPost, setToastW, state, t}) => {
    // const [clientImages, setClientImages] = useState({})
    const [placa, setPlaca] = useState("")
    const [modalStatus, setModalStatus] = useState(-1) // -1 init, 0 loading, 1 success, 2 error
    const [tWaiting, setTWaiting] = useState(false)

    const [linkedCarList, setLinkedCarList] = useState([])
    const [carSelectedId, setSelectedCarId] = useState(0)
  
    const genericId = _crudName.cod + "_" + formName + "_"

    useEffect(()=>{
      setLinkedCarList(state.elementSelected.cars || [])
    }, [])

    useEffect(()=>{
      if (modalStatus == 0 && localStore.status != "waiting response") {
        if (localStore.status == 200) setModalStatus(1)
        else setModalStatus(2)
      }

      if (tWaiting && localStore.status != "waiting response") {
        if (localStore.status >= 200 && localStore.status <= 205) {
          showToast({type: "success", message: `El vehículo ha sido ${tWaiting}do`})
          setTWaiting(false)
          if (carSelectedId != 0) updateLinkedCarList()
        }
        else if (localStore.status == 432) {
          showToast({type: "info", message: localStore.message})
          setTWaiting(false)
        }
        else {
          showToast({type: "warning", message: `No se ha podido ${tWaiting}r al vehículo (${localStore.status})`})
          setTWaiting(false)
        }
      }
    }, [localStore.status])

    const searchFunction = () => {
      onGet({saveAs: "carList", url: "car/for-assign/" + placa + "/" + state.elementSelected.id})
      setModalStatus(0)
    }

    const updateLinkedCarList = () => {
      const idObjetive = carSelectedId > 0 ? carSelectedId : (carSelectedId * -1)
      const carObjetive = localStore.carList.find(car => car.id == idObjetive)
      if (carSelectedId > 0) {
        setLinkedCarList([...linkedCarList, carObjetive])
      } else if ((carSelectedId < 0)) {
        let newLCL = linkedCarList.filter(car => car.id != idObjetive)
        setLinkedCarList(newLCL)
      }
      setSelectedCarId(0)
    }

    const addCar = id => {
      const fData = {
        client_id: state.elementSelected.id,
        car_id: id
      }
      onPost({
        payload: fData,
        saveAs: "UNUSED-DATA",
        url: "client-car"
      })
      setTWaiting("vincula")
      setSelectedCarId(id)
    }
    
    const quitCar = (id, cCar) => {
      onDelete({
        saveAs: "UNUSED-DATA",
        url: "client-car/" + cCar
      })
      setTWaiting("desvincula")
      setSelectedCarId(id * -1)
    }

    return(
      <React.Fragment>
        <div className="modal-header">
          <h4>Vehículos del cliente</h4>
          <CloseModalButton />
        </div>

        <div className="modal-body">
      <div className="row">
        <div className="col-6">
          <div className="row">
            <div className="col-6">
              <h4>Buscar vehículos</h4>
            </div>
            <div className="col-6">
              <div className="d-inline-block">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    min={0}
                    onChange={i => setPlaca(i.target.value)}
                    placeholder="Buscar por placa..."
                    value={placa}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      disabled={localStore.status == "waiting response" || placa == ""}
                      onClick={searchFunction}
                    >
                      {localStore.status == "waiting response" && placa != "" ?
                      <i className="bx bx-loader bx-spin"></i> :
                      <i className="fas fa-search"></i>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grayScroll table-responsive p-1" style={{maxHeight: "55vh", overflow: "auto"}}>
                <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Placa</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
          {modalStatus == -1 ?
            <tr>
              <td colSpan={5}>
                <h4 className="text-secondary my-3 py-5">Ingrese la placa del vehículo</h4>
              </td>
            </tr>
            : ""
          }
          {modalStatus == 0 ?
            <tr>
              <td colSpan={5}>
                <SpinnerL />
              </td>
            </tr>
             : ""
          }
          {modalStatus == 1 ?
              localStore.carList.length ?
                localStore.carList.map((car, idx) => (
                  <tr key={idx}>
                    <td>{car.name}</td>
                    <td>{car.placa}</td>
                    <td>{car.mark}</td>
                    <td>{car.model}</td>
                    <td>
                      {linkedCarList.some(coche => coche.id == car.id) ?
                      <button
                      className='btn py-0'
                      disabled={modalStatus != 1}
                      onClick={()=>quitCar(car.id, car.client_car)}
                      title='Desvincular vehículo'
                      >
                        <i className="fas fa-minus text-danger"></i>
                      </button>
                      :
                      <button
                        className='btn py-0'
                        disabled={modalStatus != 1}
                        onClick={()=>addCar(car.id)}
                        title='Vincular vehículo'
                        >
                        <i className="fas fa-plus text-success"></i>
                      </button>
                    }
                    </td>
                  </tr>
                ))
              : 
                  <tr>
                    <td colSpan={5}>
                      <h4 className="text-secondary my-3 py-5">
                        No hay vehículos que coincidan con su busqueda
                      </h4>
                    </td>
                  </tr>
            : ""
          }
          {modalStatus == 2 ?
            <tr>
              <td colSpan={5}>
                <ErrorTable cod={localStore.status} retryFunction={searchFunction}>
                  Reintentar
                </ErrorTable>
              </td>
            </tr>
             : ""
          }
                    </tbody>
                </table>
            </div>
        </div>
        <div className="col-6">
          <div className="row">
            <h4>Vehiculos vinculados</h4>
          </div>
          <div className="grayScroll table-responsive p-1" style={{maxHeight: "55vh", overflow: "auto"}}>
                <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Placa</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
          {
              linkedCarList.length ?
                linkedCarList.map((car, idx) => (
                  <tr key={idx}>
                    <td>{car.name}</td>
                    <td>{car.placa}</td>
                    <td>{car.mark}</td>
                    <td>{car.model}</td>
                    <td>
                      <button
                        className='btn py-0'
                        disabled={modalStatus == 0}
                        onClick={()=>quitCar(car.id, car.client_car)}
                        title='Desvincular vehículo'
                        >
                        <i className="fas fa-minus text-danger"></i>
                      </button>
                    </td>
                  </tr>
                ))
              : 
                  <tr>
                    <td colSpan={5}>
                      <h4 className="text-secondary my-3 py-5">
                        No hay vehículos vinculados al cliente
                      </h4>
                    </td>
                  </tr>
          }
                    </tbody>
                </table>
            </div>
        </div>
      </div>
      </div>

      <div className="modal-footer">
        <CancelModalButton />
        <div className="ms-auto">
        </div>
      </div>
      </React.Fragment>
    )
}

ModalCar.propTypes = {
    _crudName: PropTypes.object,
    CancelModalButton: PropTypes.any,
    CloseModalButton: PropTypes.any,
    formName: PropTypes.string,
    localStore: PropTypes.object,
    onDelete: PropTypes.func,
    onGet: PropTypes.func,
    onPost: PropTypes.func,
    setToastW: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func,
}

export default ModalCar