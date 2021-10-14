import React, { useState, useEffect } from "react"
import { showToast } from "components/Toast/toast"

import { ModalHeader, ModalBody, ModalFooter } from "reactstrap"

function AddSimsModal(props) {
  const [simsSearched, setSimsSearched] = useState([])
  const [simsSelected, setSimsSelected] = useState(null)
  const [toastWaiting, setToastWaiting] = useState(false)

  useEffect(() => {
    setSimsSearched(simsDisponibles)
  }, [])

  useEffect(() => {
    if (toastWaiting && !waitingResponse) {
      toastFunction()
      setToastWaiting(false)
    }
  })

  let {
    deviceId,
    error,
    onInsertSim,
    simsDisponibles,
    simsModalState,
    waitingResponse,
  } = props

  const insertSimFunc = e => {
    e.preventDefault()
    setToastWaiting(true)

    const data = {
      id: deviceId,
      simid: simsSelected,
    }
    onInsertSim(data)
  }

  const searchFunc = data => {
    let obj = data.target.value
    setSimsSearched(
      simsDisponibles.filter(
        sim => sim.imei.includes(obj) || sim.number.includes(obj)
      )
    )
  }

  const toastFunction = () => {
    showToast({
      toastType: error ? "warning" : "success",
      title: error ? "Error" : "Éxito",
      message: error
        ? `No se ha podido enlazar el sim (${error.message})`
        : `El sim ha sido enlazado`,
    })

    if (!error && !waitingResponse) {
      simsModalState(false)
    }
  }

  return (
    <React.Fragment>
      <ModalHeader>Sims disponibles</ModalHeader>
      <ModalBody>
        <React.Fragment>
          <form
            id="formAddSim"
            onSubmit={insertSimFunc}
            className="app-search d-none d-lg-block"
          >
            <div className="position-relative">
              <input
                type="number"
                name="searchInput"
                onChange={searchFunc}
                className="form-control"
                placeholder="Search..."
              />
              <span className="bx bx-search-alt" />
            </div>
          </form>
          {simsSearched.length === 0 ? (
            <center>
              <h5>No se han encontrado sims disponibles</h5>
            </center>
          ) : (
            <table className="table align-middle table-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th className="align-middle">#</th>
                  <th className="align-middle">Imei</th>
                  <th className="align-middle">Número</th>
                  <th className="align-middle">Seleccionar</th>
                </tr>
              </thead>
              <tbody>
                {simsSearched.map(sim => (
                  <tr key={sim.id}>
                    <td>{sim.id}</td>
                    <td>{sim.imei}</td>
                    <td>{sim.number}</td>
                    <td className="align-middle">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="simRadios"
                          onClick={() => {
                            setSimsSelected(sim.id)
                          }}
                          value={sim.id}
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
            simsModalState(false)
          }}
        >
          Cancelar
        </button>

        <div className="ms-auto">
          {!waitingResponse ? (
            <button
              className="btn btn-success btn-rounded waves-effect waves-light"
              form="formAddSim"
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

export default AddSimsModal
