import React from "react"

import {
  Badge,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
} from "reactstrap"

function UsersTable(props) {
  let { setModalState, usuarios } = props

  return (
    <div className="table-responsive">
      <table className="table align-middle table-nowrap mb-0">
        <thead className="table-light">
          <tr>
            <th className="aligh-middle">#</th>
            <th className="aligh-middle">Nombre</th>
            <th className="aligh-middle">Apellido</th>
            <th className="aligh-middle">Email</th>
            <th className="aligh-middle">Estado</th>
            <th className="aligh-middle">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((usuario, idx) => (
            <tr key={"tr-usuario-" + idx + 1}>
              <td>{idx + 1}</td>
              <td>{usuario.name}</td>
              <td>{usuario.lastName}</td>
              <td>{usuario.email}</td>
              <td>
                <Badge
                  className={`font-size-11 badge badge-soft-${
                    usuario.state ? "success" : "danger"
                  } badge-${usuario.state ? "success" : "danger"}`}
                >
                  {usuario.state ? "ACTIVO" : "INACTIVO"}
                </Badge>
              </td>
              <td>
                <UncontrolledDropdown>
                  <DropdownToggle className="card-drop" tag="i">
                    <i className="mdi mdi-dots-horizontal font-size-18" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end">
                    <DropdownItem
                      onClick={() => {
                        setModalState(true, "edit", usuario)
                      }}
                    >
                      Editar usuario
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

export default UsersTable
