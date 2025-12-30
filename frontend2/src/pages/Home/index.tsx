import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Breadcrumbs from '../../components/Common/Breadcrumb'
import { SpinnerL } from 'components/components'
import { useEventFeed, useEventFeedFetch } from './hooks'
import { EventModel } from './models/EventFeedModel'
import EventCard from './components/EventCard'
import FeedFilters from './components/FeedFilters'
import ModalComments from './components/ModalComments'
import ScrollToTop from './components/ScrollToTop'

const HomePage: React.FC = () => {
  const { events, pagination, searchTerm, filterDate, hasMore, isEmpty } = useEventFeed()
  const { isLoading, isLoadingMore, fetchFeed, loadMore, applyFilters, clearFilters } =
    useEventFeedFetch()

  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)
  const [commentsModalOpen, setCommentsModalOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  // Cargar feed inicial
  useEffect(() => {
    fetchFeed(1, filterDate, searchTerm || null)
  }, [])

  // Infinite scroll observer
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && hasMore && !isLoadingMore && !isLoading) {
        loadMore(pagination.currentPage, filterDate, searchTerm || null)
      }
    },
    [hasMore, isLoadingMore, isLoading, loadMore, pagination.currentPage, filterDate, searchTerm]
  )

  useEffect(() => {
    const element = loadMoreRef.current
    if (!element) return

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    })

    observerRef.current.observe(element)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [handleObserver])

  const handleOpenComments = (event: EventModel) => {
    setSelectedEventId(event.id)
    setCommentsModalOpen(true)
  }

  const handleCloseComments = () => {
    setCommentsModalOpen(false)
    setSelectedEventId(null)
  }

  const handleApplyFilters = async (date: string | null, search: string) => {
    await applyFilters(date, search)
  }

  const handleClearFilters = async () => {
    await clearFilters()
  }

  // Meta title
  document.title = 'Inicio | Síguelo'

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Inicio" breadcrumbItem="Feed de Eventos" />

        <Row className="justify-content-center">
          <Col lg={8} xl={6}>
            {/* Filtros */}
            <FeedFilters
              searchTerm={searchTerm}
              filterDate={filterDate}
              onApplyFilters={handleApplyFilters}
              onClearFilters={handleClearFilters}
              isLoading={isLoading}
            />

            {/* Loading inicial */}
            {isLoading && isEmpty && <SpinnerL />}

            {/* Lista de eventos */}
            {!isLoading && isEmpty && (
              <div className="text-center py-5">
                <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                <h5 className="text-muted">No hay eventos para mostrar</h5>
                {(searchTerm || filterDate) && (
                  <button className="btn btn-link" onClick={handleClearFilters}>
                    Limpiar filtros
                  </button>
                )}
              </div>
            )}

            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onOpenComments={handleOpenComments}
              />
            ))}

            {/* Indicador de carga para más eventos */}
            <div ref={loadMoreRef} className="py-3">
              {isLoadingMore && (
                <div className="text-center">
                  <i className="fas fa-spinner fa-spin fa-2x text-primary"></i>
                </div>
              )}
            </div>

            {/* Mensaje de fin de lista */}
            {!hasMore && events.length > 0 && (
              <div className="text-center py-4 text-muted">
                <i className="fas fa-check-circle me-2"></i>
                Has visto todos los eventos
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {/* Modal de comentarios */}
      <ModalComments
        eventId={selectedEventId}
        isOpen={commentsModalOpen}
        onClose={handleCloseComments}
      />

      {/* Botón scroll to top */}
      <ScrollToTop />
    </div>
  )
}

export default HomePage
