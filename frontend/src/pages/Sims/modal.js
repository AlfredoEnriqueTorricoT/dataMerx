import React, { useEffect, useState } from "react"
import { getToday } from "today"
import { showToast } from "components/Toast/toast"

import { ModalHeader, ModalBody, ModalFooter } from "reactstrap"

function ModalSim(props) {
  const [toastWaiting, setToastWaiting] = useState(false)

  let {
    error,
    modalType,
    onInsertSim,
    onUpdateSim,
    setModalState,
    simData,
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
        ? `No se ha podido ${type}r el sim (${error.message})`
        : `El sim ha sido ${type}do`,
    })

    if (!error && !waitingResponse) {
      setModalState(false, null)
    }
  }

  const submitFunction = e => {
    e.preventDefault()

    let data = {
      id: simData.id,
      imei: e.target.imeiForm.value,
      number: e.target.numeroForm.value,
      f_reception: e.target.fechaForm.value,
      cod: e.target.codigoForm.value,
    }

    if (modalType === "edit") {
      data = { ...data, active: e.target.estadoForm.value }
    }

    setToastWaiting(true)

    if (modalType === "add") {
      onInsertSim(data)
    } else if (modalType === "edit") {
      onUpdateSim(data)
    }
  }

  return (
    <React.Fragment>
      <ModalHeader>
        {`${modalType === "add" ? "Añadir" : "Editar"} sim`}
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
        <form id="formSims" onSubmit={submitFunction}>
          <div className="mb-3 row">
            <label htmlFor="imeiForm" className="col-md-2 col-form-label">
              Imei
            </label>
            <div className="col-md-10">
              <input
                className="form-control"
                defaultValue={modalType === "edit" && simData.imei}
                name="imeiForm"
                min="1"
                max="9999"
                required
                type="number"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="numeroForm" className="col-md-2 col-form-label">
              Número
            </label>
            <div className="col-md-10">
              <input
                className="form-control"
                defaultValue={modalType === "edit" && simData.number}
                name="numeroForm"
                min="1"
                required
                type="number"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="fechaForm" className="col-md-2 col-form-label">
              Inscripcion
            </label>
            <div className="col-md-10">
              <input
                className="form-control"
                defaultValue={
                  modalType === "edit" ? simData.f_reception : getToday()
                }
                name="fechaForm"
                required
                type="date"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="codigoForm" className="col-md-2 col-form-label">
              Código
            </label>
            <div className="col-md-10">
              <input
                className="form-control"
                defaultValue={modalType === "edit" ? simData.cod : ""}
                name="codigoForm"
                required
                type="text"
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
                  defaultValue={modalType === "edit" && simData.active}
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
              form="formSims"
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

export default ModalSim
