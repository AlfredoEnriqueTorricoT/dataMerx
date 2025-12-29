import React, { useState } from 'react'
import { THeaderSorter } from 'components/tableElements'
import { PlatformModel } from '../models/PlatformModel'

interface ContentTableProps {
  platforms: PlatformModel[]
  isLoading: boolean
  onEdit: (platform: PlatformModel) => void
  onWifi: (platform: PlatformModel) => void
  t: (key: string) => string
}

const ContentTable: React.FC<ContentTableProps> = ({
  platforms,
  isLoading,
  onEdit,
  onWifi,
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
            { name: t('Website'), arrow: true },
            { name: 'Email', arrow: true },
            { name: t('Actions'), arrow: false },
          ]}
        />
        <tbody>
          {platforms.length === 0 ? (
            <tr>
              <td colSpan={5}>
                <h4 className="text-secondary">{t('No platforms found')}</h4>
              </td>
            </tr>
          ) : (
            platforms.map((platform, idx) => (
              <tr key={`platform-item-${idx}`}>
                <td>{platform.name}</td>
                <td>{platform.detail || '- - -'}</td>
                <td>
                  {platform.url ? (
                    <a href={platform.url} target="_blank" rel="noopener noreferrer">
                      {platform.url}
                    </a>
                  ) : (
                    '- - -'
                  )}
                </td>
                <td>{platform.email || '- - -'}</td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn button-sm py-0"
                      title="Editar plataforma"
                      onClick={() => onEdit(platform)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn button-sm py-0"
                      title="Redes Wi-Fi"
                      onClick={() => onWifi(platform)}
                    >
                      <i className="fas fa-wifi"></i>
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
