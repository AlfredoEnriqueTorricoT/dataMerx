import React, { useEffect, useState } from "react"
import { getToday } from "today"
import { showToast } from "components/Toast/toast"

import { ModalHeader, ModalBody, ModalFooter } from "reactstrap"

function ModalCar(props) {
  const [toastWaiting, setToastWaiting] = useState(false)

  let {
    clientes,
    error,
    modalType,
    onInsertVehiculo,
    onUpdateVehiculo,
    setModalState,
    carData,
    waitingResponse,
  } = props

  useEffect(() => {
    if (toastWaiting && !waitingResponse) {
      toastFunction()
      setToastWaiting(false)
    }
  })

  const toastFunction = () => {
    let type = modalType === "add" ? "añadi" : "edita"

    showToast({
      toastType: error ? "warning" : "success",
      title: error ? "Error" : "Éxito",
      message: error
        ? `No se ha podido ${type}r el vehículo (${error.message})`
        : `El vehículo ha sido ${type}do`,
    })

    if (!error && !waitingResponse) {
      setModalState(false, null)
    }
  }

  const submitFunction = e => {
    e.preventDefault()

    let data = {
      id: carData.id,
      name: e.target.nombreForm.value,
      placa: e.target.placaForm.value,
      model: e.target.modeloForm.value,
      mark: e.target.marcaForm.value,
      date_start: e.target.inicioForm.value,
      clientid: e.target.clienteForm.value,
    }

    if (modalType === "edit") {
      data = { ...data, date_end: e.target.finForm.value }
    }

    setToastWaiting(true)

    if (modalType === "add") {
      onInsertVehiculo(data)
    } else if (modalType === "edit") {
      onUpdateVehiculo(data)
    }
  }

  return (
    <React.Fragment>
      <ModalHeader>
        {`${modalType === "add" ? "Añadir" : "Editar"} vehículo`}
        <button
          type="button"
          onClick={() => setModalState(false)}
          className="close"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </ModalHeader>

      <ModalBody>
        <form id="formCars" onSubmit={submitFunction}>
          <div className="mb-3 row">
            <label htmlFor="nombreForm" className="col-md-2 col-form-label">
              Nombre
            </label>
            <div className="col-md-10">
              <input
                className="form-control"
                defaultValue={modalType === "edit" ? carData.name : ""}
                name="nombreForm"
                required
                type="text"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="placaForm" className="col-md-2 col-form-label">
              Placa
            </label>
            <div className="col-md-10">
              <input
                className="form-control"
                defaultValue={modalType === "edit" ? carData.placa : ""}
                name="placaForm"
                required
                type="text"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="modeloForm" className="col-md-2 col-form-label">
              Modelo
            </label>
            <div className="col-md-10">
              <input
                className="form-control"
                defaultValue={modalType === "edit" ? carData.model : ""}
                name="modeloForm"
                required
                type="text"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="marcaForm" className="col-md-2 col-form-label">
              Marca
            </label>
            <div className="col-md-10">
              <input
                className="form-control"
                defaultValue={modalType === "edit" ? carData.mark : ""}
                name="marcaForm"
                required
                type="text"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="inicioForm" className="col-md-2 col-form-label">
              Inicio
            </label>
            <div className="col-md-10">
              <input
                className="form-control"
                defaultValue={
                  modalType === "edit" ? carData.date_start : getToday()
                }
                name="inicioForm"
                required
                type="date"
              />
            </div>
          </div>

          {modalType === "edit" && (
            <div className="mb-3 row">
              <label htmlFor="finForm" className="col-md-2 col-form-label">
                Fin
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  defaultValue={modalType === "edit" ? carData.date_end : ""}
                  name="finForm"
                  type="date"
                />
              </div>
            </div>
          )}

          <div className="mb-3 row">
            <label htmlFor="clienteForm" className="col-md-2 col-form-label">
              Cliente
            </label>
            <div className="col-md-10">
              <select
                name="clienteForm"
                className="form-select"
                defaultValue={modalType === "edit" && carData.clientid}
              >
                {clientes.map((cliente, idx) => (
                  <option key={idx} value={cliente.id}>
                    {`${cliente.name} ${cliente.last_name} ${cliente.mother_last_name} (${cliente.empresa})`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </ModalBody>

      <ModalFooter>
        <button
          className="btn btn-warning btn-rounded waves-effect waves-light"
          size="sm"
          onClick={() => {
            setModalState(false)
          }}
        >
          Cancelar
        </button>

        <div className="ms-auto">
          {!waitingResponse ? (
            <button
              className="btn btn-success btn-rounded waves-effect waves-light"
              form="formCars"
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

export default ModalCar
