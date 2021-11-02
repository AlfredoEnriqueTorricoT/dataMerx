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
import Filter from "./filter"

class DispositivosOpt extends Component {
  constructor(props) {
    super(props)

    this.state = {
      crudState: "loading",
      simsModalOpen: false,
      modalOpen: false,
      modaType: "add",
      deviceData: {},
      platformTab: 1,
      platformTF: "Todo",
      platformTS: "",
    }
  }

  componentDidMount() {
    this.props.onGetModems()
    this.props.onGetDispositivos()
    this.props.onGetPlatforms()
    this.props.onGetSimsDisponibles()
  }

  componentDidUpdate() {
    console.log(
      "platforms: ",
      this.state.platformTab,
      this.state.platformTF,
      this.state.platformTS
    )
    if (
      !this.props.waitingResponse &&
      this.state.crudState === "loading" &&
      this.props.platforms.length != 0 &&
      this.props.modems.length != 0
    ) {
      if (this.props.error && this.state.crudState !== "error") {
        this.setState({ ...this.state, crudState: "error" })
      } else {
        this.setState({ ...this.state, crudState: "success" })
      }
    }
  }

  setPlatformData = (obj, data) => {
    switch (obj) {
      case "platformTab":
        this.setState({ ...this.state, platformTab: data })
        break
      case "platformTF":
        this.setState({ ...this.state, platformTF: data })
        break
      case "platformTS":
        this.setState({ ...this.state, platformTS: data })
        break
      default:
        break
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
            <title>Merx - Dispositivos</title>
          </MetaTags>
          <Container fluid>
            <Breadcrumbs
              title="Cuadros de mando"
              breadcrumbItem="Dispositivos"
            />

            <Card>
              <CardBody>
                {this.state.crudState === "success" && (
                  <React.Fragment>
                    <Filter
                      dispositivos={this.props.dispositivos}
                      platforms={this.props.platforms}
                      platSelect={this.state.platformTF}
                      setPlatformData={this.setPlatformData}
                    />
                    <hr />
                  </React.Fragment>
                )}
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
                      dispositivos={this.props.dispositivos}
                      error={this.props.error}
                      onGetSimsDisponibles={this.props.onGetSimsDisponibles}
                      platformTF={this.state.platformTF}
                      platformTS={this.state.platformTS}
                      setModalState={this.modalState}
                      simsModalState={this.simsModalState}
                      tabsTf={this.state.platformTab}
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
            addSim={this.state.deviceData.cod === null}
            deviceId={this.state.deviceData.id}
            error={this.props.error}
            onGetSimsDisponibles={this.props.onGetSimsDisponibles}
            onInsertSim={this.props.onInsertSim}
            onRemoveSim={this.props.onRemoveSim}
            simsDisponibles={this.props.simsDisponibles}
            simsModalState={this.simsModalState}
            tabsTF={this.state.platformTab}
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
