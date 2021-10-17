import React from "react"
import { Link } from "react-router-dom"

import {
  Badge,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
} from "reactstrap"

function SimsTable(props) {
  let { setModalState, sims } = props

  return (
    <div className="table-responsive">
      <table className="table align-middle table-nowrap mb-0">
        <thead className="table-light">
          <tr>
            <th className="aligh-middle">#</th>
            <th className="aligh-middle">Imei</th>
            <th className="aligh-middle">Número</th>
            <th className="aligh-middle">Recepción</th>
            <th className="aligh-middle">Código</th>
            <th className="aligh-middle">Estado</th>
            <th className="aligh-middle">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {sims.map(sim => (
            <tr key={"tr-sim-" + sim.id}>
              <td>{sim.id}</td>
              <td>{sim.imei}</td>
              <td>{sim.number}</td>
              <td>{sim.f_reception}</td>
              <td>{sim.cod}</td>
              <td>
                <Badge
                  className={`font-size-11 badge badge-soft-${
                    sim.active ? "success" : "danger"
                  } badge-${sim.active ? "success" : "danger"}`}
                >
                  {sim.active ? "ACTIVO" : "INACTIVO"}
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
                        setModalState(true, "edit", sim)
                      }}
                    >
                      Editar sim
                    </DropdownItem>
                    <DropdownItem>
                      <Link to={`/simEventos/?type=sim&id=${sim.id}`}>
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

/* <button
                  className="btn btn-link btn-sm btn-rounded waves-effect waves-light"
                  onClick={() => {
                    setModalState(true, "edit", sim)
                  }}
                >
                  <i className="mdi mdi-dots-horizontal font-size-18" />
                </button> */

export default SimsTable
