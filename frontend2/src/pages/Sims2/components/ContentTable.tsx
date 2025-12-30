import React, { useState, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { DropdownButton, THeaderSorter, EmptyData } from 'components/tableElements'
import { tableSorter } from 'components/tableFilter'
import { SimModel, ModalType } from '../models/SimModel'

interface ContentTableProps {
  sims: SimModel[]
  isLoading: boolean
  onOpenModal: (type: ModalType, sim?: SimModel) => void
  t: (key: string) => string
}

interface SimDisplay {
  id: number
  number: string
  imei: string
  active: string
  original: SimModel
}

const keysToSort = ['number', 'imei', 'active']

const ContentTable: React.FC<ContentTableProps> = ({ sims, isLoading, onOpenModal, t }) => {
  const history = useHistory()
  const [sorter, setSorter] = useState(1)
  const [tableFiltered, setTableFiltered] = useState<SimDisplay[]>([])

  const simDisplayList = useMemo((): SimDisplay[] => {
    return sims.map((sim) => ({
      id: sim.id,
      number: sim.number,
      imei: sim.imei,
      active: sim.active ? 'activo' : 'inactivo',
      original: sim,
    }))
  }, [sims])

  useEffect(() => {
    setTableFiltered(simDisplayList)
  }, [simDisplayList])

  useEffect(() => {
    if (tableFiltered.length > 0) {
      const key = keysToSort[Math.abs(sorter) - 1]
      const multiplier = sorter / Math.abs(sorter)
      setTableFiltered(tableSorter([...tableFiltered], key, multiplier))
    }
  }, [sorter])

  const handleSetSorter = (numero: number) => {
    Math.abs(sorter) === numero ? setSorter(sorter * -1) : setSorter(numero)
  }

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
          setSorter={handleSetSorter}
          headerNames={[
            { name: 'Número', arrow: true },
            { name: 'Imei', arrow: true },
            { name: 'Estado', arrow: true },
            { name: 'Acciones', arrow: false },
          ]}
        />
        <tbody>
          {tableFiltered.length === 0 ? (
            <tr>
              <td colSpan={4}>
                <h4 className="text-secondary">{t('No sims found')}</h4>
              </td>
            </tr>
          ) : (
            tableFiltered.map((listItem, idx) => (
              <tr key={`sim-item-${idx}`}>
                <td>{listItem.number}</td>
                <td>{listItem.imei}</td>
                <td>
                  <span
                    className={`badge font-size-11 rounded-pill badge-soft-${
                      listItem.active === 'activo' ? 'success' : 'dark'
                    } text-uppercase`}
                  >
                    {listItem.active}
                  </span>
                </td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn button-sm py-0"
                      title="Ver detalles"
                      onClick={() => onOpenModal('Details', listItem.original)}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      className="btn button-sm mx-2 py-0"
                      title="Ver eventos"
                      onClick={() => history.push(`/sim/${listItem.id}/events`)}
                    >
                      <i className="fas fa-tasks"></i>
                    </button>
                    <DropdownButton
                      className="btn button-sm py-0"
                      title={<i className="mdi mdi-dots-horizontal font-size-18" />}
                      buttons={[
                        {
                          title: 'Editar sim',
                          onClick: () => onOpenModal('Edit', listItem.original),
                        },
                        {
                          title: (listItem.active === 'activo' ? 'Desactivar' : 'Activar') + ' sim',
                          onClick: () => onOpenModal('ChangeStatus', listItem.original),
                        },
                        {
                          title: 'Añadir evento',
                          onClick: () => onOpenModal('AddEvent', listItem.original),
                        },
                        {
                          title: 'Añadir imágenes',
                          onClick: () => onOpenModal('AddImages', listItem.original),
                        },
                      ]}
                    />
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
