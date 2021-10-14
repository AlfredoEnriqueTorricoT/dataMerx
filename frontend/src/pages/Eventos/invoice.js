import React, { Component } from "react"
import { connect } from "react-redux"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import MetaTags from "react-meta-tags"
import EventList from "./eventList"
import ModalAddEvent from "./addEvent_modal"

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Modal,
  Progress,
} from "reactstrap"
import {
  getEventosPorElemento,
  insertEvento,
  insertEventoAElemento,
} from "store/actions"
import ElementData from "./elementData"

class EventInvoice extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = { listState: "loading", modalOpen: false, profileData: [] }
  }

  componentDidMount() {
    this.props.onGetEventsByElement({
      obj: this.valuex("type"),
      id: this.valuex("id"),
    })

    this.selectProfileById()
  }

  selectProfileById = () => {
    switch (this.valuex("type")) {
      case "car":
        this.setState({
          ...this.state,
          profileData: this.props.vehiculos.find(
            car => car.id == this.valuex("id")
          ),
        })
        break
      case "device":
        this.setState({
          ...this.state,
          profileData: this.props.dispositivos.find(
            device => device.id == this.valuex("id")
          ),
        })
        break
      case "sim":
        console.log("switchSIMS")
        console.log(this.props.sims)
        this.setState({
          ...this.state,
          profileData: this.props.sims.find(sim => sim.id == this.valuex("id")),
        })
        break

      default:
        break
    }

    console.log("PROFILEBYID")
    console.log(this.state)
  }

  componentDidUpdate() {
    if (this.state.listState === "loading" && !this.props.waitingResponse) {
      if (this.state.listState !== "error" && this.props.error) {
        this.setState({ ...this.state, listState: "error" })
      } else {
        this.setState({ ...this.state, listState: "success" })
      }
    }
  }

  setModalState = data => {
    this.setState({ ...this.state, modalOpen: data })
  }

  valuex = key => {
    let location = this.props.location.search
    location = location.replace("?", "")

    let array = location.split("&")
    array.forEach(element => {
      if (element.indexOf(key) == 0) {
        location = element
      }
    })

    return location.replace(key + "=", "")
  }

  render() {
    return (
      <div className="page-content">
        <MetaTags>
          <title>Eventos</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Eventos" breadcrumbItem="Detalles" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  {this.state.listState === "loading" ? (
                    <Progress
                      value={100}
                      color="primary"
                      style={{ width: "75%" }}
                      animated
                    />
                  ) : this.state.listState === "error" ? (
                    <center>
                      <h3>Ha ocurrido un error inesperado</h3>
                      <br />
                      <h5>({this.props.error.message})</h5>
                    </center>
                  ) : (
                    <ElementData
                      profileData={this.state.profileData}
                      typeElement={this.valuex("type")}
                    />
                  )}
                </CardBody>
              </Card>
              {this.state.listState === "success" && (
                <React.Fragment>
                  <div className="d-sm-flex flex-wrap">
                    <h3>Eventos</h3>
                    <div className="ms-auto">
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => {
                          this.setState({ ...this.state, modalOpen: true })
                        }}
                      >
                        Añadir evento
                      </button>
                    </div>
                  </div>
                  <br />
                  <EventList eventos={this.props.eventos} />
                </React.Fragment>
              )}
            </Col>
          </Row>

          <Modal isOpen={this.state.modalOpen}>
            <ModalAddEvent
              error={this.props.error}
              filaData={this.valuex("id")}
              onInsertEvento={this.props.onInsertEventoAElemento}
              setModalState={this.setModalState}
              tableType={this.valuex("type")}
              waitingResponse={this.props.waitingResponse}
            />
          </Modal>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    dispositivos: state.dispositivos.data,
    sims: state.sims.data,
    vehiculos: state.vehiculos.data,
    eventos: state.eventos.data,
    error: state.eventos.error,
    waitingResponse: state.eventos.waitingResponse,
  }
}

const mapDispatchToProps = dispatch => ({
  onGetEventsByElement: elemento => dispatch(getEventosPorElemento(elemento)),
  onInsertEventoAElemento: (data, data2) =>
    dispatch(insertEventoAElemento(data, data2)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EventInvoice)
