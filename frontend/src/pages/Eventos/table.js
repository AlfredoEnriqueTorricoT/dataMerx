import React from "react"

function EventsTable(props) {
  let { setModalState, eventos } = props

  return (
    <div className="table-responsive">
      <table className="table align-middle table-nowrap mb-0">
        <thead className="table-light">
          <tr>
            <th className="aligh-middle">#</th>
            <th className="aligh-middle">Tabla</th>
            <th className="aligh-middle">Fila</th>
            <th className="aligh-middle">Detalles</th>
            <th className="aligh-middle">Cambios tabla/fila</th>
            <th className="aligh-middle">Fecha</th>
            <th className="aligh-middle">Admin id</th>
            <th className="aligh-middle">Type id</th>
          </tr>
        </thead>

        <tbody>
          {eventos.map((evento, idx) => (
            <tr key={"tr-event-" + idx + 1}>
              <td>{idx + 1}</td>
              <td>{evento.tableAffected}</td>
              <td>{evento.rowAffected}</td>
              <td>{evento.detail}</td>
              <td>{`${
                evento.tableNewValue === null ? "-" : evento.tableNewValue
              }/${evento.rowNewValue === null ? "-" : evento.rowNewValue}`}</td>
              <td>{evento.date_start}</td>
              <td>{evento.userid}</td>
              <td>{evento.typeid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EventsTable
