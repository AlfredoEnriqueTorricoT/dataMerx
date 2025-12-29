import React, { useEffect, useState } from 'react'
import { SpinnerL } from 'components/components'
import { ErrorTable } from 'components/tableElements'
import { useUserFetch, useUser } from '../hooks'
import { UserModel } from '../models/UserModel'

interface ModalPermissionsProps {
  user: UserModel
  onClose: () => void
  t: (key: string) => string
}

const viewPermissions = [
  { name: 'Platforms', code: 'platforms' },
  { name: 'Users', code: 'users' },
  { name: 'Watches', code: 'watchs' },
  { name: 'Modems', code: 'modems' },
  { name: 'Sims', code: 'sims' },
  { name: 'Cars', code: 'cars' },
]

const settingsPermissions = [{ name: 'Admin', code: 'responsability_admin' }]

const ModalPermissions: React.FC<ModalPermissionsProps> = ({ user, onClose, t }) => {
  const [modalStatus, setModalStatus] = useState<0 | 1 | 2>(0) // 0: loading, 1: success, 2: error
  const [activePermissions, setActivePermissions] = useState<string[]>([])
  const { fetchUserPermissions, togglePermission } = useUserFetch()
  const { permissionsList } = useUser()

  useEffect(() => {
    loadPermissions()
  }, [user.id])

  useEffect(() => {
    if (modalStatus === 1) {
      setActivePermissions(permissionsList.map((p) => p.name))
    }
  }, [permissionsList, modalStatus])

  const loadPermissions = async () => {
    setModalStatus(0)
    const result = await fetchUserPermissions(user.id)
    setModalStatus(result.success ? 1 : 2)
  }

  const handleTogglePermission = async (permissionCode: string) => {
    // Optimistic update
    if (activePermissions.includes(permissionCode)) {
      setActivePermissions(activePermissions.filter((p) => p !== permissionCode))
    } else {
      setActivePermissions([...activePermissions, permissionCode])
    }

    await togglePermission({
      user_id: user.id,
      permission: permissionCode,
    })
  }

  const renderContent = () => {
    switch (modalStatus) {
      case 0:
        return (
          <div className="p-4">
            <SpinnerL />
          </div>
        )

      case 1:
        return (
          <>
            <h5 className="mb-3">Vistas</h5>
            <div className="row">
              {viewPermissions.map((permission, idx) => (
                <div className="col-6" key={`view-${idx}`}>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      checked={activePermissions.includes(permission.code)}
                      id={`permission-view-${idx}`}
                      onChange={() => handleTogglePermission(permission.code)}
                      type="checkbox"
                    />
                    <label className="form-check-label" htmlFor={`permission-view-${idx}`}>
                      {t(permission.name)}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h5 className="mt-4 mb-3">Configuraciones</h5>
            <div className="row">
              {settingsPermissions.map((permission, idx) => (
                <div className="col-6" key={`settings-${idx}`}>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      checked={activePermissions.includes(permission.code)}
                      id={`permission-settings-${idx}`}
                      onChange={() => handleTogglePermission(permission.code)}
                      type="checkbox"
                    />
                    <label className="form-check-label" htmlFor={`permission-settings-${idx}`}>
                      {t(permission.name)}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </>
        )

      case 2:
        return (
          <div className="p-4">
            <ErrorTable cod={500} retryFunction={loadPermissions} />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      <div className="modal-header">
        <h4>Permisos de usuario</h4>
        <button type="button" onClick={onClose} className="btn-close" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        <div className="mb-3 pb-2 border-bottom">
          <small className="text-muted">
            <i className="fas fa-user me-1"></i>
            <strong>{user.name}</strong> - {user.email}
          </small>
        </div>
        {renderContent()}
      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>
          <i className="fas fa-times me-1"></i>
          Cerrar
        </button>
      </div>
    </>
  )
}

export default ModalPermissions
