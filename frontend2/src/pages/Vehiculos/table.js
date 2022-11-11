import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import {
  Badge,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
} from "reactstrap"

function CarsTable(props) {
  const [CarsFiltered, setCarsFiltered] = useState([])
  const [prevCars, setPrevCars] = useState([])
  const [prevTabs, setPrevTabs] = useState(1)
  const [prevCTF, setPrevCTF] = useState("")
  const [prevCTS, setPrevCTS] = useState("")

  useEffect(() => {
    if (tabTF !== prevTabs || prevCars !== vehiculos) {
      if (tabTF === 1) filterByClient()
      else if (tabTF === 2) filterBySearch()

      setPrevTabs(tabTF)
      setPrevCars(vehiculos)
    }

    if (clientTF !== prevCTF) {
      filterByClient()
      setPrevCTF(clientTF)
    }

    if (clientTS !== prevCTS) {
      filterBySearch()
      setPrevCTS(clientTS)
    }
  })

  let {
    clientTF,
    clientTS,
    tabTF,
    deviceModalState,
    setClienteData,
    setModalState,
    vehiculos,
  } = props

  const filterByClient = () => {
    if (clientTF === "Todo") {
      setCarsFiltered(vehiculos)
    } else {
      setCarsFiltered(vehiculos.filter(car => car.clientName === clientTF))
    }
  }

  const filterBySearch = () => {
    if (clientTS === "") {
      setCarsFiltered(vehiculos)
    } else {
      setCarsFiltered(
        vehiculos.filter(
          car =>
            car.placa.toLowerCase().includes(clientTS.toLowerCase()) ||
            car.model.toLowerCase().includes(clientTS.toLowerCase()) ||
            car.mark.toLowerCase().includes(clientTS.toLowerCase()) ||
            car.date_start.toLowerCase().includes(clientTS.toLowerCase()) ||
            car.clientName.toLowerCase().includes(clientTS.toLowerCase()) ||
            (car.code !== null && car.code.includes(clientTS)) ||
            car.name.toLowerCase().includes(clientTS.toLowerCase())
        )
      )
    }
  }

  const history = useHistory()

  if (CarsFiltered.length === 0)
    return (
      <center>
        <h3>No se han encontrado vehículos</h3>
      </center>
    )
  else
    return (
      <div className="table-responsive">
        <table className="table align-middle table-nowrap mb-0">
          <thead className="table-light">
            <tr>
              <th className="aligh-middle">#</th>
              <th className="aligh-middle">Nombre</th>
              <th className="aligh-middle">Placa</th>
              <th className="aligh-middle">Modelo</th>
              <th className="aligh-middle">Marca</th>
              <th className="aligh-middle">Dispositivo</th>
              <th className="aligh-middle">Inicio</th>
              <th className="aligh-middle">Fin</th>
              <th className="aligh-middle">Empresa</th>
              <th className="aligh-middle">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {CarsFiltered.map((vehiculo, idx) => (
              <tr key={"tr-car-" + idx + 1}>
                <td>{idx + 1}</td>
                <td>{vehiculo.name}</td>
                <td>{vehiculo.placa}</td>
                <td>{vehiculo.model}</td>
                <td>{vehiculo.mark}</td>
                <td>{vehiculo.code !== null ? `${vehiculo.code}` : "- - -"}</td>
                <td>{vehiculo.date_start}</td>
                <td>
                  {vehiculo.date_end === null ||
                  vehiculo.date_end === "0000-00-00"
                    ? "- - -"
                    : vehiculo.date_end}
                </td>
                <td>{vehiculo.clientName}</td>
                <td>
                  <UncontrolledDropdown>
                    <DropdownToggle className="card-drop" tag="i">
                      <i className="mdi mdi-dots-horizontal font-size-18" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end">
                      <DropdownItem
                        onClick={() => {
                          setModalState(true, "edit", vehiculo)
                        }}
                      >
                        Editar vehiculo
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          deviceModalState(true, vehiculo)
                        }}
                      >
                        {`${
                          vehiculo.code !== null ? "Cambiar" : "Añadir"
                        } dispositivo`}
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          history.push(
                            `/vehiculos/eventos?type=car&id=${vehiculo.id}`
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

export default CarsTable
