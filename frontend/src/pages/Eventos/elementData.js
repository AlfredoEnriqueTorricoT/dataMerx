import React, { useEffect } from "react"

import logo from "../../assets/images/logo-dark.png"
import { Col, Row } from "reactstrap"
import vehiculos from "store/vehiculos/reducer"

function ElementData(props) {
  let { profileData, typeElement } = props
  const linkButton = () => {
    switch (typeElement) {
      case "car":
        return "vehiculo"
      case "device":
        return "dispositivo"
      case "sim":
        return "sim"
      default:
        break
    }
  }

  /*useEffect(() => {
    console.log(profileData)
  })*/

  const showData = () => {
    switch (typeElement) {
      case "car":
        return (
          <React.Fragment>
            <h2>{"Placa: " + profileData.placa}</h2>
            <Col sm="10">
              <tr>
                <th className="align-midle">Cliente: </th>
                <td className="align-middle">{profileData.clientName}</td>
              </tr>
              <tr>
                <th className="align-middle">Marca: </th>
                <td className="align-middle">{profileData.mark}</td>
              </tr>
              <tr>
                <th className="align-middle">Modelo: </th>
                <td className="align-middle">{profileData.model}</td>
              </tr>
            </Col>
            <Col sm="2">
              <tr>
                <th className="align-middle">Modem: </th>
                <td className="align-middle">
                  {profileData.code !== null
                    ? `${vehiculo.code}/${vehiculo.name}`
                    : "- -"}
                </td>
              </tr>
              <tr>
                <th className="align-midle">Inicio: </th>
                <td className="align-middle">{profileData.date_start}</td>
              </tr>
              <tr>
                <th className="align-midle">Fin: </th>
                <td className="align-middle">
                  {profileData.date_end === null ||
                  profileData.date_end === "0000-00-00"
                    ? "- - -"
                    : profileData.date_end}
                </td>
              </tr>
            </Col>
          </React.Fragment>
        )
      case "device":
        return (
          <React.Fragment>
            <h2>{"Código: " + profileData.code}</h2>
            <Col sm="10">
              <table>
                <tbody>
                  <tr>
                    <th className="align-middle">Nombre:</th>
                    <td className="align-middle">{profileData.name}</td>
                  </tr>
                  <tr>
                    <th className="align-middle">Imei:</th>
                    <td className="align-middle">{profileData.imei}</td>
                  </tr>
                  <tr>
                    <th className="align-middle">Recepción:</th>
                    <td className="align-middle">{profileData.reception}</td>
                  </tr>
                  <tr>
                    <th className="align-middle">Estado:</th>
                    <td className="align-middle">
                      {profileData.active ? "Activo" : "Inactivo"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
            <Col sm="2">
              <table>
                <tbody>
                  <tr>
                    <th className="align-middle">Sim: </th>
                    <td className="align-middle">
                      {profileData.cod === null ? "ninguno" : profileData.cod}
                    </td>
                  </tr>
                  <tr>
                    <th className="align-middle">Modem: </th>
                    <td className="align-middle">{profileData.markId}</td>
                  </tr>
                  <tr>
                    <th className="align-middle">Platform: </th>
                    <td className="align-middle">{profileData.platformId}</td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </React.Fragment>
        )
      case "sim":
        return (
          <React.Fragment>
            <h2>{"Código: " + profileData.cod}</h2>
            <Col sm="10">
              <table>
                <tbody>
                  <tr>
                    <th className="align-middle">Número:</th>
                    <td className="align-middle">{profileData.number}</td>
                  </tr>
                  <tr>
                    <th className="align-middle">Imei:</th>
                    <td className="align-middle">{profileData.imei}</td>
                  </tr>
                </tbody>
              </table>
            </Col>
            <Col sm="2">
              <table>
                <tbody>
                  <tr>
                    <th className="align-middle">Estado:</th>
                    <td className="align-middle">
                      {profileData.active ? "Activo" : "Inactivo"}
                    </td>
                  </tr>
                  <tr>
                    <th className="align-middle">Recepción:</th>
                    <td className="align-middle">{profileData.f_reception}</td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </React.Fragment>
        )

      default:
        break
    }
  }

  return (
    <React.Fragment>
      <div className="invoice-title">
        <h4 className="float-end font-size-16"></h4>
        <div className="mb-4">
          <div className="d-sm-flex flex-wrap">
            {typeElement === "car" && (
              <h4>
                <i className="fas fa-car" />
                {"   "}Vehículo
              </h4>
            )}
            {typeElement === "device" && (
              <h4>
                <i className="fas fa-hdd" />
                {"   "}Dispositivo
              </h4>
            )}
            {typeElement === "sim" && (
              <h4>
                <i className="fas fa-sim-card" />
                {"   "}
                Sim
              </h4>
            )}
            <div className="ms-auto">
              <div className="ms-auto">
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => {
                    window.history.back()
                  }}
                >
                  Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <Row>{showData()}</Row>
    </React.Fragment>
  )
}

export default ElementData
