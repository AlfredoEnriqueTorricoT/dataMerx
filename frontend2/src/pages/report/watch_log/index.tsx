import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '../../../components/Common/Breadcrumb'
import Header from './components/Header'
import ContentTable from './components/ContentTable'
import { useWatchLog, useWatchLogFetch } from './hooks'

const WatchLogPage: React.FC = () => {
  const { t } = useTranslation()

  // Hooks de WatchLog
  const { logs } = useWatchLog()
  const { fetchLogs, isLoading } = useWatchLogFetch()

  // Estado local UI
  const [searchTerm, setSearchTerm] = useState('')

  // Cargar datos al montar el componente
  useEffect(() => {
    document.title = 'Síguelo | Reporte Watch Log'
    fetchLogs()
  }, [])

  // Filtrar logs localmente por término de búsqueda
  const filteredLogs = logs.filter((log) => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return (
      log.watchCode?.toLowerCase().includes(term) ||
      log.macAddress?.toLowerCase().includes(term) ||
      log.id.toString().includes(term)
    )
  })

  return (
    <React.Fragment>
      <div className="page-content mb-0 pb-0">
        <div className="container">
          <Breadcrumbs title="Reportes" breadcrumbItem="Watch Log" />

          <div className="card">
            <div className="card-body">
              <Header
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onRefresh={fetchLogs}
                isLoading={isLoading}
                t={t}
              />

              <ContentTable
                logs={filteredLogs}
                isLoading={isLoading}
                t={t}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default WatchLogPage
