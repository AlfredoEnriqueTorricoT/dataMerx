import React, { Component } from "react"
import { connect } from "react-redux"
import { getSims, insertSim, updateSim } from "store/actions"
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
import ModalSim from "./modal"
import SimsTable from "./table"
import Filter from "./filter"

class SimsOpt extends Component {
  constructor(props) {
    super(props)

    this.state = {
      crudState: "loading",
      modalOpen: false,
      modaType: "add",
      simsTS: "",
      simData: {},
    }
  }

  componentDidMount() {
    this.props.onGetSims()
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
        simData: data3,
      })
    } else {
      this.setState({ ...this.state, modalOpen: data1 })
    }
  }

  setSearchData = data => {
    this.setState({ ...this.state, simsTS: data })
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Merx - Sims</title>
          </MetaTags>
          <Container fluid>
            <Breadcrumbs title="Cuadros de mando" breadcrumbItem="Sims" />
            <Card>
              <CardBody>
                {this.state.crudState === "success" && (
                  <React.Fragment>
                    <Filter setSearchData={this.setSearchData} />
                    <hr />
                  </React.Fragment>
                )}
                <div className="d-sm-flex flex-wrap">
                  <CardTitle className="mb-4 h4">Lista de sims</CardTitle>
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
                            this.props.onGetSims()
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
                          Añadir sim
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
                    <SimsTable
                      sims={this.props.sims}
                      simsTS={this.state.simsTS}
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
          <ModalSim
            error={this.props.error}
            modalType={this.state.modalType}
            onInsertSim={this.props.onInsertSim}
            onUpdateSim={this.props.onUpdateSim}
            setModalState={this.modalState}
            simData={this.state.simData}
            waitingResponse={this.props.waitingResponse}
          />
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.sims.error,
    sims: state.sims.data,
    waitingResponse: state.sims.waitingResponse,
  }
}

const mapDispatchToProps = dispatch => ({
  onGetSims: () => dispatch(getSims()),
  onInsertSim: data => dispatch(insertSim(data)),
  onUpdateSim: data => dispatch(updateSim(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SimsOpt)
