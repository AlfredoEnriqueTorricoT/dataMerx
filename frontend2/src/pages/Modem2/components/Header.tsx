import React from 'react'
import { FilterItem } from '../models/ModemModel'

interface HeaderProps {
  filters: FilterItem[]
  isLoading: boolean
  lastSearch: 'my' | 'imei' | 'filter'
  isTabletOrMobile: boolean
  searchTerm: string
  onSearchTermChange: (term: string) => void
  onSearch: () => void
  onClearSearch: () => void
  onOpenFilter: () => void
  onAddClick: () => void
  onRemoveFilter: (filter: FilterItem) => void
  t: (key: string) => string
}

const Header: React.FC<HeaderProps> = ({
  filters,
  isLoading,
  lastSearch,
  isTabletOrMobile,
  searchTerm,
  onSearchTermChange,
  onSearch,
  onClearSearch,
  onOpenFilter,
  onAddClick,
  onRemoveFilter,
  t,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm) {
      onSearch()
    }
  }
  const checkActive = (name: string) =>
    lastSearch === name ? ' text-light' : '-outline'

  const checkActiveFilter = () =>
    lastSearch === 'filter' || (isTabletOrMobile && lastSearch === 'my')
      ? ' text-light'
      : '-outline'

  return (
    <div className="d-flex col mb-3" style={{ maxHeight: '35px' }}>
      {/*!isTabletOrMobile && (
        <button
          className={`btn dm-button${checkActive('my')}`}
          style={{ minWidth: '110px' }}
          onClick={onClearSearch}
        >
          {t('My modems')}
        </button>
      )*/}

      <div className="input-group row-4 mx-2">
        <div
          className="form-control d-flex lilGrayScroll"
          style={{
            maxWidth: '300px',
            maxHeight: '35px',
            overflowY: 'hidden',
            overflowX: 'auto',
          }}
        >
          {filters.length > 0 ? (
            filters.map((filt, idx) => (
              <span
                key={`filter-${idx}`}
                className="badge text-light dm-button me-1"
                onClick={() => onRemoveFilter(filt)}
                style={{ cursor: 'pointer' }}
              >
                {filt.name} <i className="fas fa-times"></i>
              </span>
            ))
          ) : (
            <input
              type="text"
              className="invisible-input"
              onChange={(e) => onSearchTermChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar por imei..."
              value={searchTerm}
            />
          )}
        </div>
        <div className="input-group-append">
          <button
            className={`btn dm-button${checkActive('imei')}`}
            disabled={isLoading || !searchTerm}
            onClick={onSearch}
            title="Buscar"
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <i className="fas fa-search"></i>
            )}
          </button>
          {/*
            <button
            className={`btn dm-button${checkActiveFilter()}`}
            disabled={isLoading}
            title="Filtros"
            onClick={onOpenFilter}
          >
            <i className="fas fa-filter"></i>
          </button>*/
          }
        </div>
      </div>

      <button
        className={`btn row-2 ${isTabletOrMobile ? '' : 'btn-label'} dm-button text-light`}
        onClick={onAddClick}
      >
        {!isTabletOrMobile && t('Add')}
        <i className="fas fa-plus label-icon"></i>
      </button>
    </div>
  )
}

export default Header
