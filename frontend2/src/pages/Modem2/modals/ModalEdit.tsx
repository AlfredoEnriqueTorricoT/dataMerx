import React from 'react'
import { Formik, Form } from 'formik'
import { FormikInput, FormikSelect } from 'components/formElements'
import { showToast } from 'components/toast'
import { useModemFetch, useModem } from '../hooks'
import { ModemModel, UpdateModemPayload } from '../models/ModemModel'

interface ModalEditProps {
  modem: ModemModel
  onClose: () => void
  t: (key: string) => string
}

const ModalEdit: React.FC<ModalEditProps> = ({ modem, onClose, t }) => {
  const { updateModem, isOperating } = useModemFetch()
  const { modemMarkList, platformList } = useModem()

  const validateFunction = (values: UpdateModemPayload) => {
    const errors: Partial<Record<keyof UpdateModemPayload, string>> = {}

    if (!values.imei) errors.imei = t('Enter the modem imei')
    if (!values.code) errors.code = t('Enter the modem code')
    if (!values.mark_id) errors.mark_id = t('Select a modem brand')

    return errors
  }

  const submitFunc = async (values: UpdateModemPayload) => {
    const payload: UpdateModemPayload = {
      id: modem.id,
      code: values.code,
      imei: values.imei,
      mark_id: Number(values.mark_id),
      active: Number(values.active),
      platform_id: values.platform_id ? Number(values.platform_id) : null,
    }
    const result = await updateModem(payload)

    if (result.success) {
      showToast({ type: 'success', message: t('The modem has been edited') })
      onClose()
    } else {
      showToast({
        type: 'warning',
        title: t('Error'),
        message: t('The modem could not be edited'),
      })
    }
  }

  return (
    <>
      <div className="modal-header">
        <h4>Editar módem</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        <Formik
          onSubmit={submitFunc}
          initialValues={{
            code: modem.code,
            imei: modem.imei,
            mark_id: modem.markId,
            active: modem.active,
            platform_id: modem.platformId || undefined,
          }}
          validate={validateFunction}
        >
          {() => (
            <Form id="modem_Edit">
              <FormikInput
                label={t('Code')}
                inputName="code"
                type="number"
                required={true}
                groupId="modem_Edit_"
              />
              <FormikInput
                label="Imei"
                inputName="imei"
                type="number"
                required={true}
                groupId="modem_Edit_"
              />
              <FormikSelect
                label={t('Modem brand')}
                inputName="mark_id"
                required={true}
                groupId="modem_Edit_"
              >
                <option hidden value="">
                  {t('Select a modem brand')}
                </option>
                {modemMarkList.length === 0 ? (
                  <option disabled className="text-secondary" value="">
                    {t('No ') + t('modem brands')}
                  </option>
                ) : (
                  modemMarkList.map((mBrand, idx) => (
                    <option key={'mBO-' + idx} value={mBrand.id}>
                      {mBrand.name}
                    </option>
                  ))
                )}
              </FormikSelect>
              <FormikSelect
                label="Plataforma"
                inputName="platform_id"
                required={false}
                groupId="modem_Edit_"
              >
                <option hidden value="">
                  Seleccione una plataforma
                </option>
                {platformList.length === 0 ? (
                  <option disabled className="text-secondary" value="">
                    Sin plataformas
                  </option>
                ) : (
                  platformList.map((platform, idx) => (
                    <option key={'pBO-' + idx} value={platform.id}>
                      {platform.name}
                    </option>
                  ))
                )}
              </FormikSelect>
              <FormikSelect label={t('State')} inputName="active" groupId="modem_Edit_">
                <option value={1}>{t('ACTIVE')}</option>
                <option value={0}>{t('INACTIVE')}</option>
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
            disabled={isOperating}
            form="modem_Edit"
            type="submit"
          >
            {isOperating && <i className="fas fa-spinner fa-spin me-2"></i>}
            Editar
            <i className="fas fa-edit label-icon"></i>
          </button>
        </div>
      </div>
    </>
  )
}

export default ModalEdit
