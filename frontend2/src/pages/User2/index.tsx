import React, { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import { Modal } from 'reactstrap'

import Breadcrumbs from '../../components/Common/Breadcrumb'
import { Header, ContentTable } from './components'
import { ModalIndex } from './modals'
import { useUser, useUserFetch } from './hooks'
import { UserModel, ModalType } from './models/UserModel'

interface UserPageProps {
  t: (key: string) => string
}

const _crudName = { single: 'user', multiple: 'users', cod: 'user' }

const UserPage: React.FC<UserPageProps> = ({ t }) => {
  // Search state
  const [searchTerm, setSearchTerm] = useState('')

  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [modalType, setModalType] = useState<ModalType | null>(null)
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null)

  // Hooks
  const { userList, isLoaded } = useUser()
  const { fetchUsers, isLoading } = useUserFetch()

  // Initial data fetch
  useEffect(() => {
    document.title = 'Síguelo | Usuarios'
    if (!isLoaded) {
      fetchUsers()
    }
  }, [isLoaded])

  // Open modal handler
  const handleOpenModal = (type: ModalType, user?: UserModel) => {
    setModalType(type)
    setSelectedUser(user || null)

    if (type === 'Permissions') {
      setModalSize('md')
    } else {
      setModalSize('md')
    }

    setModalOpen(true)
  }

  // Close modal handler
  const handleCloseModal = () => {
    setModalOpen(false)
    setModalType(null)
    setSelectedUser(null)
  }

  // Filter users locally
  const filteredUsers = userList.filter((user) => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return (
      user.name?.toLowerCase().includes(term) || user.email?.toLowerCase().includes(term)
    )
  })

  // Search handlers
  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term)
  }

  return (
    <>
      <div className="page-content mb-0 pb-0">
        <div className="container">
          <Breadcrumbs title="Cuadros de mando" breadcrumbItem={t(_crudName.multiple)} />

          <div className="card">
            <div className="card-body">
              <div className="card-title mb-4 h4">
                {t('List of') + ' ' + t(_crudName.multiple)}
              </div>

              <Header
                isLoading={isLoading}
                searchTerm={searchTerm}
                onSearchTermChange={handleSearchTermChange}
                onAddClick={() => handleOpenModal('Add')}
                t={t}
              />

              <ContentTable
                users={filteredUsers}
                isLoading={isLoading}
                onOpenModal={handleOpenModal}
                t={t}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} size={modalSize}>
        <ModalIndex
          modalType={modalType}
          selectedUser={selectedUser}
          onClose={handleCloseModal}
          t={t}
        />
      </Modal>
    </>
  )
}

export default withTranslation()(UserPage)
