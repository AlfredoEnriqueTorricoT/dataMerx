import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useParams, useHistory } from 'react-router-dom'
import Breadcrumbs from '../../components/Common/Breadcrumb'
import { SpinnerL } from 'components/components'
import { useModemEvents, useModemEventsFetch } from './hooks'
import { EventModel } from '../Home/models/EventFeedModel'
import EventCard from '../Home/components/EventCard'
import ModalComments from '../Home/components/ModalComments'
import ScrollToTop from '../Home/components/ScrollToTop'

interface RouteParams {
  id: string
}

const ModemEventsPage: React.FC = () => {
  const { id } = useParams<RouteParams>()
  const history = useHistory()
  const modemId = parseInt(id, 10)

  const { events, modemImei, isEmpty } = useModemEvents()
  const { isLoading, isCommenting, fetchEventsByModemId, createComment, deleteComment, reset } =
    useModemEventsFetch()

  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)
  const [commentsModalOpen, setCommentsModalOpen] = useState(false)

  // Cargar eventos al montar
  useEffect(() => {
    if (modemId) {
      fetchEventsByModemId(modemId)
    }

    // Limpiar al desmontar
    return () => {
      reset()
    }
  }, [modemId])

  const handleGoBack = () => {
    history.push('/modem')
  }

  const handleOpenComments = (event: EventModel) => {
    setSelectedEventId(event.id)
    setCommentsModalOpen(true)
  }

  const handleCloseComments = () => {
    setCommentsModalOpen(false)
    setSelectedEventId(null)
  }

  // Meta title
  document.title = 'Eventos del Modem | Siguelo'

  // Obtener el IMEI del primer evento si no lo tenemos
  const displayImei = modemImei || events[0]?.modem?.imei || `ID: ${modemId}`

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Modem" breadcrumbItem="Eventos" />

        <Row className="justify-content-center">
          <Col lg={8} xl={6}>
            {/* Header con botón volver */}
            <div className="card mb-4">
              <div className="card-body d-flex align-items-center justify-content-between py-3">
                <button className="btn btn-light" onClick={handleGoBack}>
                  <i className="fas fa-arrow-left me-2"></i>
                  Volver
                </button>
                <div className="text-center flex-grow-1">
                  <h5 className="mb-0">Eventos del Modem</h5>
                  <small className="text-muted">IMEI: {displayImei}</small>
                </div>
                <div style={{ width: '90px' }}></div>
              </div>
            </div>

            {/* Loading inicial */}
            {isLoading && isEmpty && <SpinnerL />}

            {/* Sin eventos */}
            {!isLoading && isEmpty && (
              <div className="text-center py-5">
                <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                <h5 className="text-muted">No hay eventos para este modem</h5>
                <button className="btn btn-primary mt-3" onClick={handleGoBack}>
                  <i className="fas fa-arrow-left me-2"></i>
                  Volver a la lista
                </button>
              </div>
            )}

            {/* Lista de eventos */}
            {events.map((event) => (
              <EventCard key={event.id} event={event} onOpenComments={handleOpenComments} />
            ))}

            {/* Mensaje de fin de lista */}
            {!isLoading && events.length > 0 && (
              <div className="text-center py-4 text-muted">
                <i className="fas fa-check-circle me-2"></i>
                Has visto todos los eventos de este modem
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {/* Modal de comentarios con props externos */}
      <ModalComments
        eventId={selectedEventId}
        isOpen={commentsModalOpen}
        onClose={handleCloseComments}
        events={events}
        onCreateComment={createComment}
        onDeleteComment={deleteComment}
        isCommenting={isCommenting}
      />

      {/* Botón scroll to top */}
      <ScrollToTop />
    </div>
  )
}

export default ModemEventsPage
