import React, { useEffect, useState } from "react"
import { getToday } from "today"
import { showToast } from "components/Toast/toast"

import { ModalHeader, ModalBody, ModalFooter } from "reactstrap"

function ModalDevice(props) {
  const [toastWaiting, setToastWaiting] = useState(false)

  let {
    deviceData,
    error,
    modalType,
    modems,
    onInsertDispositivo,
    onUpdateDispositivo,
    platforms,
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
        ? `No se ha podido ${type}r el dispositivo (${error.message})`
        : `El dispositivo ha sido ${type}do`,
    })

    if (!error && !waitingResponse) {
      setModalState(false, null)
    }
  }

  const submitFunction = e => {
    e.preventDefault()

    let data = {
      id: deviceData.id,
      imei: e.target.imeiForm.value,
      code: e.target.codigoForm.value,
      reception: e.target.recepcionForm.value,
      markId: e.target.modemIdForm.value,
      platformId: e.target.platformIdForm.value,
    }

    if (modalType === "edit") {
      data = { ...data, active: e.target.estadoForm.value }
    }

    setToastWaiting(true)

    if (modalType === "add") {
      onInsertDispositivo(data)
    } else if (modalType === "edit") {
      onUpdateDispositivo(data)
    }
  }

  return (
    <React.Fragment>
      <ModalHeader>
        {`${modalType === "add" ? "Añadir" : "Editar"} dispositivo`}
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
        <form id="formDevices" onSubmit={submitFunction}>
          <div className="mb-3 row">
            <label htmlFor="imeiForm" className="col-md-2 col-form-label">
              Imei
            </label>
            <div className="col-md-10">
              <input
                className="form-control"
                defaultValue={modalType === "edit" && deviceData.imei}
                name="imeiForm"
                min="1"
                max="99999999"
                required
                type="number"
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
                defaultValue={modalType === "edit" && deviceData.code}
                name="codigoForm"
                min="1"
                required
                type="number"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="recepcionForm" className="col-md-2 col-form-label">
              Recepción
            </label>
            <div className="col-md-10">
              <input
                className="form-control"
                defaultValue={
                  modalType === "edit" ? deviceData.reception : getToday()
                }
                name="recepcionForm"
                required
                type="date"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="modemIdForm" className="col-md-2 col-form-label">
              Dispositivo
            </label>
            <div className="col-md-10">
              <select
                name="modemIdForm"
                className="form-select"
                defaultValue={modalType === "edit" && deviceData.markId}
              >
                {modems.map((modem, idx) => (
                  <option key={idx} value={modem.id}>
                    {modem.id}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="platformIdForm" className="col-md-2 col-form-label">
              Plataforma
            </label>
            <div className="col-md-10">
              <select
                name="platformIdForm"
                className="form-select"
                defaultValue={modalType === "edit" && deviceData.platformId}
              >
                {platforms.map((platform, idx) => (
                  <option key={idx} value={platform.id}>
                    {platform.id}
                  </option>
                ))}
              </select>
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
                  defaultValue={modalType === "edit" && deviceData.active}
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
              form="formDevices"
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

export default ModalDevice
