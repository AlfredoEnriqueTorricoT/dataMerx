import React, { useState, useEffect } from 'react'
import { Row, Col, Input, InputGroup, InputGroupText } from 'reactstrap'

interface FeedFiltersProps {
  searchTerm: string
  filterDate: string | null
  onApplyFilters: (date: string | null, search: string) => void
  onClearFilters: () => void
  isLoading: boolean
}

const FeedFilters: React.FC<FeedFiltersProps> = ({
  searchTerm,
  filterDate,
  onApplyFilters,
  onClearFilters,
  isLoading,
}) => {
  const [localSearch, setLocalSearch] = useState(searchTerm)
  const [localDate, setLocalDate] = useState(filterDate || '')

  useEffect(() => {
    setLocalSearch(searchTerm)
    setLocalDate(filterDate || '')
  }, [searchTerm, filterDate])

  const handleSearch = () => {
    onApplyFilters(localDate || null, localSearch)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleClear = () => {
    setLocalSearch('')
    setLocalDate('')
    onClearFilters()
  }

  const hasFilters = localSearch !== '' || localDate !== ''

  return (
    <div className="mb-4">
      <Row className="g-2">
        {/* Buscador */}
        <Col md={6}>
          <InputGroup>
            <InputGroupText>
              <i className="fas fa-search"></i>
            </InputGroupText>
            <Input
              type="text"
              placeholder="Buscar por título..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
          </InputGroup>
        </Col>

        {/* Filtro por fecha */}
        <Col md={3}>
          <InputGroup>
            <InputGroupText>
              <i className="fas fa-calendar"></i>
            </InputGroupText>
            <Input
              type="date"
              value={localDate}
              onChange={(e) => setLocalDate(e.target.value)}
              disabled={isLoading}
            />
          </InputGroup>
        </Col>

        {/* Botones */}
        <Col md={3}>
          <div className="d-flex gap-2">
            <button
              className="btn btn-primary flex-grow-1"
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <>
                  <i className="fas fa-filter me-1"></i>
                  Filtrar
                </>
              )}
            </button>
            {hasFilters && (
              <button
                className="btn btn-outline-secondary"
                onClick={handleClear}
                disabled={isLoading}
                title="Limpiar filtros"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default FeedFilters
