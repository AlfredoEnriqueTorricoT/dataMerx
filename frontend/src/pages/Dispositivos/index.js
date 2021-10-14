import React, { Component } from "react"
import { connect } from "react-redux"
import MetaTags from "react-meta-tags"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import {
  dispositivoRetirarSim,
  dispositivoInsertarSim,
  getDispositivos,
  getPlatforms,
  getSimsDisponibles,
  insertDispositivo,
  updateDispositivo,
} from "store/actions"
import { getModems } from "store/modems/actions"

//AHORA

import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Modal,
  Progress,
} from "reactstrap"
import AddSimsModal from "./addSimsModal"
import ModalDevice from "./modal"
import DevicesTable from "./table"

class DispositivosOpt extends Component {
  constructor(props) {
    super(props)

    this.state = {
      crudState: "loading",
      simsModalOpen: false,
      modalOpen: false,
      modaType: "add",
      deviceData: {},
    }
  }

  componentDidMount() {
    this.props.onGetDispositivos()
    this.props.onGetModems()
    this.props.onGetPlatforms()
    this.props.onGetSimsDisponibles()
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
        deviceData: data3,
      })
    } else {
      this.setState({ ...this.state, modalOpen: data1 })
    }
  }

  simsModalState = (data, data2) => {
    if (data2) {
      this.setState({ ...this.state, simsModalOpen: data, deviceData: data2 })
    } else {
      this.setState({ ...this.state, simsModalOpen: data })
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Dispositivos</title>
          </MetaTags>
          <Container fluid>
            <Breadcrumbs
              title="Cuadros de mando"
              breadcrumbItem="Dispositivos"
            />
            <Card>
              <CardBody>
                <div className="d-sm-flex flex-wrap">
                  <CardTitle className="mb-4 h4">
                    Lista de dispositivos
                  </CardTitle>
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
                            this.props.onGetDispositivos()
                            this.props.onGetModems()
                            this.props.onGetPlatforms()
                            this.props.onGetSimsDisponibles()
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
                          Añadir dispositivo
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
                    <DevicesTable
                      error={this.props.error}
                      dispositivos={this.props.dispositivos}
                      onRemoveSim={this.props.onRemoveSim}
                      setModalState={this.modalState}
                      simsModalState={this.simsModalState}
                      waitingResponse={this.props.waitingResponse}
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
          <ModalDevice
            deviceData={this.state.deviceData}
            error={this.props.error}
            modalType={this.state.modalType}
            modems={this.props.modems}
            onInsertDispositivo={this.props.onInsertDispositivo}
            onUpdateDispositivo={this.props.onUpdateDispositivo}
            platforms={this.props.platforms}
            setModalState={this.modalState}
            waitingResponse={this.props.waitingResponse}
          />
        </Modal>

        <Modal isOpen={this.state.simsModalOpen}>
          <AddSimsModal
            error={this.props.error}
            deviceId={this.state.deviceData.id}
            onInsertSim={this.props.onInsertSim}
            simsModalState={this.simsModalState}
            simsDisponibles={this.props.simsDisponibles}
            waitingResponse={this.props.waitingResponse}
          />
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.dispositivos.error,
    simsDisponibles: state.sims.data,
    platforms: state.platforms.data,
    modems: state.modems.data,
    dispositivos: state.dispositivos.data,
    error: state.dispositivos.error,
    waitingResponse: state.dispositivos.waitingResponse,
  }
}

const mapDispatchToProps = dispatch => ({
  onGetPlatforms: () => dispatch(getPlatforms()),
  onGetModems: () => dispatch(getModems()),
  onGetSimsDisponibles: () => dispatch(getSimsDisponibles()),
  onGetDispositivos: () => dispatch(getDispositivos()),
  onInsertDispositivo: data => dispatch(insertDispositivo(data)),
  onUpdateDispositivo: data => dispatch(updateDispositivo(data)),
  onInsertSim: data => dispatch(dispositivoInsertarSim(data)),
  onRemoveSim: data => dispatch(dispositivoRetirarSim(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DispositivosOpt)
