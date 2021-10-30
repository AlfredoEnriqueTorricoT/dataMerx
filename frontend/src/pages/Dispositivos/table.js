import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { showToast } from "components/Toast/toast"

import {
  Badge,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
} from "reactstrap"

function DevicesTable(props) {
  const [toastWaiting, setToastWaiting] = useState(false)
  const [devicesFiltered, setDevicesFiltered] = useState([])
  const [prevPTF, setPrevPTF] = useState("")

  useEffect(() => {
    if (toastWaiting && !waitingResponse) {
      toastFunction()
      setToastWaiting(false)
      console.log("TOast")
    }

    if (platformTF !== prevPTF) {
      if (platformTF === "Todo") {
        setDevicesFiltered(dispositivos)
      } else {
        setDevicesFiltered(
          dispositivos.filter(device => device.platformId === platformTF)
        )
      }
      setPrevPTF(platformTF)
    }
  })

  const history = useHistory()

  let {
    error,
    simsModalState,
    setModalState,
    dispositivos,
    platformTF,
    onGetSimsDisponibles,
    onRemoveSim,
    waitingResponse,
  } = props

  const toastFunction = () => {
    showToast({
      toastType: error ? "warning" : "success",
      title: error ? "Error" : "Éxito",
      message: error
        ? `No se ha podido remover el sim (${error.message})`
        : `El sim ha sido removido`,
    })
  }

  if (devicesFiltered.length === 0)
    return (
      <center>
        <h3>No se han encontrado dispositivos</h3>
      </center>
    )
  else
    return (
      <div className="table-responsive">
        <table className="table align-middle table-nowrap mb-0">
          <thead className="table-light">
            <tr>
              <th className="aligh-middle">#</th>
              <th className="aligh-middle">Imei</th>
              <th className="aligh-middle">Código</th>
              <th className="aligh-middle">Recepción</th>
              <th className="aligh-middle">Sim</th>
              <th className="aligh-middle">Modem / Platform</th>
              <th className="aligh-middle">Estado</th>
              <th className="aligh-middle">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {devicesFiltered.map(dispositivo => (
              <tr key={"tr-dispositivo-" + dispositivo.id}>
                <td>{dispositivo.id}</td>
                <td>{dispositivo.imei}</td>
                <td>{dispositivo.code}</td>
                <td>{dispositivo.reception}</td>
                <td>
                  {dispositivo.cod === null
                    ? "- -"
                    : `${dispositivo.cod}/${dispositivo.number}`}
                </td>
                <td>{`${dispositivo.markId}/${dispositivo.platformId}`}</td>
                <td>
                  <Badge
                    className={`font-size-11 badge-soft-${
                      dispositivo.active ? "success" : "danger"
                    } badge badge-${
                      dispositivo.active ? "success" : "danger"
                    } badge-pil`}
                    pill
                  >
                    {dispositivo.active ? "ACTIVO" : "INACTIVO"}
                  </Badge>
                </td>
                <td>
                  <UncontrolledDropdown>
                    <DropdownToggle href="#" className="card-drop" tag="i">
                      <i className="mdi mdi-dots-horizontal font-size-18" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end">
                      <DropdownItem
                        onClick={() => {
                          setModalState(true, "edit", dispositivo)
                        }}
                      >
                        Editar dispositivo
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          simsModalState(true, dispositivo)
                        }}
                      >
                        {`${
                          dispositivo.cod === null ? "Añadir" : "Cambiar"
                        } sim`}
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          history.push(
                            `/dispositivos/eventos?type=device&id=${dispositivo.id}`
                          )
                        }}
                      >
                        Ver eventos
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}

export default DevicesTable
