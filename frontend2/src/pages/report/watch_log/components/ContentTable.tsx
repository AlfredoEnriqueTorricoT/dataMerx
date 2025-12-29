import React, { useState } from 'react'
import { THeaderSorter } from 'components/tableElements'
import { WatchLogModel } from '../models/WatchLogModel'

interface ContentTableProps {
  logs: WatchLogModel[]
  isLoading: boolean
  t: (key: string) => string
}

const ContentTable: React.FC<ContentTableProps> = ({ logs, isLoading, t }) => {
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
            { name: 'ID', arrow: true },
            { name: 'Código Reloj', arrow: true },
            { name: 'MAC Address', arrow: true },
            { name: 'Fecha Creación', arrow: true },
          ]}
        />
        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan={4}>
                <h4 className="text-secondary">{t('No records found')}</h4>
              </td>
            </tr>
          ) : (
            logs.map((log, idx) => (
              <tr key={`watchlog-item-${idx}`}>
                <td>{log.id}</td>
                <td><span className="badge bg-primary">{log.watchCode}</span></td>
                <td>{log.macAddress}</td>
                <td>{log.createdAt}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ContentTable
