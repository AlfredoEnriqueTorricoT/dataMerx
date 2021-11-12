import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import {
  Badge,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
} from "reactstrap"

function SimsTable(props) {
  const [simsFiltered, setSimsFiltered] = useState([])
  const [prevSimsTS, setPrevSimsTS] = useState(null)
  const [prevSims, setPrevSims] = useState([])
  let { setModalState, sims, simsTS } = props

  useEffect(() => {
    if (simsTS !== prevSimsTS || prevSims !== sims) {
      if (simsTS === "") {
        setSimsFiltered(sims)
      } else {
        setSimsFiltered(
          sims.filter(
            sim =>
              sim.imei.includes(simsTS) ||
              sim.number.includes(simsTS) ||
              sim.f_reception.includes(simsTS) ||
              sim.cod.toString().includes(simsTS)
          )
        )
      }

      setPrevSimsTS(simsTS)
      setPrevSims(sims)
    }
  })

  const history = useHistory()

  if (simsFiltered.length === 0)
    return (
      <center>
        <h3>No se han encontrado sims</h3>
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
              <th className="aligh-middle">Número</th>
              <th className="aligh-middle">Recepción</th>
              <th className="aligh-middle">Código</th>
              <th className="aligh-middle">Estado</th>
              <th className="aligh-middle">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {simsFiltered.map((sim, idx) => (
              <tr key={"tr-sim-" + idx + 1}>
                <td>{idx + 1}</td>
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
                      <DropdownItem
                        onClick={() => {
                          history.push(`/sims/eventos?type=sim&id=${sim.id}`)
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

/* <button
                  className="btn btn-link btn-sm btn-rounded waves-effect waves-light"
                  onClick={() => {
                    setModalState(true, "edit", sim)
                  }}
                >
                  <i className="mdi mdi-dots-horizontal font-size-18" />
                </button> */

export default SimsTable
