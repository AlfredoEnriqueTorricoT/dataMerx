import React, { useState } from 'react'
import { THeaderSorter } from 'components/tableElements'
import { PlatformCountModel } from '../models/PlatformCountModel'

interface ContentTableProps {
  platformCounts: PlatformCountModel[]
  isLoading: boolean
  t: (key: string) => string
}

const ContentTable: React.FC<ContentTableProps> = ({
  platformCounts,
  isLoading,
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
          ]}
        />
        <tbody>
          {platformCounts.length === 0 ? (
            <tr>
              <td colSpan={2}>
                <h4 className="text-secondary">{t('No data found')}</h4>
              </td>
            </tr>
          ) : (
            <>
              {platformCounts.map((item, idx) => (
                <tr key={`platform-count-${idx}`}>
                  <td>{item.name}</td>
                  <td>{item.count}</td>
                </tr>
              ))}
              <tr className="table-info fw-bold">
                <td>Total</td>
                <td>{totalCount}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ContentTable
