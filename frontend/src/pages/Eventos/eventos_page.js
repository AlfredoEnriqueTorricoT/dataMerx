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

import { getEventos, insertEvento, updateEvento } from "../../store/actions"

import { Container } from "reactstrap"
import { users } from "common/data"

class Eventos extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      modalType: "add",
      profile: { id: 0 },
      toastWaiting: false,
      formValidation: {
        tableValid: true,
        rowValid: true,
        detailValid: true,
        fechaValid: true,
      },
    }
  }

  componentDidMount() {
    const { onGetEventos } = this.props
    onGetEventos()
  }

  componentDidUpdate() {
    if (this.state.toastWaiting) {
      if (!this.props.waitingResponse) {
        if (this.props.error === null) {
          this.setState({ ...this.state, modal: false, toastWaiting: false })
          showToast({
            toastType: "success",
            message: `El evento ha sido ${
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
            } al evento`,
          })
        }
      }
    }
  }

  subFunc = async e => {
    e.preventDefault()

    const data = {
      tableAffected: e.target.formTabla.value,
      rowAffected: e.target.formFila.value,
      detail: e.target.formDetalles.value,
      now: e.target.formFecha.value,
      userid: localStorage.getItem("userId"),
      typeEvent: e.target.formTipoEvento.value,
    }

    await this.setState({
      formValidation: {
        rowValid: data.rowAffected > 0 && data.rowAffected !== "",
        detailValid: data.detail !== "",
        fechaValid: data.now !== "",
      },
    })

    let fv = this.state.formValidation

    if (fv.rowValid && fv.detailValid && fv.fechaValid) {
      if (this.state.modalType === "add") {
        this.props.onInsertEvento(data)
      } else {
        this.props.onUpdateEvento(data)
      }

      this.setState({ ...this.state, toastWaiting: true })
    }
  }

  render() {
    const { eventos } = this.props ? this.props : []
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <h3>Eventos</h3>
            <Card>
              <CardBody>
                <div className="d-sm-flex flex-wrap">
                  <CardTitle className="mb-4 h4">Lista de eventos </CardTitle>
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
                  {eventos.length === 0 && this.props.waitingResponse ? (
                    <Progress
                      value={100}
                      color="primary"
                      style={{ width: "75%" }}
                      animated
                    ></Progress>
                  ) : eventos.length === 0 && this.props.error ? (
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
                          this.props.onGetEventos()
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
                          <th className="align-middle">Tabla</th>
                          <th className="align-middle">Fila</th>
                          <th className="align-middle">Detalles</th>
                          <th className="align-middle">Cambios tabla/fila</th>
                          <th className="align-middle">Fecha</th>
                          <th className="align-middle">Admin id</th>
                          <th className="align-middle">Type id</th>
                        </tr>
                      </thead>
                      <tbody>
                        {eventos.map(evento => (
                          <tr key={evento.id}>
                            <td>{evento.id}</td>
                            <td>{evento.tableAffected}</td>
                            <td>{evento.rowAffected}</td>
                            <td>{evento.detail}</td>
                            <td>{`${evento.tableNewValue}/${evento.rowNewValue}`}</td>
                            <td>{evento.date_start}</td>
                            <td>{evento.userid}</td>
                            <td>{evento.typeid}</td>
                            <td>
                              <Button
                                type="button"
                                color="link"
                                size="sm"
                                className="btn-rounded waves-effect waves-light"
                                // onClick={this.togglemodal}
                                onClick={() => {
                                  console.log("CLICK")
                                  /*this.setState({
                                    modal: true,
                                    modalType: "edit",
                                    profile: evento,
                                  })*/
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
                  ? "Añadir evento"
                  : "Editar evento"}
              </ModalHeader>
              <ModalBody>
                <form id="modalForm" onSubmit={this.subFunc}>
                  <div className="mb-3 row">
                    <label
                      htmlFor="formTabla"
                      className="col-md-2 col-form-label"
                    >
                      Tabla
                    </label>
                    <div className="col-md-10">
                      <select
                        className="form-select"
                        name="formTabla"
                        defaultValue={
                          this.state.modalType === "edit"
                            ? this.state.eventoData.markId
                            : 1
                        }
                      >
                        <option value="car">Car</option>
                        <option value="device">Device</option>
                        <option value="sim">Sim</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="formFila"
                      className="col-md-2 col-form-label"
                    >
                      Fila
                    </label>
                    <div className="col-md-10">
                      <input
                        name="formFila"
                        className={`form-control ${
                          !this.state.formValidation.rowValid && "is-invalid"
                        }`}
                        type="number"
                        defaultValue={
                          this.state.modalType === "edit"
                            ? this.state.profile.rowAffected
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="formDetalles"
                      className="col-md-2 col-form-label"
                    >
                      Detalles
                    </label>
                    <div className="col-md-10">
                      <textarea
                        name="formDetalles"
                        className={`form-control ${
                          !this.state.formValidation.detailValid && "is-invalid"
                        }`}
                        type="textArea"
                        defaultValue={
                          this.state.modalType === "edit"
                            ? this.state.profile.detail
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="formFecha"
                      className="col-md-2 col-form-label"
                    >
                      Fecha
                    </label>
                    <div className="col-md-10">
                      <input
                        name="formFecha"
                        className={`form-control ${
                          !this.state.formValidation.fechaValid && "is-invalid"
                        }`}
                        type="date"
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="formAdminId"
                      className="col-md-2 col-form-label"
                    >
                      Admin id
                    </label>
                    <div className="col-md-10">
                      <input
                        name="formAdminId"
                        className="form-control"
                        type="number"
                        disabled
                        defaultValue={localStorage.getItem("userId")}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="formTipoEvento"
                      className="col-md-2 col-form-label"
                    >
                      Tipo de evento
                    </label>
                    <div className="col-md-10">
                      <select
                        className="form-select"
                        name="formTipoEvento"
                        defaultValue={
                          this.state.modalType === "edit"
                            ? this.state.eventoData.markId
                            : 1
                        }
                      >
                        <option value="info">Info</option>
                        <option value="warning">Warning</option>
                        <option value="danger">Danger</option>
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

Eventos.propTypes = {
  data: PropTypes.array,
  onGetEventos: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    eventos: state.eventos.data,
    error: state.eventos.error,
    waitingResponse: state.eventos.waitingResponse,
  }
}

const mapDispatchToProps = dispatch => ({
  onGetEventos: () => dispatch(getEventos()),
  onInsertEvento: data => dispatch(insertEvento(data)),
  onUpdateEvento: data => dispatch(updateEvento(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Eventos)
