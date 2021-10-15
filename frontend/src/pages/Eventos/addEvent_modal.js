import React, { useEffect, useState } from "react"
import { showToast } from "components/Toast/toast"
import { getToday } from "today"

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

function ModalAddEvent(props) {
  const [toastWaiting, setToastWaiting] = useState(false)

  let {
    error,
    filaData,
    onInsertEvento,
    setModalState,
    tableType,
    waitingResponse,
  } = props

  useEffect(() => {
    if (toastWaiting && !waitingResponse) {
      toastFunc()
      setToastWaiting(false)
    }
  })

  const subFunc = e => {
    e.preventDefault()

    const data = {
      tableAffected: tableType,
      rowAffected: filaData,
      detail: e.target.formDetalles.value,
      now: e.target.formFecha.value,
      userid: localStorage.getItem("userId"),
      typeevent: e.target.formEvento.value,
    }

    //onInsertEvento(data, { obj: tableType, id: filaData })
    setToastWaiting(true)

    console.log(data)
  }

  const toastFunc = () => {
    showToast({
      toastType: error ? "warning" : "success",
      title: error ? "Error" : "Éxito",
      message: error
        ? `No se ha podido añadir el evento (${error.message})`
        : "El evento ha sido añadido",
    })

    if (!error) {
      setModalState(false)
    }
  }

  return (
    <React.Fragment>
      <ModalHeader>Añadir evento</ModalHeader>

      <ModalBody>
        <form id="FormAddEvent" onSubmit={subFunc}>
          <div className="mb-3 row">
            <label htmlFor="formDetalles" className="col-md-2 col-form-label">
              Detalles
            </label>
            <div className="col-md-10">
              <textarea
                className="form-control"
                name="formDetalles"
                cols="2"
                required
                rows="4"
              ></textarea>
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="formFecha" className="col-md-2 col-form-label">
              Fecha
            </label>
            <div className="col-md-10">
              <input
                className="form-control"
                defaultValue={getToday()}
                name="formFecha"
                type="date"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="formEvento" className="col-md-2 col-form-label">
              Evento
            </label>
            <div className="col-md-10">
              <select name="formEvento" className="col-md-10 form-select">
                <option value={1}>Info</option>
                <option value={2}>Warning</option>
              </select>
            </div>
          </div>
        </form>
      </ModalBody>

      <ModalFooter>
        <button
          className="btn btn-warning btn-sm btn-rounded waves-effect waves-light"
          onClick={() => {
            setModalState(false)
          }}
        >
          Cancelar
        </button>

        <div className="ms-auto">
          {waitingResponse ? (
            <button
              type="button"
              disabled
              className="btn btn-rounded btn-light btn-sm waves-effect waves-light"
            >
              <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>{" "}
              Procesando
            </button>
          ) : (
            <button
              className="btn btn-success btn-sm btn-rounded waves-effect waves-light"
              type="submit"
              form="FormAddEvent"
            >
              Guardar
            </button>
          )}
        </div>
      </ModalFooter>
    </React.Fragment>
  )
}

export default ModalAddEvent
