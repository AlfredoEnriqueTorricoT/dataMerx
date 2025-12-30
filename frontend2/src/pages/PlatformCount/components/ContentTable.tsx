import React, { useState } from 'react'
import { THeaderSorter } from 'components/tableElements'
import { PlatformCountModel } from '../models/PlatformCountModel'

interface ContentTableProps {
  platformCounts: PlatformCountModel[]
  isLoading: boolean
  onViewModems: (platform: PlatformCountModel) => void
  t: (key: string) => string
}

const ContentTable: React.FC<ContentTableProps> = ({
  platformCounts,
  isLoading,
  onViewModems,
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

  const totalCount = platformCounts.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="grayScroll table-responsive" style={{ height: '52vh', overflow: 'auto' }}>
      <table className="table table-striped">
        <THeaderSorter
          sorter={sorter}
          setSorter={setSorter}
          headerNames={[
            { name: 'Plataforma', arrow: true },
            { name: 'Cantidad', arrow: true },
            { name: 'Acciones', arrow: false },
          ]}
        />
        <tbody>
          {platformCounts.length === 0 ? (
            <tr>
              <td colSpan={3}>
                <h4 className="text-secondary">{t('No data found')}</h4>
              </td>
            </tr>
          ) : (
            <>
              {platformCounts.map((item, idx) => (
                <tr key={`platform-count-${idx}`}>
                  <td>{item.name}</td>
                  <td>{item.count}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => onViewModems(item)}
                      title="Ver dispositivos"
                    >
                      <i className="fas fa-list"></i>
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="table-info fw-bold">
                <td>Total</td>
                <td>{totalCount}</td>
                <td></td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ContentTable
