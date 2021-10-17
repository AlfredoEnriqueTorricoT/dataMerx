import React, { Component } from "react"
import { connect } from "react-redux"
import { getEventos, insertEvento, updateEvento } from "store/actions"
import MetaTags from "react-meta-tags"
import Breadcrumbs from "../../components/Common/Breadcrumb"

import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Modal,
  Progress,
} from "reactstrap"
import ModalEvent from "./modal"
import EventsTable from "./table"

class EventosOpt extends Component {
  constructor(props) {
    super(props)

    this.state = {
      crudState: "loading",
      modalOpen: false,
      modaType: "add",
      eventData: {},
    }
  }

  componentDidMount() {
    this.props.onGetEventos()
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
        eventData: data3,
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
            <title>Eventos</title>
          </MetaTags>
          <Container fluid>
            <Breadcrumbs title="Cuadros de mando" breadcrumbItem="Eventos" />
            <Card>
              <CardBody>
                <div className="d-sm-flex flex-wrap">
                  <CardTitle className="mb-4 h4">Lista de eventos</CardTitle>
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
                            this.props.onGetEventos()
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
                          Añadir evento
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
                    <EventsTable
                      eventos={this.props.eventos}
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
          <ModalEvent
            error={this.props.error}
            modalType={this.state.modalType}
            onInsertEvento={this.props.onInsertEvento}
            onUpdateEvento={this.props.onUpdateEvento}
            setModalState={this.modalState}
            eventData={this.state.eventData}
            waitingResponse={this.props.waitingResponse}
          />
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.eventos.error,
    eventos: state.eventos.data,
    waitingResponse: state.eventos.waitingResponse,
  }
}

const mapDispatchToProps = dispatch => ({
  onGetEventos: () => dispatch(getEventos()),
  onInsertEvento: data => dispatch(insertEvento(data)),
  onUpdateEvento: data => dispatch(updateEvento(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EventosOpt)
