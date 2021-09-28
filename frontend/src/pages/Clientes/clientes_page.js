import React, { Component } from "react"

import PropTypes from "prop-types"
import { connect } from "react-redux"
import { esTexto, esCorreo } from "regular_expresions"
import { showToast, clearToast } from "../../components/Toast/toast"
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress,
  Row,
  Table,
  UncontrolledDropdown,
} from "reactstrap"
import { Link } from "react-router-dom"
import companies from "assets/images/companies"

import {
  getClientes,
  insertCliente,
  updateCliente,
} from "../../store/clientes/actions"

import { Container } from "reactstrap"
import { users } from "common/data"

class Clientes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      modalType: "add",
      profile: { id: 0 },
      toastWaiting: false,
      formValidation: {
        nameValid: true,
        lastNameValid: true,
        motherLastNameValid: true,
      },
    }
  }

  componentDidMount() {
    const { onGetClientes } = this.props
    onGetClientes()
  }

  componentDidUpdate() {
    if (this.state.toastWaiting) {
      if (!this.props.waitingResponse) {
        if (this.props.error === null) {
          this.setState({ ...this.state, modal: false, toastWaiting: false })
          showToast({
            toastType: "success",
            message: `El cliente ha sido ${
              this.state.modalType === "add" ? "añadido" : "editado"
            }`,
          })
        } else {
          this.setState({ ...this.state, toastWaiting: false })
          console.log(this.props.error)
          showToast({
            toastType: "warning",
            title: this.props.error.message,
            message: `No se ha podido ${
              this.state.modalType === "add" ? "añadir" : "editar"
            } al cliente`,
          })
        }
      }
    }
  }

  subFunc = async e => {
    e.preventDefault()

    const data = {
      id: this.state.profile.id,
      name: e.target.formNombre.value,
      last_name: e.target.formApellidoPaterno.value,
      mother_last_name: e.target.formApellidoMaterno.value,
      telefono: e.target.formTelefono.value,
      empresa: e.target.formEmpresa.value,
    }

    await this.setState({
      formValidation: {
        nameValid: esTexto(data.name),
        lastNameValid: esTexto(data.last_name),
        motherLastNameValid: esTexto(data.mother_last_name),
      },
    })

    let fv = this.state.formValidation

    if (fv.nameValid && fv.lastNameValid && fv.motherLastNameValid) {
      if (this.state.modalType === "add") {
        this.props.onInsertCliente(data)
      } else {
        this.props.onUpdateCliente(data)
      }

      this.setState({ ...this.state, toastWaiting: true })
    }
  }

  render() {
    const { clientes } = this.props ? this.props : []
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <h3>Clientes</h3>
            <div className="mt-3 d-sm-flex flex-wrap">
              <CardTitle className="mb-4 h4">Lista de clientes </CardTitle>
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
            <div>
              {clientes.length === 0 && this.props.waitingResponse ? (
                <Progress
                  value={100}
                  color="primary"
                  style={{ width: "75%" }}
                  animated
                ></Progress>
              ) : clientes.length === 0 && this.props.error ? (
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
                    }}
                  >
                    reintentar
                  </Button>
                </center>
              ) : (
                <Row>
                  <Col lg="12">
                    <div className="table-responsive">
                      <Table className="project-list-table table-nowrap align-middle table-borderless">
                        <thead>
                          <tr>
                            <th className="col">#</th>
                            <th className="col">Cliente</th>
                            <th className="col">Teléfono</th>
                            <th className="col">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {clientes.map(cliente => (
                            <tr key={cliente.id}>
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
                                <p className="text-muted mb-0">
                                  {cliente.empresa}
                                </p>
                              </td>
                              <td>{cliente.telefono}</td>
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
                                    <DropdownItem href="#">
                                      Reportes
                                    </DropdownItem>
                                    <DropdownItem
                                      href="#"
                                      onClick={() => {
                                        this.setState({
                                          modal: true,
                                          modalType: "edit",
                                          profile: cliente,
                                        })
                                      }}
                                    >
                                      Editar
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>

                                {/*<Button
                                  type="button"
                                  color="primary"
                                  size="sm"
                                  className="btn-rounded waves-effect waves-light"
                                  // onClick={this.togglemodal}
                                  onClick={() => {
                                    this.setState({
                                      modal: true,
                                      modalType: "edit",
                                      profile: cliente,
                                    })
                                  }}
                                >
                                  Edit
                                </Button>*/}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                </Row>
              )}
            </div>

            <Modal
              isOpen={this.state.modal}
              toggle={() => {
                this.setState({ ...this.state, modal: false })
              }}
            >
              <ModalHeader>
                {this.state.modalType === "add"
                  ? "Añadir cliente"
                  : "Editar cliente"}
              </ModalHeader>
              <ModalBody>
                <form id="modalForm" onSubmit={this.subFunc}>
                  <div className="mb-3 row">
                    <label
                      htmlFor="formNombre"
                      className="col-md-2 col-form-label"
                    >
                      Nombre
                    </label>
                    <div className="col-md-10">
                      <input
                        name="formNombre"
                        className={`form-control ${
                          !this.state.formValidation.nameValid && "is-invalid"
                        }`}
                        type="text"
                        defaultValue={
                          this.state.modalType === "edit"
                            ? this.state.profile.name
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="formApellidoPaterno"
                      className="col-md-2 col-form-label"
                    >
                      Apellido paterno
                    </label>
                    <div className="col-md-10">
                      <input
                        name="formApellidoPaterno"
                        className={`form-control ${
                          !this.state.formValidation.lastNameValid &&
                          "is-invalid"
                        }`}
                        type="text"
                        defaultValue={
                          this.state.modalType === "edit"
                            ? this.state.profile.last_name
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="formApellidoMaterno"
                      className="col-md-2 col-form-label"
                    >
                      Apellido materno
                    </label>
                    <div className="col-md-10">
                      <input
                        name="formApellidoMaterno"
                        className={`form-control ${
                          !this.state.formValidation.motherLastNameValid &&
                          "is-invalid"
                        }`}
                        type="text"
                        defaultValue={
                          this.state.modalType === "edit"
                            ? this.state.profile.mother_last_name
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="formTelefono"
                      className="col-md-2 col-form-label"
                    >
                      Teléfono
                    </label>
                    <div className="col-md-10">
                      <input
                        name="formTelefono"
                        className="form-control"
                        type="number"
                        defaultValue={
                          this.state.modalType === "edit"
                            ? this.state.profile.telefono
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="formEmpresa"
                      className="col-md-2 col-form-label"
                    >
                      Empresa
                    </label>
                    <div className="col-md-10">
                      <input
                        name="formEmpresa"
                        className="form-control"
                        type="text"
                        defaultValue={
                          this.state.modalType === "edit"
                            ? this.state.profile.empresa
                            : ""
                        }
                      />
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

Clientes.propTypes = {
  data: PropTypes.array,
  onGetClientes: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    clientes: state.clientes.data,
    error: state.clientes.error,
    waitingResponse: state.clientes.waitingResponse,
  }
}

const mapDispatchToProps = dispatch => ({
  onGetClientes: () => dispatch(getClientes()),
  onInsertCliente: data => dispatch(insertCliente(data)),
  onUpdateCliente: data => dispatch(updateCliente(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Clientes)
