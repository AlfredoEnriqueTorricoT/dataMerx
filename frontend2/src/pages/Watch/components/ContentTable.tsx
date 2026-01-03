import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { THeaderSorter } from 'components/tableElements'
import { WatchModel } from '../models/WatchModel'

interface ContentTableProps {
  watches: WatchModel[]
  isLoading: boolean
  onEdit: (watch: WatchModel) => void
  onDelete: (watch: WatchModel) => void
  onSettings: (watch: WatchModel) => void
  t: (key: string) => string
}

const ContentTable: React.FC<ContentTableProps> = ({
  watches,
  isLoading,
  onEdit,
  onDelete,
  onSettings,
  t,
}) => {
  const history = useHistory()
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
            { name: 'Código', arrow: true },
            { name: 'Imei', arrow: true },
            { name: 'Nombre', arrow: true },
            { name: 'Device id', arrow: true },
            { name: 'Plataforma', arrow: true },
            { name: 'Acciones', arrow: false },
          ]}
        />
        <tbody>
          {watches.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <h4 className="text-secondary">{t('No watches found')}</h4>
              </td>
            </tr>
          ) : (
            watches.map((watch, idx) => (
              <tr key={`watch-item-${idx}`}>
                <td>{watch.code}</td>
                <td>{watch.imei}</td>
                <td>{watch.deviceName || '- - -'}</td>
                <td>{watch.sigueloDeviceId || '- - -'}</td>
                <td>{watch.platformName || '- - -'}</td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn button-sm py-0"
                      title="Editar reloj"
                      onClick={() => onEdit(watch)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn button-sm py-0"
                      title="Ver eventos"
                      onClick={() => history.push(`/watch/${watch.id}/events`)}
                    >
                      <i className="fas fa-tasks"></i>
                    </button>
                    <button
                      className="btn button-sm py-0"
                      title="Configurar reloj"
                      onClick={() => onSettings(watch)}
                    >
                      <i className="fas fa-wrench"></i>
                    </button>
                    <button
                      className="btn button-sm py-0"
                      title="Eliminar reloj"
                      onClick={() => onDelete(watch)}
                    >
                      <i className="fas fa-trash-alt"></i>
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
