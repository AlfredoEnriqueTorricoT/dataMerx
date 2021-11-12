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
  const [devicesFiltered, setDevicesFiltered] = useState([])
  const [prevDevices, setPrevDevices] = useState([])
  const [prevTabs, setPrevTabs] = useState(1)
  const [prevPTF, setPrevPTF] = useState("")
  const [prevPTS, setPrevPTS] = useState("")

  useEffect(() => {
    if (tabsTf !== prevTabs || prevDevices !== dispositivos) {
      if (tabsTf === 1) filterByPlatform()
      else if (tabsTf === 2) filterBySearch()

      setPrevTabs(tabsTf)
      setPrevDevices(dispositivos)
    }

    if (platformTF !== prevPTF) {
      filterByPlatform()
      setPrevPTF(platformTF)
    }

    if (platformTS !== prevPTS) {
      filterBySearch()
      setPrevPTS(platformTS)
    }
  })

  const filterByPlatform = () => {
    if (platformTF === "Todo") {
      setDevicesFiltered(dispositivos)
    } else {
      setDevicesFiltered(
        dispositivos.filter(device => device.platformId === platformTF)
      )
    }
  }

  const filterBySearch = () => {
    if (platformTS === "") {
      setDevicesFiltered(dispositivos)
    } else {
      setDevicesFiltered(
        dispositivos.filter(
          device =>
            device.imei.toLowerCase().includes(platformTS.toLowerCase()) ||
            device.reception.toLowerCase().includes(platformTS.toLowerCase()) ||
            device.markId.toLowerCase().includes(platformTS.toLowerCase()) ||
            device.code.toLowerCase().includes(platformTS.toLowerCase()) ||
            device.platformId
              .toLowerCase()
              .includes(platformTS.toLowerCase()) ||
            (device.cod !== null &&
              device.cod.toString().includes(platformTS)) ||
            (device.number !== null && device.number.includes(platformTS))
        )
      )
    }
  }

  const history = useHistory()

  let {
    error,
    simsModalState,
    setModalState,
    dispositivos,
    platformTF,
    platformTS,
    onGetSimsDisponibles,
    onRemoveSim,
    tabsTf,
    waitingResponse,
  } = props

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
              <th className="aligh-middle">Modem</th>
              <th className="aligh-middle">Plataforma</th>
              <th className="aligh-middle">Sim</th>
              <th className="aligh-middle">Estado</th>
              <th className="aligh-middle">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {devicesFiltered.map((dispositivo, idx) => (
              <tr key={"tr-dispositivo-" + idx + 1}>
                <td>{idx + 1}</td>
                <td>{dispositivo.imei}</td>
                <td>{dispositivo.code}</td>
                <td>{dispositivo.reception}</td>
                <td>{dispositivo.markId}</td>
                <td>{dispositivo.platformId}</td>
                <td>
                  {dispositivo.cod === null
                    ? "- -"
                    : `${dispositivo.cod} / ${dispositivo.number}`}
                </td>
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
