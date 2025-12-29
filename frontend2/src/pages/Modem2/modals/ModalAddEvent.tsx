import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FormikInput, FormikSelect } from 'components/formElements'
import { showToast } from 'components/toast'
import { useModemFetch } from '../hooks'
import { ModemModel } from '../models/ModemModel'

interface ModalAddEventProps {
  modem: ModemModel
  onClose: () => void
  t: (key: string) => string
}

interface AddEventFormValues {
  title: string
  detail: string
  type_id: string
}

const ModalAddEvent: React.FC<ModalAddEventProps> = ({ modem, onClose, t }) => {
  const [eventImages, setEventImages] = useState<FileList | null>(null)
  const { createModemEvent, isOperating } = useModemFetch()

  const validateFunction = (values: AddEventFormValues) => {
    const errors: Partial<Record<keyof AddEventFormValues, string>> = {}

    if (!values.title) errors.title = t('Enter the event title')
    if (!values.type_id) errors.type_id = t('Select the type of event')

    return errors
  }

  const submitFunction = async (values: AddEventFormValues) => {
    const formData = new FormData()

    // Añadir imágenes si existen
    if (eventImages) {
      for (let i = 0; i < eventImages.length; i++) {
        formData.append('images[]', eventImages[i])
      }
    }

    // Añadir campos del formulario
    formData.append('id', modem.id.toString())
    formData.append('title', values.title)
    formData.append('detail', values.detail)
    formData.append('type_id', values.type_id)

    const result = await createModemEvent(formData)

    if (result.success) {
      showToast({ type: 'success', title: 'Éxito', message: t('The event has been registered') })
      onClose()
    } else {
      showToast({
        type: 'warning',
        title: t('Error'),
        message: t('The event could not be registered'),
      })
    }
  }

  return (
    <>
      <div className="modal-header">
        <h4>Añadir evento</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        <Formik
          onSubmit={submitFunction}
          initialValues={{
            title: '',
            detail: '',
            type_id: '',
          }}
          validate={validateFunction}
        >
          {() => (
            <Form id="modem_AddEvent">
              <FormikInput
                label={t('Title')}
                inputName="title"
                type="text"
                required={true}
                groupId="modem_AddEvent_"
              />
              <div className="row mb-2">
                <label htmlFor="modem_AddEvent_detail" className="col-3 col-form-label">
                  {t('Details')}
                </label>
                <div className="col-9">
                  <Field
                    className="form-control"
                    id="modem_AddEvent_detail"
                    name="detail"
                    as="textarea"
                  />
                  <ErrorMessage name="detail">
                    {(msg) => <h6 className="text-danger">{msg}</h6>}
                  </ErrorMessage>
                </div>
              </div>
              <FormikSelect
                label={t('Event type')}
                inputName="type_id"
                groupId="modem_AddEvent_"
                required={true}
              >
                <option className="text-secondary" hidden value="">
                  {t('Select a event type')}
                </option>
                <option value={1}>{t('Informative')}</option>
                <option value={2}>{t('Warning')}</option>
                <option value={3}>{t('Danger')}</option>
              </FormikSelect>
              <div className="row mb-1">
                <label htmlFor="modem_event_Add_images" className="col-3 col-form-label">
                  Añadir imagenes
                </label>
                <div className="col-9">
                  <input
                    className="form-control"
                    id="modem_event_Add_images"
                    multiple
                    name="images"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setEventImages(e.target.files)
                    }}
                    type="file"
                    accept="image/*"
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
            form="modem_AddEvent"
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

export default ModalAddEvent
