import React, { useState, useEffect } from 'react'
import { tableFilter, tableSorter } from 'components/tableFilter'
import { ErrorTable } from 'components/tableElements'
import { ModemEventModel } from '../models/ModemModel'

interface EventsTableProps {
  events: ModemEventModel[]
  isLoading: boolean
  isError: boolean
  modemCode: string
  onRetry: () => void
  onBack: () => void
  t: (key: string) => string
}

const formatDateTime = (date: string): string => {
  const fecha = new Date(date)

  const addZero = (num: number): string => {
    return num > 9 ? String(num) : '0' + num
  }

  const _year = fecha.getFullYear()
  const _month = fecha.getMonth() + 1
  const _day = fecha.getDate()
  const _hour = fecha.getHours()
  const _minute = fecha.getMinutes()

  const DMY = addZero(_day) + '/' + addZero(_month) + '/' + _year
  const HM = _hour + ':' + addZero(_minute)

  return HM + '     ' + DMY
}

interface EventDataShowProps {
  title: string
  desc: string
}

const EventDataShow: React.FC<EventDataShowProps> = ({ title, desc }) => {
  return (
    <div className="row mb-1">
      <div className="col-6">
        <b>{title}</b>
      </div>
      <div className="col-6">{desc}</div>
    </div>
  )
}

const eventIcons = ['info-circle', 'exclamation-circle', 'exclamation-triangle']
const eventBg = ['info', 'warning', 'danger']

const EventsTable: React.FC<EventsTableProps> = ({
  events,
  isLoading,
  isError,
  modemCode,
  onRetry,
  onBack,
  t,
}) => {
  const [filter, setFilter] = useState('')
  const [tableFiltered, setTableFiltered] = useState<ModemEventModel[]>([])

  const keysToSort = [
    'title',
    'detail',
    'typeId',
    'carId',
    'modemId',
    'simId',
    'platformId',
    'userId',
    'createdAt',
  ]

  useEffect(() => {
    if (filter === '') {
      setTableFiltered(events)
    } else {
      setTableFiltered(tableFilter(events, filter, keysToSort))
    }
  }, [filter, events])

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <i className="fas fa-spinner fa-spin fa-2x"></i>
        <p className="mt-2">{t('Loading')}...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <ErrorTable cod={500} retryFunction={onRetry}>
        {t('Retry')}
      </ErrorTable>
    )
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="card-title mb-4 h4">{t('Events of modem ') + modemCode}</div>
          <div className="d-flex mb-3">
            <div className="input-group" style={{ maxWidth: '300px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Filtrar eventos..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <div className="input-group-append">
                <button className="btn dm-button text-light" disabled>
                  <i className="fas fa-filter"></i>
                </button>
              </div>
            </div>
            <button className="btn dm-button text-light ms-auto" onClick={onBack}>
              <i className="fas fa-arrow-left me-2"></i>
              {t('Back')}
            </button>
          </div>
        </div>
      </div>

      {tableFiltered.length === 0 ? (
        <div className="card">
          <div className="card-body py-5">
            <center>
              <h4 className="text-secondary">{t('No events')}</h4>
            </center>
          </div>
        </div>
      ) : (
        <div className="container grayScroll" style={{ maxHeight: '55vh', overflow: 'auto' }}>
          {tableFiltered.map((listItem, idx) => (
            <div className="card" key={`event-card-${idx}`}>
              <div className="card-body">
                <div
                  className={`card-title bg-${eventBg[(listItem.typeId || 1) - 1]} bg-soft d-flex p-2`}
                >
                  <i className={`fas fa-${eventIcons[(listItem.typeId || 1) - 1]} me-5 pt-1`}></i>
                  {listItem.title}
                  <div className="ms-auto">{formatDateTime(listItem.createdAt)}</div>
                </div>

                <div className="row">
                  <div className="col-5 col-sm-6 col-md-7 col-lg-7 col-xl-7">
                    {listItem.detail} <br />
                    <button className="btn btn-primary btn-sm btn-label mt-2">
                      <i className="fas fa-camera label-icon"></i>
                      Agregar foto
                    </button>
                  </div>
                  <div className="col-7 col-sm-6 col-md-5 col-lg-5 col-xl-5">
                    {listItem.car && (
                      <EventDataShow title={t('Car')} desc={listItem.car.name || ''} />
                    )}
                    {listItem.modem && (
                      <EventDataShow title={t('Modem')} desc={listItem.modem.code || ''} />
                    )}
                    {listItem.sim && (
                      <EventDataShow title={t('Sim')} desc={listItem.sim.number || ''} />
                    )}
                    {listItem.platform && (
                      <EventDataShow title={t('Platform')} desc={listItem.platform.name || ''} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default EventsTable
