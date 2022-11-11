import React from "react"
import { Link } from "react-router-dom"

import companies from "assets/images/companies"

import {
  Badge,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
} from "reactstrap"

function ClientsTable(props) {
  let { setModalState, clientes } = props

  return (
    <div className="table-responsive">
      <table className="table project-list-table align-middle table-nowrap table-borderless mb-0">
        <thead>
          <tr>
            <th className="col">#</th>
            <th className="col">Cliente</th>
            <th className="col">Teléfono</th>
            <th className="col">Editar</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map(cliente => (
            <tr key={"tr-client-" + cliente.id}>
              <td>
                <img
                  src={
                    cliente.id < 6
                      ? companies[`img${cliente.id}`]
                      : companies[`img${(cliente.id % 6) + 1}`]
                  }
                  alt=""
                  className="avatar-sm"
                />
              </td>

              <td>
                <h5 className="text-truncate font-size-14">
                  <Link to="#" className="text-dark">
                    {`${cliente.name} ${cliente.last_name} ${cliente.mother_last_name}`}
                  </Link>
                </h5>
                <p className="text-muted mb-0">{cliente.empresa}</p>
              </td>

              <td>{cliente.telefono}</td>
              <td>
                <button
                  className="btn btn-sm btn-link btn-rounded"
                  onClick={() => {
                    setModalState(true, "edit", cliente)
                  }}
                >
                  <i className="mdi mdi-dots-horizontal font-size-18" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ClientsTable
