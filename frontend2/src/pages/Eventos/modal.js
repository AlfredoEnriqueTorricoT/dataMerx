import React, { useEffect, useState } from "react"
import { getToday } from "today"
import { showToast } from "components/Toast/toast"

import { ModalHeader, ModalBody, ModalFooter } from "reactstrap"

function ModalEvent(props) {
  const [toastWaiting, setToastWaiting] = useState(false)

  let {
    error,
    eventsData,
    modalType,
    onInsertEvento,
    onUpdateEvento,
    setModalState,
    waitingResponse,
  } = props

  useEffect(() => {
    if (toastWaiting && !waitingResponse) {
      toastFunction()
      setToastWaiting(false)
    }
  })

  const toastFunction = () => {
    let type

    if (modalType === "add") {
      type = "añadi"
    } else if (modalType === "edit") {
      type = "edita"
    }

    showToast({
      toastType: error ? "warning" : "success",
      title: error ? "Error" : "Éxito",
      message: error
        ? `No se ha podido ${type}r el evento (${error.message})`
        : `El evento ha sido ${type}do`,
    })

    if (!error && !waitingResponse) {
      setModalState(false, null)
    }
  }

  const submitFunction = e => {
    e.preventDefault()

    const data = {
      tableAffected: tableType,
      rowAffected: e.target.filaForm.value,
      detail: e.target.detallesForm.value,
      now: e.target.dechaForm.value,
      userid: localStorage.getItem("userId"),
      typeevent: e.target.estadoForm.value,
    }

    setToastWaiting(true)

    if (modalType === "add") {
      onInsertEvento(data)
    } else if (modalType === "edit") {
      onUpdateEvento(data)
    }
  }

  return (
    <React.Fragment>
      <ModalHeader>
        {`${modalType === "add" ? "Añadir" : "Editar"} evento`}
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
        <form id="formEvents" onSubmit={submitFunction}>
          <div className="mb-3 row">
            <div className="mb-3 row">
              <label htmlFor="tablaForm" className="col-md-2 col-form-label">
                Tabla
              </label>
              <div className="col-md-10">
                <select
                  name="tablaForm"
                  className="form-select"
                  defaultValue={modalType === "edit" && eventsData.active}
                >
                  <option value="car">Car</option>
                  <option value="device">Device</option>
                  <option value="sim">Sim</option>
                </select>
              </div>
            </div>

            <label htmlFor="filaForm" className="col-md-2 col-form-label">
              Fila
            </label>
            <div className="col-md-10">
              <input
                className="form-control"
                defaultValue={modalType === "edit" && eventsData.imei}
                name="filaForm"
                min="1"
                max="9999"
                required
                type="number"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="detallesForm" className="col-md-2 col-form-label">
              Detalles
            </label>
            <div className="col-md-10">
              <textarea
                className="form-control"
                defaultValue={modalType === "edit" ? eventsData.detail : ""}
                name="detallesForm"
                rows="2"
                required
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="fechaForm" className="col-md-2 col-form-label">
              Fecha
            </label>
            <div className="col-md-10">
              <input
                className="form-control"
                defaultValue={
                  modalType === "edit" ? eventsData.f_reception : getToday()
                }
                name="fechaForm"
                type="date"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="estadoForm" className="col-md-2 col-form-label">
              Estado
            </label>
            <div className="col-md-10">
              <select
                name="estadoForm"
                className="form-select"
                defaultValue={modalType === "edit" && eventsData.active}
              >
                <option value={1}>Activo</option>
                <option value={0}>Inactivo</option>
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
              form="formEvents"
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

export default ModalEvent
