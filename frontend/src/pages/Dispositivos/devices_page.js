import React, { Component } from "react"

import PropTypes from "prop-types"
import { connect } from "react-redux"
import { esTexto, esCorreo } from "regular_expresions"
import { showToast, clearToast } from "../../components/Toast/toast"
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress,
  UncontrolledDropdown,
} from "reactstrap"
import { Link } from "react-router-dom"

import { getModems } from "store/modems/actions"
import { getPlatforms } from "../../store/platforms/actions"
//import {  } from "store/actions"

import { users } from "common/data"
import {
  getDispositivos,
  insertDispositivo,
  updateDispositivo,
  getSimsDisponibles,
  dispositivoRetirarSim,
} from "store/actions"

class Devices extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      modalType: "add",
      dispositivoData: { id: 0 },
      toastWaiting: false,
      deletingSim: false,
      formValidation: {
        imeiValid: true,
        nameValid: true,
        codeValid: true,
        receptionValid: true,
      },
    }
  }

  componentDidMount() {
    const {
      onGetPlatforms,
      onGetModems,
      onGetSimsDisponibles,
      onGetDispositivos,
    } = this.props
    onGetPlatforms()
    onGetModems()
    onGetSimsDisponibles()
    onGetDispositivos()
  }

  componentDidUpdate() {
    if (this.state.toastWaiting) {
      if (!this.props.waitingResponse) {
        if (this.props.error === null) {
          this.setState({ ...this.state, modal: false, toastWaiting: false })
          showToast({
            toastType: "success",
            message: `El ${
              this.state.deletingSim ? "sim" : "dispositivo"
            } ha sido ${
              this.state.deletingSim
                ? "removido"
                : this.state.modalType === "add"
                ? "añadido"
                : "editado"
            }`,
          })
          this.setState({ deletingSim: false })
        } else {
          this.setState({ ...this.state, toastWaiting: false })
          showToast({
            toastType: "warning",
            title: this.props.error.message,
            message: `No se ha podido ${
              this.state.deletingSim
                ? "remover el sim"
                : this.state.modalType === "add"
                ? "añadir al dispositivo"
                : "editar al dispositivo"
            }`,
          })
          this.setState({ deletingSim: false })
        }
      }
    }
  }

  delSimFunc = data => {
    this.setState({ toastWaiting: true, deletingSim: true })
    this.props.onRemoveSim(data)
  }

  subFunc = async e => {
    e.preventDefault()

    const data = {
      id: this.state.dispositivoData.id,
      imei: e.target.formImei.value,
      name: e.target.formNombre.value,
      code: e.target.formCodigo.value,
      reception: e.target.formReception.value,
      active: e.target.formEstado.value,
      markId: e.target.formMarkId.value,
      platformId: e.target.formPlatformId.value,
    }

    console.log(data)

    await this.setState({
      formValidation: {
        imeiValid: data.imei !== "",
        nameValid: esTexto(data.name),
        codeValid: data.code !== "",
        receptionValid: data.reception !== "",
      },
    })

    let fv = this.state.formValidation

    if (fv.imeiValid && fv.nameValid && fv.codeValid && fv.receptionValid) {
      if (this.state.modalType === "add") {
        this.props.onInsertDispositivo(data)
      } else {
        this.props.onUpdateDispositivo(data)
      }

      this.setState({ ...this.state, toastWaiting: true })
    }
  }

  render() {
    const { dispositivos } = this.props ? this.props : []
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <h3>Dispositivos</h3>
            <Card>
              <CardBody>
                <div className="d-sm-flex flex-wrap">
                  <CardTitle className="mb-4 h4">
                    Lista de dispositivos{" "}
                  </CardTitle>
                  <div className="ms-auto">
                    <Button
                      type="button"
                      color={
                        (dispositivos.length === 0 &&
                          this.props.waitingResponse) ||
                        this.state.toastWaiting
                          ? "Light"
                          : "success"
                      }
                      disabled={
                        (dispositivos.length === 0 &&
                          this.props.waitingResponse) ||
                        this.state.toastWaiting
                      }
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
                  {dispositivos.length === 0 && this.props.waitingResponse ? (
                    <Progress
                      value={100}
                      color="primary"
                      style={{ width: "75%" }}
                      animated
                    ></Progress>
                  ) : dispositivos.length === 0 && this.props.error ? (
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
                          this.props.onGetPlatforms()
                          this.props.onGetModems()
                          this.props.onGetSimsDisponibles()
                          this.props.onGetDispositivos()
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
                          <th className="align-middle">Imei</th>
                          <th className="align-middle">Nombre</th>
                          <th className="align-middle">Código</th>
                          <th className="align-middle">Fecha de recepción</th>
                          <th className="align-middle">Sim</th>
                          <th className="align-middle">Modem / Platform</th>
                          <th className="align-middle">Estado</th>
                          <th className="align-middle">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dispositivos.map(dispositivo => (
                          <tr key={dispositivo.id}>
                            <td>{dispositivo.id}</td>
                            <td>{dispositivo.imei}</td>
                            <td>{dispositivo.name}</td>
                            <td>{dispositivo.code}</td>
                            <td>{dispositivo.reception}</td>
                            <td>
                              {dispositivo.cod === null
                                ? "Sim no asignada"
                                : `${dispositivo.cod}/${dispositivo.number}`}
                            </td>
                            <td>{`${dispositivo.markId}/${dispositivo.platformId}`}</td>
                            <td>
                              <Badge
                                className={`font-size-11 badge-soft-${
                                  dispositivo.active ? "success" : "danger"
                                } badge badge-${
                                  dispositivo.active ? "success" : "danger"
                                } badge-pil`}
                                pill
                              >
                                {dispositivo.active ? "ACTIVO" : "INACTIVO"}
                              </Badge>
                            </td>
                            <td>
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  href="#"
                                  className="card-drop"
                                  tag="i"
                                >
                                  <i className="mdi mdi-dots-horizontal font-size-18" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                  <DropdownItem
                                    href="#"
                                    onClick={() => {
                                      this.setState({
                                        modal: true,
                                        modalType: "edit",
                                        dispositivoData: dispositivo,
                                      })
                                    }}
                                  >
                                    Editar
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#"
                                    onClick={() => {
                                      this.setState({
                                        modal: true,
                                        modalType: "editSim",
                                        dispositivoData: dispositivo,
                                      })
                                    }}
                                  >
                                    Editar sim
                                  </DropdownItem>
                                  {dispositivo.cod !== null && (
                                    <DropdownItem
                                      href="#"
                                      onClick={() => {
                                        this.delSimFunc(dispositivo.id)
                                      }}
                                    >
                                      Remover sim
                                    </DropdownItem>
                                  )}
                                </DropdownMenu>
                              </UncontrolledDropdown>
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
                  ? "Añadir dispositivo"
                  : this.state.modalType === "edit"
                  ? "Editar dispositivo"
                  : "Sims disponibles"}
              </ModalHeader>
              <ModalBody>
                {this.state.modalType === "editSim" ? (
                  <table className="table align-middle table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="align-middle">#</th>
                        <th className="align-middle">Imei</th>
                        <th className="align-middle">Número</th>
                        <th className="align-middle">Seleccionar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.simsDisponibles.map(sim => (
                        <tr key={sim.id}>
                          <td>{sim.id}</td>
                          <td>{sim.imei}</td>
                          <td>{sim.number}</td>
                          <td className="align-middle">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="simRadios"
                                id={`simRadios${sim.id}`}
                                value={sim.id}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <form id="modalForm" onSubmit={this.subFunc}>
                    <label
                      htmlFor="formImei"
                      className="col-md-2 col-form-label"
                    >
                      Imei
                    </label>
                    <input
                      name="formImei"
                      className={`form-control ${
                        !this.state.formValidation.imeiValid && "is-invalid"
                      }`}
                      type="number"
                      defaultValue={
                        this.state.modalType === "edit"
                          ? this.state.dispositivoData.imei
                          : ""
                      }
                    />
                    <label
                      htmlFor="formNumero"
                      className="col-md-2 col-form-label"
                    >
                      Nombre
                    </label>
                    <input
                      name="formNombre"
                      className={`form-control ${
                        !this.state.formValidation.nameValid && "is-invalid"
                      }`}
                      type="text"
                      defaultValue={
                        this.state.modalType === "edit"
                          ? this.state.dispositivoData.name
                          : ""
                      }
                    />
                    <label
                      htmlFor="formNumero"
                      className="col-md-2 col-form-label"
                    >
                      Código
                    </label>
                    <input
                      name="formCodigo"
                      className={`form-control ${
                        !this.state.formValidation.codeValid && "is-invalid"
                      }`}
                      type="number"
                      defaultValue={
                        this.state.modalType === "edit"
                          ? this.state.dispositivoData.code
                          : ""
                      }
                    />
                    <label
                      htmlFor="formReception"
                      className="col-md-2 col-form-label"
                    >
                      Fecha de recepción
                    </label>
                    <input
                      name="formReception"
                      className={`form-control ${
                        !this.state.formValidation.receptionValid &&
                        "is-invalid"
                      }`}
                      type="date"
                      defaultValue={
                        this.state.modalType === "edit"
                          ? this.state.dispositivoData.reception
                          : ""
                      }
                    />
                    <label className="col-md-2 col-form-label">Modem id</label>
                    <select
                      className="form-select"
                      name="formMarkId"
                      defaultValue={
                        this.state.modalType === "edit"
                          ? this.state.dispositivoData.markId
                          : 1
                      }
                    >
                      {this.props.modems.map((modem, idx) => (
                        <option key={idx} value={modem.id}>
                          {modem.id}
                        </option>
                      ))}
                    </select>
                    <label className="col-md-2 col-form-label">
                      Platform id
                    </label>
                    <select
                      className="form-select"
                      name="formPlatformId"
                      defaultValue={
                        this.state.modalType === "edit"
                          ? this.state.dispositivoData.platformId
                          : 1
                      }
                    >
                      {this.props.platforms.map((platform, idx) => (
                        <option key={idx} value={platform.id}>
                          {platform.id}
                        </option>
                      ))}
                    </select>
                    <label className="col-md-2 col-form-label">Estado</label>
                    <select
                      className="form-select"
                      name="formEstado"
                      defaultValue={
                        this.state.modalType === "edit"
                          ? this.state.dispositivoData.active
                          : 1
                      }
                    >
                      <option value={1}>Activo</option>
                      <option value={0}>Inactivo</option>
                    </select>
                  </form>
                )}
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

Devices.propTypes = {
  data: PropTypes.array,
  onGetSims: PropTypes.func,
}

const mapStateToProps = state => ({
  error: state.dispositivos.error,
  simsDisponibles: state.sims.data,
  platforms: state.platforms.data,
  modems: state.modems.data,
  dispositivos: state.dispositivos.data,
  error: state.dispositivos.error,
  waitingResponse: state.dispositivos.waitingResponse,
})

const mapDispatchToProps = dispatch => ({
  onGetPlatforms: () => dispatch(getPlatforms()),
  onGetModems: () => dispatch(getModems()),
  onGetSimsDisponibles: () => dispatch(getSimsDisponibles()),
  onGetDispositivos: () => dispatch(getDispositivos()),
  onInsertDispositivo: data => dispatch(insertDispositivo(data)),
  onUpdateDispositivo: data => dispatch(updateDispositivo(data)),
  onRemoveSim: data => dispatch(dispositivoRetirarSim(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Devices)
