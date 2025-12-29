import React from 'react'

interface HeaderProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  onAddClick: () => void
  t: (key: string) => string
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange, onAddClick, t }) => {
  return (
    <div className="d-flex flex-wrap mb-3">
      <div className="d-inline-block">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filtrar por nombre..."
            value={searchTerm}
          />
          <div className="input-group-append">
            <button className="btn dm-button text-light" disabled>
              <i className="fas fa-filter"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="ms-auto">
        <button
          className="btn btn-sm dm-button text-light btn-label waves-effect waves-light"
          onClick={onAddClick}
        >
          <i className="fas fa-plus label-icon"></i>
          {t('Add')}
        </button>
      </div>
    </div>
  )
}

export default Header
