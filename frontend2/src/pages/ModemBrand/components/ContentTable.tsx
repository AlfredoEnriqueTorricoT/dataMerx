import React, { useState } from 'react'
import { THeaderSorter } from 'components/tableElements'
import { ModemBrandModel } from '../models/ModemBrandModel'

interface ContentTableProps {
  modemBrands: ModemBrandModel[]
  isLoading: boolean
  onEdit: (modemBrand: ModemBrandModel) => void
  t: (key: string) => string
}

const ContentTable: React.FC<ContentTableProps> = ({
  modemBrands,
  isLoading,
  onEdit,
  t,
}) => {
  const [sorter, setSorter] = useState(0)

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <i className="fas fa-spinner fa-spin fa-2x"></i>
        <p className="mt-2">{t('Loading')}...</p>
      </div>
    )
  }

  return (
    <div className="grayScroll table-responsive" style={{ height: '52vh', overflow: 'auto' }}>
      <table className="table table-striped">
        <THeaderSorter
          sorter={sorter}
          setSorter={setSorter}
          headerNames={[
            { name: t('Name'), arrow: true },
            { name: t('Details'), arrow: true },
            { name: t('Actions'), arrow: false },
          ]}
        />
        <tbody>
          {modemBrands.length === 0 ? (
            <tr>
              <td colSpan={3}>
                <h4 className="text-secondary">{t('No modem brands found')}</h4>
              </td>
            </tr>
          ) : (
            modemBrands.map((modemBrand, idx) => (
              <tr key={`modem-brand-item-${idx}`}>
                <td>{modemBrand.name}</td>
                <td>{modemBrand.detail || '- - -'}</td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn button-sm py-0"
                      title="Editar marca de módem"
                      onClick={() => onEdit(modemBrand)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ContentTable
