import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { FormikInput, FormikSelect } from 'components/formElements'
import { showToast } from 'components/toast'
import { useModemFetch } from '../hooks'
import { useModem } from '../hooks'
import { CreateModemPayload } from '../models/ModemModel'

interface ModalAddProps {
  onClose: () => void
  t: (key: string) => string
}

const ModalAdd: React.FC<ModalAddProps> = ({ onClose, t }) => {
  const [modemImages, setModemImages] = useState<FileList | null>(null)
  const { createModem, isOperating } = useModemFetch()
  const { modemMarkList, platformList } = useModem()

  const validateFunction = (values: CreateModemPayload) => {
    const errors: Partial<Record<keyof CreateModemPayload, string>> = {}

    if (!values.imei) errors.imei = t('Enter the modem imei')
    if (!values.code) errors.code = t('Enter the modem code')
    if (!values.mark_id) errors.mark_id = t('Select a modem brand')

    return errors
  }

  const submitFunction = async (values: CreateModemPayload) => {
    const payload: CreateModemPayload = {
      code: values.code,
      imei: values.imei,
      mark_id: Number(values.mark_id),
      platform_id: values.platform_id ? Number(values.platform_id) : undefined,
    }

    const result = await createModem(payload)

    if (result.success) {
      showToast({ type: 'success', title: 'Éxito', message: t('The modem has been added') })
      onClose()
    } else {
      showToast({
        type: 'warning',
        title: t('Error'),
        message: t('The modem could not be added'),
      })
    }
  }

  return (
    <>
      <div className="modal-header">
        <h4>Añadir módem</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        <Formik
          onSubmit={submitFunction}
          initialValues={{
            imei: '',
            code: '',
            mark_id: 0,
            platform_id: undefined,
          }}
          validate={validateFunction}
        >
          {() => (
            <Form id="modalAddModem">
              <FormikInput
                label={t('Code')}
                inputName="code"
                type="text"
                required={true}
                groupId="modem_Add_"
              />
              <FormikInput
                label="Imei"
                inputName="imei"
                type="text"
                required={true}
                groupId="modem_Add_"
              />
              <FormikSelect
                label={t('Modem brand')}
                inputName="mark_id"
                required={true}
                groupId="modem_Add_"
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
                groupId="modem_Add_"
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
              <div className="row mb-1">
                <label htmlFor="modem_Add_images" className="col-3 col-form-label">
                  Añadir imagenes
                </label>
                <div className="col-9">
                  <Field
                    className="form-control"
                    id="modem_Add_images"
                    multiple
                    name="images"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setModemImages(e.target.files)
                    }}
                    type="file"
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
            form="modalAddModem"
            type="submit"
          >
            {isOperating && <i className="fas fa-spinner fa-spin me-2"></i>}
            Añadir
            <i className="fas fa-plus label-icon"></i>
          </button>
        </div>
      </div>
    </>
  )
}

export default ModalAdd
