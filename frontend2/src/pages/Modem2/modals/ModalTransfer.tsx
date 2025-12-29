import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { FormikSelect } from 'components/formElements'
import { showToast } from 'components/toast'
import { useModemFetch } from '../hooks'
import { ModemModel, UserModel } from '../models/ModemModel'
import { ModemApiService } from '../services'

interface ModalTransferProps {
  modem: ModemModel
  onClose: () => void
  t: (key: string) => string
}

interface TransferFormValues {
  modem_id: number
  user_successor_id: number
  observation: string
}

const ModalTransfer: React.FC<ModalTransferProps> = ({ modem, onClose, t }) => {
  const [userList, setUserList] = useState<UserModel[]>([])
  const { transferModem, isOperating } = useModemFetch()
  const service = new ModemApiService()

  const userId = JSON.parse(localStorage.getItem('authUser') || '{}').id

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await service.getUsers()
      if (response.status === 200 && response.data) {
        setUserList(response.data)
      }
    }
    fetchUsers()
  }, [])

  const validateFunction = (values: TransferFormValues) => {
    const errors: any = {}
    if (!values.user_successor_id) errors.user_successor_id = 'Select a user'
    return errors
  }

  const submitFunction = async (values: TransferFormValues) => {
    const result = await transferModem({
      modem_id: values.modem_id,
      user_successor_id: values.user_successor_id,
    })

    if (result.success) {
      showToast({ title: 'Éxito', type: 'success', message: 'La solicitud de transferencia ha sido realizada' })
      onClose()
    } else {
      showToast({
        title: 'Error',
        type: 'warning',
        message: 'No se ha podido transferir',
      })
    }
  }

  return (
    <>
      <div className="modal-header">
        <h4>Transferir</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        <Formik
          onSubmit={submitFunction}
          initialValues={{
            modem_id: modem.id,
            user_successor_id: 0,
            observation: '',
          }}
          validate={validateFunction}
        >
          {() => (
            <Form id="modalTransferModem">
              <FormikSelect
                label="Usuario"
                inputName="user_successor_id"
                required={true}
                groupId="modemTransfer"
              >
                <option hidden value={0}>
                  {t('Select a user')}
                </option>
                {userList.length <= 1 ? (
                  <option disabled className="text-secondary" value="">
                    {t('No ') + t('users')}
                  </option>
                ) : (
                  userList.map((user, idx) =>
                    user.id === userId ? null : (
                      <option key={'user-' + idx} value={user.id}>
                        {user.name}
                      </option>
                    )
                  )
                )}
              </FormikSelect>

              <div className="row mb-2">
                <label htmlFor="modalTransferObservation" className="col-3 col-form-label">
                  Detalles
                </label>
                <div className="col-9">
                  <Field
                    as="textarea"
                    className="form-control"
                    id="modalTransferObservation"
                    name="observation"
                  />
                </div>
              </div>
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
            disabled={isOperating}
            form="modalTransferModem"
            type="submit"
          >
            {isOperating && <i className="fas fa-spinner fa-spin me-2"></i>}
            Transferir
            <i className="fas fa-exchange-alt label-icon"></i>
          </button>
        </div>
      </div>
    </>
  )
}

export default ModalTransfer
