import React, { Component } from "react"
import { connect } from "react-redux"
import { getClientes, insertCliente, updateCliente } from "store/actions"
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
import ModalClients from "./modal"
import ClientsTable from "./table"

class ClientesPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      crudState: "loading",
      modalOpen: false,
      modaType: "add",
      clientData: {},
    }
  }

  componentDidMount() {
    this.props.onGetClientes()
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
        clientData: data3,
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
            <title>Merx - Clientes</title>
          </MetaTags>
          <Container fluid>
            <Breadcrumbs title="Cuadros de mando" breadcrumbItem="Clientes" />

            <div className="d-sm-flex flex-wrap">
              <CardTitle className="mb-4 h4">Lista de clientes</CardTitle>
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
                      Añadir cliente
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
                <ClientsTable
                  clientes={this.props.clientes}
                  setModalState={this.modalState}
                />
              )
            }
          </Container>
        </div>

        <Modal
          isOpen={this.state.modalOpen}
          toggle={() => {
            this.setState({ ...this.state, modalOpen: false })
          }}
        >
          <ModalClients
            error={this.props.error}
            modalType={this.state.modalType}
            onInsertCliente={this.props.onInsertCliente}
            onUpdateCliente={this.props.onUpdateCliente}
            setModalState={this.modalState}
            clientData={this.state.clientData}
            waitingResponse={this.props.waitingResponse}
          />
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.clientes.error,
    clientes: state.clientes.data,
    waitingResponse: state.clientes.waitingResponse,
  }
}

const mapDispatchToProps = dispatch => ({
  onGetClientes: () => dispatch(getClientes()),
  onInsertCliente: data => dispatch(insertCliente(data)),
  onUpdateCliente: data => dispatch(updateCliente(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientesPage)
