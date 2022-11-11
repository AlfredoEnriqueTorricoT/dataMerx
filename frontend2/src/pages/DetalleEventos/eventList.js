import React from "react"

function EventList(props) {
  let { eventos } = props

  if (!Array.isArray(eventos) || eventos.length === 0) {
    return (
      <center>
        <h4>No hay eventos</h4>
      </center>
    )
  } else {
    return (
      <div className="table-responsive">
        <table className="table align-middle table-nowrap mb-0">
          <thead className="table-light">
            <tr>
              <th></th>
              <th className="align-middle">Detalles</th>
              <th className="align-middle">Vínculo</th>
              <th className="align-middle">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map(evento => (
              <tr key={"tr-event-" + evento.id}>
                <td>
                  {evento.typeid === 1 ? (
                    <i className="fas fa-info text-info" />
                  ) : (
                    <i className="fas fa-exclamation-triangle text-warning" />
                  )}
                </td>
                <td>{evento.detail}</td>
                <td>
                  {evento.vinculo === "0" ? "sin vínculo" : evento.vinculo}
                </td>
                <td>{evento.date_start}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default EventList
