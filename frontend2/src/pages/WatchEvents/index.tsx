import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useParams, useHistory } from 'react-router-dom'
import Breadcrumbs from '../../components/Common/Breadcrumb'
import { SpinnerL } from 'components/components'
import { useWatchEvents, useWatchEventsFetch } from './hooks'
import { EventModel } from '../Home/models/EventFeedModel'
import EventCard from '../Home/components/EventCard'
import ModalComments from '../Home/components/ModalComments'
import ScrollToTop from '../Home/components/ScrollToTop'

interface RouteParams {
  id: string
}

const WatchEventsPage: React.FC = () => {
  const { id } = useParams<RouteParams>()
  const history = useHistory()
  const watchId = parseInt(id, 10)

  const { events, watchCode, isEmpty } = useWatchEvents()
  const { isLoading, isCommenting, fetchEventsByWatchId, createComment, deleteComment, reset } =
    useWatchEventsFetch()

  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)
  const [commentsModalOpen, setCommentsModalOpen] = useState(false)

  useEffect(() => {
    if (watchId) {
      fetchEventsByWatchId(watchId)
    }

    return () => {
      reset()
    }
  }, [watchId])

  const handleGoBack = () => {
    history.push('/watch')
  }

  const handleOpenComments = (event: EventModel) => {
    setSelectedEventId(event.id)
    setCommentsModalOpen(true)
  }

  const handleCloseComments = () => {
    setCommentsModalOpen(false)
    setSelectedEventId(null)
  }

  document.title = 'Eventos del Reloj | Siguelo'

  const displayCode = watchCode || events[0]?.watch?.code || `ID: ${watchId}`

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Reloj" breadcrumbItem="Eventos" />

        <Row className="justify-content-center">
          <Col lg={8} xl={6}>
            <div className="card mb-4">
              <div className="card-body d-flex align-items-center justify-content-between py-3">
                <button className="btn btn-light" onClick={handleGoBack}>
                  <i className="fas fa-arrow-left me-2"></i>
                  Volver
                </button>
                <div className="text-center flex-grow-1">
                  <h5 className="mb-0">Eventos del Reloj</h5>
                  <small className="text-muted">Codigo: {displayCode}</small>
                </div>
                <div style={{ width: '90px' }}></div>
              </div>
            </div>

            {isLoading && isEmpty && <SpinnerL />}

            {!isLoading && isEmpty && (
              <div className="text-center py-5">
                <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                <h5 className="text-muted">No hay eventos para este reloj</h5>
                <button className="btn btn-primary mt-3" onClick={handleGoBack}>
                  <i className="fas fa-arrow-left me-2"></i>
                  Volver a la lista
                </button>
              </div>
            )}

            {events.map((event) => (
              <EventCard key={event.id} event={event} onOpenComments={handleOpenComments} />
            ))}

            {!isLoading && events.length > 0 && (
              <div className="text-center py-4 text-muted">
                <i className="fas fa-check-circle me-2"></i>
                Has visto todos los eventos de este reloj
              </div>
            )}
          </Col>
        </Row>
      </Container>

      <ModalComments
        eventId={selectedEventId}
        isOpen={commentsModalOpen}
        onClose={handleCloseComments}
        events={events}
        onCreateComment={createComment}
        onDeleteComment={deleteComment}
        isCommenting={isCommenting}
      />

      <ScrollToTop />
    </div>
  )
}

export default WatchEventsPage
