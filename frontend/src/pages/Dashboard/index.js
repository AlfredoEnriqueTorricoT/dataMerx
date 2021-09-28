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

import {
  getUsuarios,
  insertUsuario,
  updateUsuario,
} from "../../store/usuarios/actions"

import { Container } from "reactstrap"
import { users } from "common/data"

class Dashboard extends Component {
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
        emailValid: true,
        passwordValid: true,
      },
    }
  }

  componentDidMount() {
    const { onGetUsuarios } = this.props
    onGetUsuarios()
  }

  componentDidUpdate() {
    if (this.state.toastWaiting) {
      if (!this.props.waitingResponse) {
        if (this.props.error === null) {
          this.setState({ ...this.state, modal: false, toastWaiting: false })
          showToast({
            toastType: "success",
            message: `El usuario ha sido ${
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
            } al usuario`,
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
      lastName: e.target.formApellido.value,
      email: e.target.formEmail.value,
      password: e.target.formContraseña.value,
      state: e.target.formEstado.value,
    }

    await this.setState({
      formValidation: {
        nameValid: esTexto(data.name),
        lastNameValid: esTexto(data.lastName),
        emailValid: esCorreo(data.email),
        passwordValid: data.password !== "",
      },
    })

    let fv = this.state.formValidation

    if (fv.nameValid && fv.lastNameValid && fv.emailValid && fv.passwordValid) {
      if (this.state.modalType === "add") {
        this.props.onInsertUsuario(data)
      } else {
        this.props.onUpdateUsuario(data)
      }

      this.setState({ ...this.state, toastWaiting: true })
    }
  }

  render() {
    const { usuarios } = this.props ? this.props : []
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <h3>Usuarios</h3>
            <Card>
              <CardBody>
                <div className="d-sm-flex flex-wrap">
                  <CardTitle className="mb-4 h4">Lista de usuarios </CardTitle>
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
                  {usuarios.length === 0 && this.props.waitingResponse ? (
                    <Progress
                      value={100}
                      color="primary"
                      style={{ width: "75%" }}
                      animated
                    ></Progress>
                  ) : usuarios.length === 0 && this.props.error ? (
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
                          this.props.onGetUsuarios()
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
                          <th className="align-middle">Nombre</th>
                          <th className="align-middle">Apellido</th>
                          <th className="align-middle">E-mail</th>
                          <th className="align-middle">Estado</th>
                          <th className="align-middle">Editar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usuarios.map(usuario => (
                          <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.name}</td>
                            <td>{usuario.lastName}</td>
                            <td>{usuario.email}</td>
                            <td>
                              <Badge
                                className={`font-size-11 badge-soft-${
                                  usuario.state ? "success" : "danger"
                                } badge badge-${
                                  usuario.state ? "success" : "danger"
                                } badge-pil`}
                                pill
                              >
                                {usuario.state ? "ACTIVO" : "INACTIVO"}
                              </Badge>
                            </td>
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
                                    profile: usuario,
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
                  ? "Añadir usuario"
                  : "Editar usuario"}
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
                      htmlFor="formApellido"
                      className="col-md-2 col-form-label"
                    >
                      Apellido
                    </label>
                    <div className="col-md-10">
                      <input
                        name="formApellido"
                        className={`form-control ${
                          !this.state.formValidation.lastNameValid &&
                          "is-invalid"
                        }`}
                        type="text"
                        defaultValue={
                          this.state.modalType === "edit"
                            ? this.state.profile.lastName
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="formEmail"
                      className="col-md-2 col-form-label"
                    >
                      E-mail
                    </label>
                    <div className="col-md-10">
                      <input
                        name="formEmail"
                        className={`form-control ${
                          !this.state.formValidation.emailValid && "is-invalid"
                        }`}
                        type="text"
                        defaultValue={
                          this.state.modalType === "edit"
                            ? this.state.profile.email
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="formContraseña"
                      className="col-md-2 col-form-label"
                    >
                      Contraseña
                    </label>
                    <div className="col-md-10">
                      <input
                        name="formContraseña"
                        className={`form-control ${
                          !this.state.formValidation.passwordValid &&
                          "is-invalid"
                        }`}
                        type="password"
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-md-2 col-form-label">Estado</label>
                    <div className="col-md-10">
                      <select
                        className="form-select"
                        name="formEstado"
                        defaultValue={
                          this.state.modalType === "edit"
                            ? this.state.profile.state
                            : 1
                        }
                      >
                        <option value={1}>Activo</option>
                        <option value={0}>Inactivo</option>
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

Dashboard.propTypes = {
  data: PropTypes.array,
  onGetUsuarios: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    usuarios: state.usuarios.data,
    error: state.usuarios.error,
    waitingResponse: state.usuarios.waitingResponse,
  }
}

const mapDispatchToProps = dispatch => ({
  onGetUsuarios: () => dispatch(getUsuarios()),
  onInsertUsuario: data => dispatch(insertUsuario(data)),
  onUpdateUsuario: data => dispatch(updateUsuario(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
