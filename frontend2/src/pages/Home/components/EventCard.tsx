import React from 'react'
import { Card, CardBody, UncontrolledTooltip } from 'reactstrap'
import { EventModel } from '../models/EventFeedModel'
import ImageGallery from './ImageGallery'

const API_BASE_URL = 'http://localhost:8000/storage/'

interface EventCardProps {
  event: EventModel
  onOpenComments: (event: EventModel) => void
}

const EventCard: React.FC<EventCardProps> = ({ event, onOpenComments }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Ahora mismo'
    if (diffMins < 60) return `Hace ${diffMins} min`
    if (diffHours < 24) return `Hace ${diffHours} h`
    if (diffDays < 7) return `Hace ${diffDays} días`

    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    })
  }

  const getImageUrl = (url: string): string => {
    if (url.startsWith('http')) return url
    return `${API_BASE_URL}${url}`
  }

  const renderRelatedBadges = () => {
    const badges: React.ReactNode[] = []

    if (event.car) {
      const carId = `car-badge-${event.id}`
      badges.push(
        <React.Fragment key="car">
          <span id={carId} className="badge bg-info me-1" style={{ cursor: 'pointer' }}>
            <i className="fas fa-car me-1"></i>
            {event.car.placa}
          </span>
          <UncontrolledTooltip placement="top" target={carId}>
            <div className="text-start">
              <div className="fw-bold border-bottom mb-1 pb-1">Vehículo</div>
              <div><strong>Placa:</strong> {event.car.placa}</div>
              <div><strong>Marca:</strong> {event.car.mark}</div>
              <div><strong>Modelo:</strong> {event.car.model}</div>
              {event.car.name && <div><strong>Nombre:</strong> {event.car.name}</div>}
            </div>
          </UncontrolledTooltip>
        </React.Fragment>
      )
    }

    if (event.modem) {
      const modemId = `modem-badge-${event.id}`
      badges.push(
        <React.Fragment key="modem">
          <span id={modemId} className="badge bg-warning me-1" style={{ cursor: 'pointer' }}>
            <i className="fas fa-hdd me-1"></i>
            {event.modem.imei.slice(-6)}
          </span>
          <UncontrolledTooltip placement="top" target={modemId}>
            <div className="text-start">
              <div className="fw-bold border-bottom mb-1 pb-1">Módem</div>
              <div><strong>IMEI:</strong> {event.modem.imei}</div>
              <div><strong>Código:</strong> {event.modem.code}</div>
              <div><strong>Estado:</strong> {event.modem.active ? 'Activo' : 'Inactivo'}</div>
            </div>
          </UncontrolledTooltip>
        </React.Fragment>
      )
    }

    if (event.sim) {
      const simId = `sim-badge-${event.id}`
      badges.push(
        <React.Fragment key="sim">
          <span id={simId} className="badge bg-success me-1" style={{ cursor: 'pointer' }}>
            <i className="fas fa-sim-card me-1"></i>
            {event.sim.number}
          </span>
          <UncontrolledTooltip placement="top" target={simId}>
            <div className="text-start">
              <div className="fw-bold border-bottom mb-1 pb-1">SIM</div>
              <div><strong>Número:</strong> {event.sim.number}</div>
              <div><strong>IMEI:</strong> {event.sim.imei}</div>
              <div><strong>Estado:</strong> {event.sim.active ? 'Activo' : 'Inactivo'}</div>
            </div>
          </UncontrolledTooltip>
        </React.Fragment>
      )
    }

    if (event.platform) {
      const platformId = `platform-badge-${event.id}`
      badges.push(
        <React.Fragment key="platform">
          <span id={platformId} className="badge bg-primary me-1" style={{ cursor: 'pointer' }}>
            <i className="fas fa-globe me-1"></i>
            {event.platform.name}
          </span>
          <UncontrolledTooltip placement="top" target={platformId}>
            <div className="text-start">
              <div className="fw-bold border-bottom mb-1 pb-1">Plataforma</div>
              <div><strong>Nombre:</strong> {event.platform.name}</div>
              <div><strong>URL:</strong> {event.platform.url}</div>
              <div><strong>Email:</strong> {event.platform.email}</div>
              <div><strong>Estado:</strong> {event.platform.active ? 'Activo' : 'Inactivo'}</div>
            </div>
          </UncontrolledTooltip>
        </React.Fragment>
      )
    }

    return badges.length > 0 ? <div className="mt-2">{badges}</div> : null
  }

  const commentsCount = event.comments.reduce((acc, comment) => {
    return acc + 1 + comment.replies.length
  }, 0)

  return (
    <Card className="mb-3 shadow-sm">
      <CardBody>
        {/* Header */}
        <div className="d-flex align-items-start mb-3">
          <div className="avatar-sm me-3">
            <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-16">
              {event.user?.name?.charAt(0).toUpperCase() || 'S'}
            </span>
          </div>
          <div className="flex-grow-1">
            <h5 className="mb-0 font-size-15">{event.title}</h5>
            <div className="text-muted font-size-12">
              <span>{event.user?.name || 'Sistema'}</span>
              <span className="mx-1">•</span>
              <span>{formatDate(event.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Detail */}
        <p className="text-muted mb-3" style={{ whiteSpace: 'pre-wrap' }}>
          {event.detail}
        </p>

        {/* Related badges */}
        {renderRelatedBadges()}

        {/* Images */}
        {event.images.length > 0 && (
          <div className="mt-3">
            <ImageGallery
              images={event.images.map((img) => ({
                id: img.id,
                url: getImageUrl(img.url),
              }))}
            />
          </div>
        )}

        {/* Actions */}
        <div className="border-top pt-3 mt-3">
          <button
            className="btn btn-link text-muted p-0"
            onClick={() => onOpenComments(event)}
          >
            <i className="far fa-comment-alt me-1"></i>
            {commentsCount > 0 ? `${commentsCount} comentario${commentsCount > 1 ? 's' : ''}` : 'Comentar'}
          </button>
        </div>
      </CardBody>
    </Card>
  )
}

export default EventCard
