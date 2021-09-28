import React, { Component } from "react"

import PropTypes from "prop-types"
import { connect } from "react-redux"
import { esTexto, esCorreo } from "regular_expresions"
import { showToast, clearToast } from "../../components/Toast/toast"
import {
  Card,
  CardBody,
  CardTitle,
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress,
} from "reactstrap"
import { Link } from "react-router-dom"
import { getClientes } from "store/clientes/actions"

import {
  getVehiculos,
  insertVehiculo,
  updateVehiculo,
} from "../../store/actions"

import { Container } from "reactstrap"
import { users } from "common/data"

class CarsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      modalType: "add",
      vehiculoData: { id: 0 },
      toastWaiting: false,
      formValidation: {
        placaValid: true,
        modelValid: true,
        markValid: true,
        dateStartValid: true,
      },
    }
  }

  componentDidMount() {
    const { onGetVehiculos, onGetClientes } = this.props
    onGetClientes()
    onGetVehiculos()
  }

  componentDidUpdate() {
    if (this.state.toastWaiting) {
      if (!this.props.waitingResponse) {
        if (this.props.error === null) {
          this.setState({ ...this.state, modal: false, toastWaiting: false })
          showToast({
            toastType: "success",
            message: `El vehiculo ha sido ${
              this.state.modalType === "add" ? "añadido" : "editado"
            }`,
          })
        } else {
          this.setState({ ...this.state, toastWaiting: false })
          showToast({
            toastType: "warning",
            title: this.props.error.message,
            message: `No se ha podido ${
              this.state.modalType === "add" ? "añadir" : "editar"
            } al vehiculo`,
          })
        }
      }
    }
  }

  subFunc = async e => {
    e.preventDefault()

    const data = {
      id: this.state.vehiculoData.id,
      placa: e.target.formPlaca.value,
      model: e.target.formModelo.value,
      mark: e.target.formMarca.value,
      date_start: e.target.formFechaInicial.value,
      date_end: e.target.formUltimaFecha.value,
      clientid: e.target.formClienteId.value,
    }

    await this.setState({
      formValidation: {
        placaValid: data.placa !== "",
        modelValid: data.model !== "",
        markValid: data.mark !== "",
        dateStartValid: data.date_start !== "",
      },
    })

    console.log("VALIDANDO DATOS")
    console.log(this.state.formValidation)

    let fv = this.state.formValidation

    if (fv.placaValid && fv.modelValid && fv.markValid && fv.dateStartValid) {
      console.log("ENVIANDO DATOS:")
      console.log(data)
      if (this.state.modalType === "add") {
        this.props.onInsertVehiculo(data)
      } else {
        this.props.onUpdateVehiculo(data)
      }

      this.setState({ ...this.state, toastWaiting: true })
    }
  }

  render() {
    const { vehiculos } = this.props ? this.props : []
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <h3>Vehículos</h3>
            <Card>
              <CardBody>
                <div className="d-sm-flex flex-wrap">
                  <CardTitle className="mb-4 h4">Lista de vehiculos </CardTitle>
                  <div className="ms-auto">
                    <Button
                      type="button"
                      color={this.props.error ? "Light" : "success"}
                      disabled={this.props.error !== null}
                      size="sm"
                      className="btn-rounded waves-effect waves-light"
                      // onClick={this.togglemodal}
                      onClick={() => {
                        this.setState({ modal: true, modalType: "add" })
                      }}
                    >
                      Añadir
                    </Button>
                  </div>
                </div>
                <div className="table-responsive">
                  {vehiculos.length === 0 && this.props.waitingResponse ? (
                    <Progress
                      value={100}
                      color="primary"
                      style={{ width: "75%" }}
                      animated
                    ></Progress>
                  ) : vehiculos.length === 0 && this.props.error ? (
                    <center>
                      <h3>{this.props.error.message}</h3>
                      <br />
                      <Button
                        type="button"
                        color="info"
                        size="sm"
                        className="btn-rounded waves-effect waves-light"
                        // onClick={this.togglemodal}
                        onClick={() => {
                          this.props.onGetClientes()
                          this.props.onGetVehiculos()
                        }}
                      >
                        reintentar
                      </Button>
                    </center>
                  ) : (
                    <table className="table align-middle table-nowrap mb-0">
                      <thead className="table-light">
                        <tr>
                          <th className="align-middle">#</th>
                          <th className="align-middle">Placa</th>
                          <th className="align-middle">Modelo</th>
                          <th className="align-middle">Marca</th>
                          <th className="align-middle">Fecha inicial</th>
                          <th className="align-middle">Última fecha</th>
                          <th className="align-middle">Cliente</th>
                          <th className="align-middle">Editar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vehiculos.map(vehiculo => (
                          <tr key={vehiculo.id}>
                            <td>{vehiculo.id}</td>
                            <td>{vehiculo.placa}</td>
                            <td>{vehiculo.model}</td>
                            <td>{vehiculo.mark}</td>
                            <td>{vehiculo.date_start}</td>
                            <td>{vehiculo.date_end}</td>
                            <td>{vehiculo.clientName}</td>
                            <td>
                              <Button
                                type="button"
                                color="link"
                                size="sm"
                                className="btn-rounded waves-effect waves-light"
                                // onClick={this.togglemodal}
                                onClick={() => {
                                  this.setState({
                                    modal: true,
                                    modalType: "edit",
                                    vehiculoData: vehiculo,
                                  })
                                }}
                              >
                                <i className="mdi mdi-dots-horizontal font-size-18" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </CardBody>
            </Card>

            <Modal
              isOpen={this.state.modal}
              toggle={() => {
                this.setState({ ...this.state, modal: false })
              }}
            >
              <ModalHeader>
                {this.state.modalType === "add"
                  ? "Añadir vehiculo"
                  : "Editar vehiculo"}
              </ModalHeader>
              <ModalBody>
                <form id="modalForm" onSubmit={this.subFunc}>
                  <div className="mb-3 row">
                    <label
                      htmlFor="formPlaca"
                      className="col-md-2 col-form-label"
                    >
                      Placa
                    </label>
                    <div className="col-md-10">
                      <input
                        name="formPlaca"
                        className={`form-control ${
                          !this.state.formValidation.placaValid && "is-invalid"
                        }`}
                        type="text"
                        defaultValue={
                          this.state.modalType === "edit"
                            ? this.state.vehiculoData.placa
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="formModelo"
                      className="col-md-2 col-form-label"
                    >
                      Modelo
                    </label>
                    <div className="col-md-10">
                      <input
                        name="formModelo"
                        className={`form-control ${
                          !this.state.formValidation.modelValid && "is-invalid"
                        }`}
                        type="text"
                        defaultValue={
                          this.state.modalType === "edit"
                            ? this.state.vehiculoData.model
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="formMarca"
                      className="col-md-2 col-form-label"
                    >
                      Marca
                    </label>
                    <div className="col-md-10">
                      <input
                        name="formMarca"
                        className={`form-control ${
                          !this.state.formValidation.markValid && "is-invalid"
                        }`}
                        type="text"
                        defaultValue={
                          this.state.modalType === "edit"
                            ? this.state.vehiculoData.mark
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="formFechaInicial"
                      className="col-md-2 col-form-label"
                    >
                      Fecha inicial
                    </label>
                    <div className="col-md-10">
                      <input
                        name="formFechaInicial"
                        className={`form-control ${
                          !this.state.formValidation.dateStartValid &&
                          "is-invalid"
                        }`}
                        type="date"
                        defaultValue={
                          this.state.modalType === "edit"
                            ? this.state.vehiculoData.date_start
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="formUltimaFecha"
                      className=" col-md-2 col-form-label"
                    >
                      Última fecha
                    </label>
                    <div className="col-md-10">
                      <input
                        name="formUltimaFecha"
                        className="form-control"
                        type="date"
                        defaultValue={
                          this.state.modalType === "edit"
                            ? this.state.vehiculoData.date_end
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-md-2 col-form-label">Cliente</label>
                    <div className="col-md-10">
                      <select
                        className="form-select"
                        name="formClienteId"
                        defaultValue={
                          this.state.modalType === "edit"
                            ? this.state.vehiculoData.clientid
                            : 1
                        }
                      >
                        {this.props.clientes.map((cliente, idx) => (
                          <option key={idx} value={cliente.id}>
                            {`${cliente.name} ${cliente.last_name} ${cliente.mother_last_name} (${cliente.empresa})`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="button"
                  color="warning"
                  size="sm"
                  className="btn-rounded waves-effect waves-light"
                  // onClick={this.togglemodal}
                  onClick={() => {
                    this.setState({ modal: false })
                  }}
                >
                  Cancelar
                </Button>
                {this.state.toastWaiting ? (
                  <button
                    type="button"
                    disabled
                    className="btn btn-rounded btn-light btn-sm waves-effect waves-light"
                  >
                    <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>{" "}
                    Procesando
                  </button>
                ) : (
                  <Button
                    type="submit"
                    form="modalForm"
                    color="success"
                    size="sm"
                    className="btn-rounded waves-effect waves-light"
                  >
                    Guardar
                  </Button>
                )}
              </ModalFooter>
            </Modal>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

CarsPage.propTypes = {
  data: PropTypes.array,
  onGetVehiculos: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    clientes: state.clientes.data,
    vehiculos: state.vehiculos.data,
    error: state.vehiculos.error,
    waitingResponse: state.vehiculos.waitingResponse,
  }
}

const mapDispatchToProps = dispatch => ({
  onGetClientes: () => dispatch(getClientes()),
  onGetVehiculos: () => dispatch(getVehiculos()),
  onInsertVehiculo: data => dispatch(insertVehiculo(data)),
  onUpdateVehiculo: data => dispatch(updateVehiculo(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CarsPage)
