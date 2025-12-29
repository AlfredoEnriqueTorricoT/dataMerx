import React, { useEffect, useState } from 'react'
import { SpinnerL } from 'components/components'
import { ErrorTable } from 'components/tableElements'
import { URL_IMAGE } from 'store/api/AxiosServices'
import { useCarFetch, useCar } from '../hooks'
import { CarModel, ImageModel } from '../models/CarModel'

interface ModalEventsProps {
  car: CarModel
  onClose: () => void
  t: (key: string) => string
}

interface GalleryState {
  images: ImageModel[]
  currentIndex: number
  eventTitle: string
}

const formatDate = (date: string): string => {
  const fecha = new Date(date)
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  const day = fecha.getDate()
  const month = months[fecha.getMonth()]
  const year = fecha.getFullYear()
  return `${day} ${month}. ${year}`
}

const eventTypes: Record<number, { label: string; color: string; icon: string }> = {
  1: { label: 'INFORMATIVO', color: 'info', icon: 'info-circle' },
  2: { label: 'ADVERTENCIA', color: 'warning', icon: 'exclamation-circle' },
  3: { label: 'PELIGRO', color: 'danger', icon: 'exclamation-triangle' },
}

const ModalEvents: React.FC<ModalEventsProps> = ({ car, onClose, t }) => {
  const [modalStatus, setModalStatus] = useState<0 | 1 | 2>(0)
  const [gallery, setGallery] = useState<GalleryState | null>(null)
  const { fetchCarEvents } = useCarFetch()
  const { eventList } = useCar()

  useEffect(() => {
    const loadEvents = async () => {
      const result = await fetchCarEvents(car.id)
      setModalStatus(result.success ? 1 : 2)
    }
    loadEvents()
  }, [car.id])

  // Keyboard navigation for gallery
  useEffect(() => {
    if (!gallery) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigateGallery('prev')
      } else if (e.key === 'ArrowRight') {
        navigateGallery('next')
      } else if (e.key === 'Escape') {
        setGallery(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gallery])

  const retryFetch = async () => {
    setModalStatus(0)
    const result = await fetchCarEvents(car.id)
    setModalStatus(result.success ? 1 : 2)
  }

  const getEventType = (typeId: number) => {
    return eventTypes[typeId] || eventTypes[1]
  }

  const openGallery = (images: ImageModel[], startIndex: number, eventTitle: string) => {
    setGallery({ images, currentIndex: startIndex, eventTitle })
  }

  const navigateGallery = (direction: 'prev' | 'next') => {
    if (!gallery) return

    setGallery((prev) => {
      if (!prev) return null
      const total = prev.images.length
      let newIndex = direction === 'next' ? prev.currentIndex + 1 : prev.currentIndex - 1

      if (newIndex >= total) newIndex = 0
      if (newIndex < 0) newIndex = total - 1

      return { ...prev, currentIndex: newIndex }
    })
  }

  const goToImage = (index: number) => {
    if (!gallery) return
    setGallery((prev) => (prev ? { ...prev, currentIndex: index } : null))
  }

  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title">Eventos del vehículo</h5>
        <button type="button" onClick={onClose} className="btn-close" aria-label="Close"></button>
      </div>

      <div className="modal-body p-0">
        {/* Car info header */}
        <div className="px-3 py-2 bg-light border-bottom">
          <small className="text-muted">
            <i className="fas fa-car me-1"></i>
            <strong>{car.placa}</strong> - {car.mark} {car.model}
          </small>
        </div>

        {modalStatus === 0 && (
          <div className="p-4">
            <SpinnerL />
          </div>
        )}

        {modalStatus === 1 && (
          <>
            {eventList.length === 0 ? (
              <div className="text-center py-5">
                <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                <h5 className="text-muted">Sin eventos registrados</h5>
              </div>
            ) : (
              <div className="table-responsive" style={{ maxHeight: '60vh' }}>
                <style>
                  {`
                    .event-table-row:hover {
                      background-color: rgba(0, 0, 0, 0.075) !important;
                    }
                  `}
                </style>
                <table className="table mb-0">
                  <thead className="table-light sticky-top">
                    <tr>
                      <th style={{ minWidth: '300px' }} className="text-start">
                        Evento
                      </th>
                      <th style={{ width: '120px' }} className="text-center">
                        Fecha
                      </th>
                      <th style={{ width: '140px' }} className="text-center">
                        Tipo
                      </th>
                      <th style={{ width: '120px' }} className="text-center">
                        Imágenes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventList.map((event, idx) => {
                      const eventType = getEventType(event.typeId)
                      const hasImages = event.images && event.images.length > 0

                      return (
                        <tr
                          key={`event-${idx}`}
                          className="text-start event-table-row"
                          style={{ cursor: 'default' }}
                        >
                          <td>
                            <div className="fw-semibold">{event.title}</div>
                            {event.detail && (
                              <small
                                className="text-muted d-block mt-1"
                                style={{ lineHeight: '1.4' }}
                              >
                                {event.detail}
                              </small>
                            )}
                          </td>
                          <td className="text-nowrap text-center">
                            <small>{formatDate(event.createdAt)}</small>
                          </td>
                          <td className="text-center">
                            <span
                              className={`badge bg-${eventType.color} bg-opacity-10 text-${eventType.color} px-2 py-1`}
                              style={{ fontSize: '0.75rem' }}
                            >
                              <i className={`fas fa-${eventType.icon} me-1`}></i>
                              {eventType.label}
                            </span>
                          </td>
                          <td className="text-center">
                            {hasImages ? (
                              <button
                                className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1 mx-auto"
                                onClick={() => openGallery(event.images!, 0, event.title)}
                                title="Ver galería de imágenes"
                              >
                                <i className="fas fa-images"></i>
                                <span className="badge bg-primary rounded-pill">
                                  {event.images!.length}
                                </span>
                              </button>
                            ) : (
                              <span className="text-muted">
                                <i className="far fa-image fa-sm"></i>
                              </span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {modalStatus === 2 && (
          <div className="p-4">
            <ErrorTable cod={500} retryFunction={retryFetch} />
          </div>
        )}
      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>
          <i className="fas fa-times me-1"></i>
          Cerrar
        </button>
      </div>

      {/* Gallery Modal / Lightbox */}
      {gallery && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column"
          style={{ backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999 }}
        >
          {/* Gallery Header */}
          <div className="d-flex justify-content-between align-items-center p-3 text-white">
            <div>
              <h6 className="mb-0">{gallery.eventTitle}</h6>
              <small className="text-white-50">
                {gallery.currentIndex + 1} de {gallery.images.length} imágenes
              </small>
            </div>
            <button className="btn btn-outline-light btn-sm" onClick={() => setGallery(null)}>
              <i className="fas fa-times me-1"></i>
              Cerrar
            </button>
          </div>

          {/* Main Image Area */}
          <div className="flex-grow-1 d-flex align-items-center justify-content-center position-relative px-5">
            {/* Previous Button */}
            {gallery.images.length > 1 && (
              <button
                className="btn btn-dark btn-lg position-absolute start-0 ms-2 rounded-circle"
                style={{ width: '50px', height: '50px', opacity: 0.7 }}
                onClick={() => navigateGallery('prev')}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
            )}

            {/* Current Image */}
            <img
              src={`${URL_IMAGE}${gallery.images[gallery.currentIndex].url}`}
              alt={`Imagen ${gallery.currentIndex + 1}`}
              style={{
                maxWidth: '85%',
                maxHeight: '70vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              }}
            />

            {/* Next Button */}
            {gallery.images.length > 1 && (
              <button
                className="btn btn-dark btn-lg position-absolute end-0 me-2 rounded-circle"
                style={{ width: '50px', height: '50px', opacity: 0.7 }}
                onClick={() => navigateGallery('next')}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            )}
          </div>

          {/* Thumbnails */}
          {gallery.images.length > 1 && (
            <div className="p-3">
              <div
                className="d-flex gap-2 justify-content-center overflow-auto py-2"
                style={{ maxWidth: '100%' }}
              >
                {gallery.images.map((img, idx) => (
                  <img
                    key={`thumb-${idx}`}
                    src={`${URL_IMAGE}${img.url}`}
                    alt={`Miniatura ${idx + 1}`}
                    onClick={() => goToImage(idx)}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      border:
                        idx === gallery.currentIndex
                          ? '3px solid #0d6efd'
                          : '3px solid transparent',
                      opacity: idx === gallery.currentIndex ? 1 : 0.6,
                      transition: 'all 0.2s ease',
                    }}
                  />
                ))}
              </div>
              <div className="text-center mt-2">
                <small className="text-white-50">
                  <i className="fas fa-keyboard me-1"></i>
                  Usa las flechas ← → para navegar, ESC para cerrar
                </small>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ModalEvents
