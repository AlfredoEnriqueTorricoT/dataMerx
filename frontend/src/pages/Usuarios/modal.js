import React, { useEffect, useState } from "react"
import { getToday } from "today"
import { showToast } from "components/Toast/toast"

import { ModalHeader, ModalBody, ModalFooter } from "reactstrap"

function ModalUser(props) {
  const [toastWaiting, setToastWaiting] = useState(false)

  let {
    error,
    modalType,
    onInsertUsuario,
    onUpdateUsuario,
    setModalState,
    userData,
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
        ? `No se ha podido ${type}r al usuario (${error.message})`
        : `El usuario ha sido ${type}do`,
    })

    if (!error && !waitingResponse) {
      setModalState(false, null)
    }
  }

  const submitFunction = e => {
    e.preventDefault()

    let data = {
      id: userData.id,
      name: e.target.nombreForm.value,
      lastName: e.target.apellidoForm.value,
      email: e.target.emailForm.value,
      password: e.target.contraseñaForm.value,
    }

    if (modalType === "edit") {
      data = { ...data, state: e.target.estadoForm.value }
    }

    setToastWaiting(true)

    if (modalType === "add") {
      onInsertUsuario(data)
    } else if (modalType === "edit") {
      onUpdateUsuario(data)
    }
  }

  return (
    <React.Fragment>
      <ModalHeader>
        {`${modalType === "add" ? "Añadir" : "Editar"} usuario`}
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
        <form id="formUsers" onSubmit={submitFunction}>
          <div className="mb-3 row">
            <label htmlFor="nombreForm" className="col-md-2 col-form-label">
              Nombre
            </label>
            <div className="col-md-10">
              <input
                className="form-control"
                defaultValue={modalType === "edit" ? userData.name : ""}
                name="nombreForm"
                required
                type="text"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="apellidoForm" className="col-md-2 col-form-label">
              Apellido
            </label>
            <div className="col-md-10">
              <input
                className="form-control"
                defaultValue={modalType === "edit" ? userData.lastName : ""}
                name="apellidoForm"
                required
                type="text"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="emailForm" className="col-md-2 col-form-label">
              E-mail
            </label>
            <div className="col-md-10">
              <input
                className="form-control"
                defaultValue={modalType === "edit" ? userData.email : ""}
                name="emailForm"
                required
                type="email"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="contraseñaForm" className="col-md-2 col-form-label">
              Contraseña
            </label>
            <div className="col-md-10">
              <input
                className="form-control"
                defaultValue={modalType === "edit" ? userData.password : ""}
                name="contraseñaForm"
                type="password"
              />
            </div>
          </div>

          {modalType === "edit" && (
            <div className="mb-3 row">
              <label htmlFor="estadoForm" className="col-md-2 col-form-label">
                Estado
              </label>
              <div className="col-md-10">
                <select
                  name="estadoForm"
                  className="form-select"
                  defaultValue={modalType === "edit" && userData.state}
                >
                  <option value={1}>Activo</option>
                  <option value={0}>Inactivo</option>
                </select>
              </div>
            </div>
          )}
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
              form="formUsers"
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

export default ModalUser
