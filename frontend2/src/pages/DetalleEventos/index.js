import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useLocation } from "react-router"
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
import { getEventosPorElemento, insertEventoAElemento } from "store/actions"
import ElementData from "./elementData"
import { set } from "lodash"

function EventInvoice({
  dispositivos,
  sims,
  vehiculos,
  eventos,
  error,
  waitingResponse,
  onGetEventsByElement,
  onInsertEventoAElemento,
}) {
  const [listState, setListState] = useState("loading")
  const [modalOpen, setModalOpen] = useState(false)
  const [profileData, setProfileData] = useState([])

  //  state = { listState: "loading", modalOpen: false, profileData: [] }
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const type = query.get("type")
  const id = query.get("id")

  useEffect(() => {
    onGetEventsByElement({
      obj: type,
      id: id,
    })

    selectProfileById()
  }, [])

  const selectProfileById = () => {
    switch (type) {
      case "car":
        setProfileData(vehiculos.find(car => car.id == id))
        break
      case "device":
        setProfileData(dispositivos.find(device => device.id == id))
        break
      case "sim":
        setProfileData(sims.find(sim => sim.id == id))
        break

      default:
        break
    }
  }

  useEffect(() => {
    if (listState === "loading" && !waitingResponse) {
      if (listState !== "error" && error) {
        setListState("error")
      } else {
        setListState("success")
      }
    }
  })

  const setModalState = data => {
    setModalOpen(data)
  }

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
                {listState === "loading" ? (
                  <Progress
                    value={100}
                    color="primary"
                    style={{ width: "75%" }}
                    animated
                  />
                ) : listState === "error" ? (
                  <center>
                    <h3>Ha ocurrido un error inesperado</h3>
                    <br />
                    <h5>({error.message})</h5>
                  </center>
                ) : (
                  <ElementData profileData={profileData} typeElement={type} />
                )}
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                {listState === "success" && (
                  <React.Fragment>
                    <div className="d-sm-flex flex-wrap">
                      <h3>Eventos</h3>
                      <div className="ms-auto">
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => {
                            setModalOpen(true)
                          }}
                        >
                          Añadir evento
                        </button>
                      </div>
                    </div>
                    <br />
                    <EventList eventos={eventos} />
                  </React.Fragment>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal isOpen={modalOpen}>
          <ModalAddEvent
            error={error}
            filaData={profileData.id}
            onInsertEvento={onInsertEventoAElemento}
            setModalState={setModalState}
            tableType={type}
            waitingResponse={waitingResponse}
          />
        </Modal>
      </Container>
    </div>
  )
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
