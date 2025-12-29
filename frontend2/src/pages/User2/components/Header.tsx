import React from 'react'

interface HeaderProps {
  isLoading: boolean
  searchTerm: string
  onSearchTermChange: (term: string) => void
  onAddClick: () => void
  t: (key: string) => string
}

const Header: React.FC<HeaderProps> = ({
  isLoading,
  searchTerm,
  onSearchTermChange,
  onAddClick,
  t,
}) => {
  return (
    <div className="d-flex flex-wrap align-items-center mb-3 gap-2">
      <div className="d-flex align-items-center gap-2 flex-grow-1">
        <div className="input-group" style={{ maxWidth: '300px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            disabled={isLoading}
          />
          {searchTerm && (
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => onSearchTermChange('')}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>

      <button className="btn dm-button text-light btn-label" onClick={onAddClick}>
        {t('Add')}
        <i className="fas fa-plus label-icon"></i>
      </button>
    </div>
  )
}

export default Header
