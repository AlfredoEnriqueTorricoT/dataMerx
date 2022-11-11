import React, { useEffect, useState } from "react"
import { getToday } from "today"
import { showToast } from "components/Toast/toast"

import { ModalHeader, ModalBody, ModalFooter } from "reactstrap"

function ModalClients(props) {
  const [toastWaiting, setToastWaiting] = useState(false)

  let {
    error,
    modalType,
    onInsertCliente,
    onUpdateCliente,
    setModalState,
    clientData,
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
        ? `No se ha podido ${type}r al cliente (${error.message})`
        : `El cliente ha sido ${type}do`,
    })

    if (!error && !waitingResponse) {
      setModalState(false, null)
    }
  }

  const submitFunction = e => {
    e.preventDefault()

    const data = {
      id: clientData.id,
      name: e.target.nombreForm.value,
      last_name: e.target.paternoForm.value,
      mother_last_name: e.target.maternoForm.value,
      telefono: e.target.telefonoForm.value,
      empresa: e.target.empresaForm.value,
    }

    setToastWaiting(true)

    if (modalType === "add") {
      onInsertCliente(data)
    } else if (modalType === "edit") {
      onUpdateCliente(data)
    }
  }

  return (
    <React.Fragment>
      <ModalHeader>
        {`${modalType === "add" ? "Añadir" : "Editar"} cliente`}
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
        <form id="formClientes" onSubmit={submitFunction}>
          <div className="mb-3 row">
            <label htmlFor="empresaForm" className="col-md-2 col-form-label">
              Empresa
            </label>
            <div className="col-md-10">
              <input
                className="form-control"
                defaultValue={modalType === "edit" ? clientData.empresa : ""}
                name="empresaForm"
                required
                type="text"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="nombreForm" className="col-md-2 col-form-label">
              Nombre
            </label>
            <div className="col-md-10">
              <input
                className="form-control"
                defaultValue={modalType === "edit" ? clientData.name : ""}
                name="nombreForm"
                required
                type="text"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="paternoForm" className="col-md-2 col-form-label">
              Apellido paterno
            </label>
            <div className="col-md-10">
              <input
                className="form-control"
                defaultValue={modalType === "edit" ? clientData.last_name : ""}
                name="paternoForm"
                required
                type="text"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="maternoForm" className="col-md-2 col-form-label">
              Apellido materno
            </label>
            <div className="col-md-10">
              <input
                className="form-control"
                defaultValue={
                  modalType === "edit" ? clientData.mother_last_name : ""
                }
                name="maternoForm"
                required
                type="text"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="telefonoForm" className="col-md-2 col-form-label">
              Teléfono
            </label>
            <div className="col-md-10">
              <input
                className="form-control"
                defaultValue={modalType === "edit" && clientData.telefono}
                name="telefonoForm"
                min="1"
                max="99999999"
                required
                type="number"
              />
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
              form="formClientes"
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

export default ModalClients
