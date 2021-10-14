import React from "react"
import { Link } from "react-router-dom"

import {
  Badge,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
} from "reactstrap"

function CarsTable(props) {
  let { setModalState, vehiculos } = props

  return (
    <div className="table-responsive">
      <table className="table align-middle table-nowrap mb-0">
        <thead className="table-light">
          <tr>
            <th className="aligh-middle">#</th>
            <th className="aligh-middle">Placa</th>
            <th className="aligh-middle">Modelo</th>
            <th className="aligh-middle">Marca</th>
            <th className="aligh-middle">Modem</th>
            <th className="aligh-middle">Inicio</th>
            <th className="aligh-middle">Fin</th>
            <th className="aligh-middle">Cliente</th>
            <th className="aligh-middle">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {vehiculos.map(vehiculo => (
            <tr key={"tr-car-" + vehiculo.id}>
              <td>{vehiculo.id}</td>
              <td>{vehiculo.placa}</td>
              <td>{vehiculo.model}</td>
              <td>{vehiculo.mark}</td>
              <td>
                {vehiculo.code !== null
                  ? `${vehiculo.code}/${vehiculo.name}`
                  : "- -"}
              </td>
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
                  <DropdownToggle href="#" className="card-drop" tag="i">
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
                    <DropdownItem>
                      <Link to={`/vehiculoEventos/?type=car&id=${vehiculo.id}`}>
                        Ver eventos
                      </Link>
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
