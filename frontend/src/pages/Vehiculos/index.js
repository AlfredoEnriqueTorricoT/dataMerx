import React, { Component } from "react"
import { connect } from "react-redux"
import {
  getClientes,
  getVehiculos,
  insertVehiculo,
  updateVehiculo,
} from "store/actions"
import MetaTags from "react-meta-tags"
import Breadcrumbs from "../../components/Common/Breadcrumb"

//AHORA

import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Modal,
  Progress,
} from "reactstrap"
import ModalCar from "./modal"
import CarsTable from "./table"

class VehiculosOpt extends Component {
  constructor(props) {
    super(props)

    this.state = {
      crudState: "loading",
      modalOpen: false,
      modaType: "add",
      carData: {},
    }
  }

  componentDidMount() {
    this.props.onGetClientes()
    this.props.onGetVehiculos()
  }

  componentDidUpdate() {
    if (!this.props.waitingResponse && this.state.crudState === "loading") {
      if (this.props.error && this.state.crudState !== "error") {
        this.setState({ ...this.state, crudState: "error" })
      } else {
        this.setState({ ...this.state, crudState: "success" })
      }
    }
  }

  modalState = (data1, data2, data3) => {
    if (data2) {
      this.setState({
        ...this.state,
        modalOpen: data1,
        modalType: data2,
        carData: data3,
      })
    } else {
      this.setState({ ...this.state, modalOpen: data1 })
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Vehículos</title>
          </MetaTags>
          <Container fluid>
            <Breadcrumbs title="Cuadros de mando" breadcrumbItem="Vehículos" />
            <Card>
              <CardBody>
                <div className="d-sm-flex flex-wrap">
                  <CardTitle className="mb-4 h4">Lista de vehículos</CardTitle>
                  <div className="ms-auto">
                    {
                      //LOADING
                      this.state.crudState === "loading" ? (
                        <button
                          className="btn btn-sm btn-light btn-rounded waves-effect waves-light"
                          disabled
                        >
                          <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                          Procesando
                        </button>
                      ) : //ERROR
                      this.state.crudState === "error" ? (
                        <button
                          className="btn btn-sm btn-info btn-rounded waves-effect waves-light"
                          onClick={() => {
                            this.props.onGetClientes()
                            this.props.onGetVehiculos()
                            this.setState({
                              ...this.state,
                              crudState: "loading",
                            })
                          }}
                        >
                          Reintentar
                        </button>
                      ) : (
                        //SUCCESS
                        <button
                          className="btn btn-sm btn-success btn-rounded waves-effect waves-light"
                          onClick={() => {
                            this.setState({
                              ...this.state,
                              modalOpen: true,
                              modalType: "add",
                            })
                          }}
                        >
                          Añadir vehículo
                        </button>
                      )
                    }
                  </div>
                </div>

                {
                  //LOADING
                  this.state.crudState === "loading" ? (
                    <Progress
                      value={100}
                      color="primary"
                      style={{ width: "75%" }}
                      animated
                    />
                  ) : //ERROR
                  this.state.crudState === "error" ? (
                    <center>
                      <h3>Ha ocurrido un error inesperado</h3>
                      <br />
                      <h5>({this.props.error.message})</h5>
                    </center>
                  ) : (
                    //SUCCESS
                    <CarsTable
                      vehiculos={this.props.vehiculos}
                      setModalState={this.modalState}
                    />
                  )
                }
              </CardBody>
            </Card>
          </Container>
        </div>

        <Modal
          isOpen={this.state.modalOpen}
          toggle={() => {
            this.setState({ ...this.state, modalOpen: false })
          }}
        >
          <ModalCar
            clientes={this.props.clientes}
            error={this.props.error}
            modalType={this.state.modalType}
            onInsertVehiculo={this.props.onInsertVehiculo}
            onUpdateVehiculo={this.props.onUpdateVehiculo}
            setModalState={this.modalState}
            carData={this.state.carData}
            waitingResponse={this.props.waitingResponse}
          />
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    clientes: state.clientes.data,
    error: state.vehiculos.error,
    vehiculos: state.vehiculos.data,
    waitingResponse: state.vehiculos.waitingResponse,
  }
}

const mapDispatchToProps = dispatch => ({
  onGetClientes: () => dispatch(getClientes()),
  onGetVehiculos: () => dispatch(getVehiculos()),
  onInsertVehiculo: data => dispatch(insertVehiculo(data)),
  onUpdateVehiculo: data => dispatch(updateVehiculo(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(VehiculosOpt)
