import React, { useState } from 'react'
import { SpinnerL } from 'components/components'
import { THeaderSorter } from 'components/tableElements'
import { UserModel, ModalType } from '../models/UserModel'

interface ContentTableProps {
  users: UserModel[]
  isLoading: boolean
  onOpenModal: (type: ModalType, user?: UserModel) => void
  t: (key: string) => string
}

const ContentTable: React.FC<ContentTableProps> = ({ users, isLoading, onOpenModal, t }) => {
  const [sorter, setSorter] = useState<number>(1)

  const handleSort = (columnId: number) => {
    if (Math.abs(sorter) === columnId) {
      setSorter(-sorter)
    } else {
      setSorter(columnId)
    }
  }

  const sortedUsers = [...users].sort((a, b) => {
    const direction = sorter > 0 ? 1 : -1
    const column = Math.abs(sorter)

    switch (column) {
      case 1:
        return direction * (a.name || '').localeCompare(b.name || '')
      case 2:
        return direction * (a.email || '').localeCompare(b.email || '')
      default:
        return 0
    }
  })

  if (isLoading) {
    return <SpinnerL />
  }

  return (
    <div className="grayScroll table-responsive" style={{ maxHeight: '55vh', overflow: 'auto' }}>
      <table className="table table-striped">
        <thead>
          <tr>
            <THeaderSorter
              label={t('Name')}
              columnId={1}
              currentSorter={sorter}
              onSort={handleSort}
            />
            <THeaderSorter
              label="Email"
              columnId={2}
              currentSorter={sorter}
              onSort={handleSort}
            />
            <th>
              <b>Acciones</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.length === 0 ? (
            <tr>
              <td colSpan={3}>
                <h4 className="text-secondary">{t('No users found')}</h4>
              </td>
            </tr>
          ) : (
            sortedUsers.map((user) => (
              <tr key={`user-${user.id}`}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-sm"
                    onClick={() => onOpenModal('Edit', user)}
                    title="Editar usuario"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-sm"
                    onClick={() => onOpenModal('Permissions', user)}
                    title="Permisos de usuario"
                  >
                    <i className="fas fa-tasks"></i>
                  </button>
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
