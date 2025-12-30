import React, { useState, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import Avatar from 'react-avatar'
import { DropdownButton, THeaderSorter, EmptyData } from 'components/tableElements'
import { tableSorter } from 'components/tableFilter'
import { ModemModel, ModalType } from '../models/ModemModel'

interface ContentTableProps {
  modems: ModemModel[]
  isLoading: boolean
  onOpenModal: (type: ModalType, modem?: ModemModel) => void
  t: (key: string) => string
}

interface ModemDisplay {
  id: number
  code: string
  imei: string
  active: string
  platformId: number | null
  platformName: string | null
  markModemName: string | null
  markId: number | null
  isPending: number
  userResponsabilityId: number | null
  userSuccessorId: number | null
  responsability: { name: string } | null
  simNumber: string | null
  original: ModemModel
}

const keysToSort = ['code', 'imei', 'markModemName', 'platformName', 'responsability', 'active']

const ContentTable: React.FC<ContentTableProps> = ({ modems, isLoading, onOpenModal, t }) => {
  const history = useHistory()
  const [sorter, setSorter] = useState(1)
  const [tableFiltered, setTableFiltered] = useState<ModemDisplay[]>([])

  const userId = JSON.parse(localStorage.getItem('authUser') || '{}').id
  const resAdmin = JSON.parse(localStorage.getItem('userPermission') || '[]').includes(
    'responsability_admin'
  )

  const modemDisplayList = useMemo((): ModemDisplay[] => {
    return modems.map((modem) => ({
      id: modem.id,
      code: modem.code,
      imei: modem.imei,
      active: modem.active ? 'activo' : 'inactivo',
      platformId: modem.platform?.id || null,
      platformName: modem.platform?.name || null,
      markModemName: modem.modemsMark?.name || null,
      markId: modem.modemsMark?.id || null,
      isPending: modem.isPending,
      userResponsabilityId: modem.userResponsabilityId,
      userSuccessorId: modem.userSuccessorId,
      responsability: modem.responsability,
      simNumber: modem.sim?.number || null,
      original: modem,
    }))
  }, [modems])

  useEffect(() => {
    setTableFiltered(modemDisplayList)
  }, [modemDisplayList])

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

  const requestResponsabilityStyle = (id: number | null, idx: number) => {
    if (idx % 2 === 0) {
      if (id === userId) return { background: '#C5E7E4' }
      else return { background: '#F8F9FA' }
    } else {
      if (id === userId) return { background: '#E4EFEE' }
      else return { background: '#FFFFFF' }
    }
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
      <table className="table">
        <THeaderSorter
          sorter={sorter}
          setSorter={handleSetSorter}
          headerNames={[
            { name: 'Código', arrow: true },
            { name: 'Imei', arrow: true },
            { name: 'Marca de módem', arrow: true },
            { name: 'Plataforma', arrow: true },
            { name: 'Rsp.', arrow: true },
            { name: 'Estado', arrow: true },
            { name: 'Acciones', arrow: false },
          ]}
        />
        <tbody>
          {tableFiltered.length === 0 ? (
            <tr>
              <td colSpan={7}>
                <h4 className="text-secondary">{t('No modems found')}</h4>
              </td>
            </tr>
          ) : (
            tableFiltered.map((listItem, idx) => (
              <tr
                style={requestResponsabilityStyle(listItem.userSuccessorId, idx)}
                key={`modem-item-${idx}`}
              >
                <td>{listItem.code}</td>
                <td>{listItem.imei}</td>
                <td>{listItem.markModemName || <EmptyData />}</td>
                <td>{listItem.platformName || <EmptyData />}</td>
                <td className="pt-2">
                  {listItem.responsability ? (
                    <Avatar name={listItem.responsability.name} size="30px" round />
                  ) : (
                    '- - -'
                  )}
                </td>
                <td>
                  <span
                    className={`badge font-size-11 rounded-pill badge-soft-${
                      listItem.active[0] === 'a' ? 'success' : 'dark'
                    } text-uppercase`}
                  >
                    {listItem.active}
                  </span>
                </td>
                <td>
                  <div className="btn-group">
                    {listItem.userResponsabilityId === userId && listItem.isPending && (
                      <button
                        className="btn btn-danger button-sm py-0"
                        title="Anular transferencia"
                        onClick={() => onOpenModal('CancelTransfer', listItem.original)}
                      >
                        <i className="fas fa-backspace"></i>
                      </button>
                    )}
                    {listItem.userSuccessorId === userId && (
                      <button
                        className="btn btn-success button-sm py-0"
                        title="Solicitud de transferencia pendiente"
                        onClick={() => onOpenModal('TransferRequest', listItem.original)}
                      >
                        <i className="fas fa-exchange-alt"></i>
                      </button>
                    )}
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
                      onClick={() => history.push(`/modem/${listItem.id}/events`)}
                    >
                      <i className="fas fa-tasks"></i>
                    </button>
                    <DropdownButton
                      className="btn button-sm py-0"
                      title={<i className="mdi mdi-dots-horizontal font-size-18" />}
                      buttons={[
                        {
                          title: 'Editar módem',
                          onClick: () => onOpenModal('Edit', listItem.original),
                        },
                        {
                          title: 'Tarjeta sim',
                          onClick: () => onOpenModal('Sim', listItem.original),
                        },
                        {
                          title:
                            (listItem.active === 'activo' ? 'Desactivar' : 'Activar') + ' módem',
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
                        {
                          title: listItem.isPending ? 'Anular transferencia' : 'Transferir',
                          hidden: !(
                            listItem.userResponsabilityId === userId ||
                            (resAdmin && listItem.userResponsabilityId === null)
                          ),
                          onClick: () =>
                            onOpenModal(
                              listItem.isPending ? 'CancelTransfer' : 'Transfer',
                              listItem.original
                            ),
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
