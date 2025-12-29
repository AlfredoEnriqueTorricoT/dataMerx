import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import { FormikSelect } from 'components/formElements'
import { showToast } from 'components/toast'
import { useModem, useModemFetch } from '../hooks'
import { FilterItem, UserModel } from '../models/ModemModel'
import { ModemApiService } from '../services'

interface ModalFilterProps {
  isTabletOrMobile: boolean
  onClose: () => void
  onApplyFilter: (filters: FilterItem[], lastSearch: 'my' | 'filter') => void
  t: (key: string) => string
}

interface FilterFormValues {
  platformId: number
  userResponsabilityId: number
}

const ModalFilter: React.FC<ModalFilterProps> = ({
  isTabletOrMobile,
  onClose,
  onApplyFilter,
  t,
}) => {
  const [userList, setUserList] = useState<UserModel[]>([])
  const { platformList } = useModem()
  const { fetchModems, isLoading } = useModemFetch()
  const service = new ModemApiService()

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await service.getUsers()
      if (response.status === 200 && response.data) {
        setUserList(response.data)
      }
    }
    fetchUsers()
  }, [])

  const validateFunction = (values: FilterFormValues) => {
    const errors: Partial<Record<keyof FilterFormValues, string>> = {}
    if (!values.userResponsabilityId && !values.platformId) {
      errors.userResponsabilityId = 'Select a user or a platform'
      errors.platformId = 'Select a user or a platform'
    }
    return errors
  }

  const searchMyModems = async () => {
    const result = await fetchModems()
    if (result.success) {
      onApplyFilter([], 'my')
      onClose()
    } else {
      showToast({ title: 'Error', type: 'warning', message: 'No se pudo obtener los módems' })
    }
  }

  const submitFunction = async (values: FilterFormValues) => {
    // Construir filtros seleccionados
    const newFilters: FilterItem[] = []

    if (values.userResponsabilityId) {
      const user = userList.find((u) => u.id === values.userResponsabilityId)
      if (user) {
        newFilters.push({ id: user.id, name: user.name, type: 'user' })
      }
    }

    if (values.platformId) {
      const platform = platformList.find((p) => p.id === values.platformId)
      if (platform) {
        newFilters.push({ id: platform.id, name: platform.name, type: 'platform' })
      }
    }

    onApplyFilter(newFilters, 'filter')
    onClose()
  }

  return (
    <>
      <div className="modal-header">
        <h4>Filtrar</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        <Formik
          onSubmit={submitFunction}
          initialValues={{
            platformId: 0,
            userResponsabilityId: 0,
          }}
          validate={validateFunction}
        >
          {() => (
            <Form id="modalFilterModem">
              {isTabletOrMobile && (
                <button
                  type="button"
                  className="btn dm-button text-light col-12 mb-2"
                  disabled={isLoading}
                  onClick={searchMyModems}
                >
                  {t('My modems')}
                </button>
              )}

              <FormikSelect
                label="Plataforma"
                inputName="platformId"
                required={false}
                groupId="modemFilter"
              >
                <option hidden value={0}>
                  {t('Select a platform')}
                </option>
                {platformList.length === 0 ? (
                  <option disabled className="text-secondary" value="">
                    {t('No ') + t('platforms')}
                  </option>
                ) : (
                  platformList.map((platform, idx) => (
                    <option key={'platform-' + idx} value={platform.id}>
                      {platform.name}
                    </option>
                  ))
                )}
              </FormikSelect>

              <FormikSelect
                label="Usuario"
                inputName="userResponsabilityId"
                required={false}
                groupId="modemFilter"
              >
                <option hidden value={0}>
                  {t('Select a user')}
                </option>
                {userList.length === 0 ? (
                  <option disabled className="text-secondary" value="">
                    {t('No ') + t('users')}
                  </option>
                ) : (
                  userList.map((user, idx) => (
                    <option key={'user-' + idx} value={user.id}>
                      {user.name}
                    </option>
                  ))
                )}
              </FormikSelect>
            </Form>
          )}
        </Formik>
      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>
          {t('Cancel')}
        </button>
        <div className="ms-auto">
          <button
            className="btn dm-button btn-label text-light"
            disabled={isLoading}
            form="modalFilterModem"
            type="submit"
          >
            {isLoading && <i className="fas fa-spinner fa-spin me-2"></i>}
            Filtrar
            <i className="fas fa-filter label-icon"></i>
          </button>
        </div>
      </div>
    </>
  )
}

export default ModalFilter
