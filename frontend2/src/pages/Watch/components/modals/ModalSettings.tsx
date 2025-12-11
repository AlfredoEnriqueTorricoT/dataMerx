import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { FormikInput, FormikSelect } from 'components/formElements'
import { configureWatchSchema } from '../../validations'
import { WatchModel, ConfigureWatchPayload } from '../../models/WatchModel'
import { httpRequestWithAuth } from '../../../../shared/utils/httpService'

interface Platform {
  id: number
  name: string
}

interface ModalSettingsProps {
  watch: WatchModel
  onSubmit: (payload: ConfigureWatchPayload) => Promise<{ success: boolean; message: string }>
  onClose: () => void
  isSubmitting: boolean
  t: (key: string) => string
}

const ModalSettings: React.FC<ModalSettingsProps> = ({
  watch,
  onSubmit,
  onClose,
  isSubmitting,
  t,
}) => {
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [loadingPlatforms, setLoadingPlatforms] = useState(false)

  useEffect(() => {
    const fetchPlatforms = async () => {
      const result = await httpRequestWithAuth.get<{ data: Platform[] }>('platform', setLoadingPlatforms)
      if (result.data) {
        setPlatforms(result.data.data || [])
      }
    }
    fetchPlatforms()
  }, [])

  const handleSubmit = async (values: { platform_id: string; device_imei: string }) => {
    const payload: ConfigureWatchPayload = {
      id: watch.id,
      platform_id: parseInt(values.platform_id, 10),
      device_imei: values.device_imei,
    }
    const result = await onSubmit(payload)
    if (result.success) {
      onClose()
    }
  }

  return (
    <React.Fragment>
      <div className="modal-header">
        <h4>Configurar reloj</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          platform_id: '',
          device_imei: '',
        }}
        validationSchema={configureWatchSchema}
      >
        {({ handleSubmit: formikSubmit, isSubmitting: formikIsSubmitting }) => {
          const loading = formikIsSubmitting || isSubmitting
          return (
            <>
              <div className="modal-body">
                <form id="watch_settings_form" onSubmit={formikSubmit}>
                  <FormikSelect
                    label={t('Platform')}
                    inputName="platform_id"
                    required={true}
                    groupId="watch_settings_"
                    disabled={loadingPlatforms}
                  >
                    <option disabled value="" hidden>
                      {loadingPlatforms
                        ? `${t('Loading')} ${t('platforms')}...`
                        : 'Seleccione una plataforma'}
                    </option>
                    {platforms.length > 0 ? (
                      platforms.map((platform) => (
                        <option key={platform.id} value={platform.id}>
                          {platform.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>Sin plataformas</option>
                    )}
                  </FormikSelect>
                  <FormikInput
                    label="Imei"
                    inputName="device_imei"
                    type="number"
                    required={true}
                    groupId="watch_settings_"
                  />
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onClose} disabled={loading}>
                  {t('Cancel')}
                </button>
                <div className="ms-auto">
                  <button
                    className="btn dm-button btn-label text-light"
                    disabled={loading}
                    form="watch_settings_form"
                    type="submit"
                  >
                    {loading ? 'Configurando...' : 'Configurar'}
                    <i className={`fas fa-${loading ? 'spinner fa-spin' : 'wrench'} label-icon`}></i>
                  </button>
                </div>
              </div>
            </>
          )
        }}
      </Formik>
    </React.Fragment>
  )
}

export default ModalSettings
