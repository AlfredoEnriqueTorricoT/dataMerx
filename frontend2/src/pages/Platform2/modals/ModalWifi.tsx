import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { FormikInput } from 'components/formElements'
import { showToast } from 'components/toast'
import { usePlatform, usePlatformFetch } from '../hooks'
import { PlatformModel, WifiModel, CreateWifiPayload } from '../models/PlatformModel'

interface ModalWifiProps {
  platform: PlatformModel
  onClose: () => void
  t: (key: string) => string
}

const ModalWifi: React.FC<ModalWifiProps> = ({ platform, onClose, t }) => {
  const [showAddForm, setShowAddForm] = useState(false)
  const { wifiList, isLoading } = usePlatform()
  const { fetchWifis, createWifi, deleteWifi, isOperating } = usePlatformFetch()

  useEffect(() => {
    fetchWifis(platform.id)
  }, [platform.id])

  const validateFunction = (values: { ssid: string; password: string }) => {
    const errors: { ssid?: string; password?: string } = {}
    if (!values.ssid) errors.ssid = 'SSID es requerido'
    if (!values.password) errors.password = 'Password es requerido'
    return errors
  }

  const submitFunction = async (values: { ssid: string; password: string }, { resetForm }: any) => {
    const payload: CreateWifiPayload = {
      ssid: values.ssid,
      password: values.password,
      platform_id: platform.id,
    }

    const result = await createWifi(payload)

    if (result.success) {
      showToast({ title: t('Success'), type: 'success', message: 'Wi-Fi agregado correctamente' })
      resetForm()
      setShowAddForm(false)
    } else {
      showToast({ title: t('Error'), type: 'warning', message: 'No se pudo agregar el Wi-Fi' })
    }
  }

  const handleDeleteWifi = async (wifi: WifiModel) => {
    const result = await deleteWifi(wifi.id)

    if (result.success) {
      showToast({ title: t('Success'), type: 'success', message: 'Wi-Fi eliminado correctamente' })
    } else {
      showToast({ title: t('Error'), type: 'warning', message: 'No se pudo eliminar el Wi-Fi' })
    }
  }

  return (
    <React.Fragment>
      <div className="modal-header">
        <h4>Redes Wi-Fi - {platform.name}</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        {isLoading ? (
          <div className="text-center py-3">
            <i className="fas fa-spinner fa-spin fa-2x"></i>
            <p className="mt-2">{t('Loading')}...</p>
          </div>
        ) : (
          <>
            {wifiList.length === 0 ? (
              <p className="text-muted text-center">No hay redes Wi-Fi registradas</p>
            ) : (
              <ul className="list-group mb-3">
                {wifiList.map((wifi) => (
                  <li key={wifi.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>
                      <i className="fas fa-wifi me-2"></i>
                      {wifi.ssid}
                    </span>
                    <button
                      className="btn button-sm py-0"
                      title="Eliminar Wi-Fi"
                      onClick={() => handleDeleteWifi(wifi)}
                      disabled={isOperating}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {showAddForm ? (
              <Formik
                onSubmit={submitFunction}
                initialValues={{ ssid: '', password: '' }}
                validate={validateFunction}
              >
                {({ handleSubmit: formikSubmit, isSubmitting: formikIsSubmitting }) => {
                  const loading = formikIsSubmitting || isOperating
                  return (
                    <div className="card p-3">
                      <form id="wifi_add_form" onSubmit={formikSubmit}>
                        <FormikInput
                          label="SSID"
                          inputName="ssid"
                          type="text"
                          required={true}
                          groupId="wifi_add_"
                        />
                        <FormikInput
                          label="Password"
                          inputName="password"
                          type="password"
                          required={true}
                          groupId="wifi_add_"
                        />
                        <div className="d-flex gap-2 mt-2">
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => setShowAddForm(false)}
                            disabled={loading}
                          >
                            {t('Cancel')}
                          </button>
                          <button
                            type="submit"
                            className="btn dm-button btn-sm text-light"
                            disabled={loading}
                          >
                            {loading ? 'Guardando...' : 'Guardar'}
                            {loading && <i className="fas fa-spinner fa-spin ms-2"></i>}
                          </button>
                        </div>
                      </form>
                    </div>
                  )
                }}
              </Formik>
            ) : (
              <button
                className="btn btn-sm dm-button text-light btn-label waves-effect waves-light w-100"
                onClick={() => setShowAddForm(true)}
              >
                <i className="fas fa-plus label-icon"></i>
                Agregar Wi-Fi
              </button>
            )}
          </>
        )}
      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>
          {t('Close')}
        </button>
      </div>
    </React.Fragment>
  )
}

export default ModalWifi
