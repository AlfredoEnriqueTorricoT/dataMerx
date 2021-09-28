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

import { getSims, insertSim, updateSim } from "../../store/sims/actions"

import { Container } from "reactstrap"
import { users } from "common/data"

class SimsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      modalType: "add",
      simData: { id: 0 },
      toastWaiting: false,
      formValidation: {
        imeiValid: true,
        numberValid: true,
        FReceptionValid: true,
        codValid: true,
      },
    }
  }

  componentDidMount() {
    const { onGetSims } = this.props
    onGetSims()
  }

  componentDidUpdate() {
    if (this.state.toastWaiting) {
      if (!this.props.waitingResponse) {
        if (this.props.error === null) {
          this.setState({ ...this.state, modal: false, toastWaiting: false })
          showToast({
            toastType: "success",
            message: `El sim ha sido ${
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
            } al sim`,
          })
        }
      }
    }
  }

  subFunc = async e => {
    e.preventDefault()

    const data = {
      id: this.state.simData.id,
      imei: e.target.formImei.value,
      number: e.target.formNumero.value,
      f_reception: e.target.formFReception.value,
      cod: e.target.formCodigo.value,
      active: e.target.formEstado.value,
    }

    console.log(data)

    await this.setState({
      formValidation: {
        imeiValid: data.imei !== "",
        numberValid: data.number !== "",
        FReceptionValid: data.f_reception !== "",
        codValid: data.cod !== "",
      },
    })

    let fv = this.state.formValidation

    if (fv.imeiValid && fv.numberValid && fv.FReceptionValid && fv.codValid) {
      if (this.state.modalType === "add") {
        this.props.onInsertSim(data)
      } else {
        this.props.onUpdateSim(data)
      }

      this.setState({ ...this.state, toastWaiting: true })
    }
  }

  render() {
    const { sims } = this.props ? this.props : []
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <h3>Sims</h3>
            <Card>
              <CardBody>
                <div className="d-sm-flex flex-wrap">
                  <CardTitle className="mb-4 h4">Lista de sims </CardTitle>
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
                  {sims.length === 0 && this.props.waitingResponse ? (
                    <Progress
                      value={100}
                      color="primary"
                      style={{ width: "75%" }}
                      animated
                    ></Progress>
                  ) : sims.length === 0 && this.props.error ? (
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
                          this.props.onGetSims()
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
                          <th className="align-middle">Número</th>
                          <th className="align-middle">Fecha de recepción</th>
                          <th className="align-middle">Código</th>
                          <th className="align-middle">Estado</th>
                          <th className="align-middle">Editar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sims.map(sim => (
                          <tr key={sim.id}>
                            <td>{sim.id}</td>
                            <td>{sim.imei}</td>
                            <td>{sim.number}</td>
                            <td>{sim.f_reception}</td>
                            <td>{sim.cod}</td>
                            <td>
                              <Badge
                                className={`font-size-11 badge-soft-${
                                  sim.active ? "success" : "danger"
                                } badge badge-${
                                  sim.active ? "success" : "danger"
                                } badge-pil`}
                                pill
                              >
                                {sim.active ? "ACTIVO" : "INACTIVO"}
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
                                    simData: sim,
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
                {this.state.modalType === "add" ? "Añadir sim" : "Editar sim"}
              </ModalHeader>
              <ModalBody>
                <form id="modalForm" onSubmit={this.subFunc}>
                  <div className="mb-3 row">
                    <label
                      htmlFor="formImei"
                      className="col-md-2 col-form-label"
                    >
                      Imei
                    </label>
                    <div className="col-md-10">
                      <input
                        name="formImei"
                        className={`form-control ${
                          !this.state.formValidation.imeiValid && "is-invalid"
                        }`}
                        type="number"
                        defaultValue={
                          this.state.modalType === "edit"
                            ? this.state.simData.imei
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="formNumero"
                      className="col-md-2 col-form-label"
                    >
                      Número
                    </label>
                    <div className="col-md-10">
                      <input
                        name="formNumero"
                        className={`form-control ${
                          !this.state.formValidation.numberValid && "is-invalid"
                        }`}
                        type="numero"
                        defaultValue={
                          this.state.modalType === "edit"
                            ? this.state.simData.number
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="formFReception"
                      className="col-md-2 col-form-label"
                    >
                      Fecha recepción
                    </label>
                    <div className="col-md-10">
                      <input
                        name="formFReception"
                        className={`form-control ${
                          !this.state.formValidation.FReceptionValid &&
                          "is-invalid"
                        }`}
                        type="date"
                        defaultValue={
                          this.state.modalType === "edit"
                            ? this.state.simData.f_reception
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="formCodigo"
                      className="col-md-2 col-form-label"
                    >
                      Código
                    </label>
                    <div className="col-md-10">
                      <input
                        name="formCodigo"
                        className={`form-control ${
                          !this.state.formValidation.codValid && "is-invalid"
                        }`}
                        type="number"
                        defaultValue={
                          this.state.modalType === "edit"
                            ? this.state.simData.number
                            : ""
                        }
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
                            ? this.state.simData.active
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

SimsPage.propTypes = {
  data: PropTypes.array,
  onGetSims: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    sims: state.sims.data,
    error: state.sims.error,
    waitingResponse: state.sims.waitingResponse,
  }
}

const mapDispatchToProps = dispatch => ({
  onGetSims: () => dispatch(getSims()),
  onInsertSim: data => dispatch(insertSim(data)),
  onUpdateSim: data => dispatch(updateSim(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SimsPage)
