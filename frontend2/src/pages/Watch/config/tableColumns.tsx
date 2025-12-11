import React from 'react'
import { Badge } from 'reactstrap'
import { WatchModel } from '../models/WatchModel'

export interface TableColumn {
  key: string
  label: string
  sortable: boolean
  cell?: (watch: WatchModel) => React.ReactNode
}

export const watchTableColumns: TableColumn[] = [
  {
    key: 'code',
    label: 'Código',
    sortable: true,
    cell: (watch: WatchModel) => watch.code,
  },
  {
    key: 'imei',
    label: 'IMEI',
    sortable: true,
    cell: (watch: WatchModel) => watch.imei,
  },
  {
    key: 'deviceName',
    label: 'Nombre',
    sortable: true,
    cell: (watch: WatchModel) => watch.deviceName || '-',
  },
  {
    key: 'sigueloDeviceId',
    label: 'Device ID',
    sortable: true,
    cell: (watch: WatchModel) => watch.sigueloDeviceId || '-',
  },
  {
    key: 'platformName',
    label: 'Plataforma',
    sortable: true,
    cell: (watch: WatchModel) => watch.platformName || '-',
  },
  {
    key: 'isPending',
    label: 'Estado',
    sortable: true,
    cell: (watch: WatchModel) => (
      <Badge color={watch.isPending ? 'warning' : 'success'}>
        {watch.isPending ? 'Pendiente' : 'Configurado'}
      </Badge>
    ),
  },
]

// Columnas para vista móvil (menos columnas)
export const watchTableColumnsMobile: TableColumn[] = [
  {
    key: 'code',
    label: 'Código',
    sortable: true,
    cell: (watch: WatchModel) => watch.code,
  },
  {
    key: 'imei',
    label: 'IMEI',
    sortable: false,
    cell: (watch: WatchModel) => watch.imei,
  },
  {
    key: 'isPending',
    label: 'Estado',
    sortable: false,
    cell: (watch: WatchModel) => (
      <Badge color={watch.isPending ? 'warning' : 'success'} className="font-size-11">
        {watch.isPending ? 'Pendiente' : 'OK'}
      </Badge>
    ),
  },
]
