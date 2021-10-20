import React, { useState, useEffect } from "react"
import { showToast } from "components/Toast/toast"

import { ModalHeader, ModalBody, ModalFooter } from "reactstrap"

function AddDeviceModal(props) {
  const [devicesSearched, setDevicesSearched] = useState([])
  const [devicesSelected, setDevicesSelected] = useState(null)
  const [toastWaiting, setToastWaiting] = useState(false)

  useEffect(() => {
    if (addDevice) {
      setDevicesSearched(dispositivosDisponibles)
    } else {
      setDevicesSearched([
        { id: -500, imei: "Retirar dispositivo" },
        ...dispositivosDisponibles,
      ])
    }
  }, [])

  useEffect(() => {
    if (toastWaiting && !waitingResponse) {
      toastFunction()
      setToastWaiting(false)
    }
  })

  let {
    addDevice,
    carId,
    error,
    onGetDevices,
    onInsertDevice,
    onRemoveDevice,
    dispositivosDisponibles,
    deviceModalState,
    waitingResponse,
  } = props

  const insertDeviceFunc = e => {
    e.preventDefault()
    setToastWaiting(true)

    const data = {
      id: carId,
      deviceid: devicesSelected,
    }

    if (devicesSelected === -500) {
      onRemoveDevice(carId)
    } else {
      onInsertDevice(data)
    }
  }

  const searchFunc = data => {
    let obj = data.target.value

    if (obj === "" && !addDevice) {
      setDevicesSearched([
        { id: -500, imei: "Retirar dispositivo" },
        ...dispositivosDisponibles,
      ])
    } else {
      setDevicesSearched(
        dispositivosDisponibles.filter(
          dispositivo =>
            dispositivo.imei.includes(obj) ||
            dispositivo.code.includes(obj) ||
            dispositivo.markId.includes(obj) ||
            dispositivo.platformId.includes(obj)
        )
      )
    }
  }

  const toastFunction = () => {
    let texto = addDevice ? "enlaza" : "cambia"

    showToast({
      toastType: error ? "warning" : "success",
      title: error ? "Error" : "Éxito",
      message: error
        ? `No se ha podido ${texto}r el modem (${error.message})`
        : `El modem ha sido ${texto}do`,
    })

    if (!error && !waitingResponse) {
      onGetDevices()
      deviceModalState(false)
    }
  }

  return (
    <React.Fragment>
      <ModalHeader>Dispositivos disponibles</ModalHeader>
      <ModalBody>
        <React.Fragment>
          <form
            id="formAddDevice"
            onSubmit={insertDeviceFunc}
            className="app-search d-none d-lg-block"
          >
            <div className="position-relative">
              <input
                type="text"
                name="searchInput"
                onChange={searchFunc}
                className="form-control"
                placeholder="Search..."
              />
              <span className="bx bx-search-alt" />
            </div>
          </form>
          {devicesSearched.length === 0 ? (
            <center>
              <h5>No se han encontrado dispositivos disponibles</h5>
            </center>
          ) : (
            <table className="table align-middle table-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th className="align-middle">#</th>
                  <th className="align-middle">Imei</th>
                  <th className="align-middle">Código</th>
                  <th className="align-middle">Marca</th>
                  <th className="align-middle">Plataforma</th>
                  <th className="align-middle"></th>
                </tr>
              </thead>
              <tbody>
                {devicesSearched.map((dispositivo, idx) => (
                  <tr key={idx + 1}>
                    <td>{dispositivo.id === -500 ? "" : idx + 1}</td>
                    <td>{dispositivo.imei}</td>
                    <td>{dispositivo.code}</td>
                    <td>{dispositivo.markId}</td>
                    <td>{dispositivo.platformId}</td>
                    <td className="align-middle">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="deviceRadios"
                          onClick={() => {
                            setDevicesSelected(dispositivo.id)
                          }}
                          value={dispositivo.id}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </React.Fragment>
      </ModalBody>
      <ModalFooter>
        <button
          className="btn btn-warning btn-rounded waves-effect waves-light"
          size="sm"
          onClick={() => {
            deviceModalState(false)
          }}
        >
          Cancelar
        </button>

        <div className="ms-auto">
          {!waitingResponse ? (
            <button
              className={`btn btn-${
                devicesSelected === null ? "light" : "success"
              } btn-rounded waves-effect waves-light`}
              disabled={devicesSelected === null}
              form="formAddDevice"
              size="sm"
              type="submit"
            >
              Guardar
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="btn btn-rounded btn-light btn-sm waves-effect waves-light"
            >
              <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>{" "}
              Procesando
            </button>
          )}
        </div>
      </ModalFooter>
    </React.Fragment>
  )
}

export default AddDeviceModal
