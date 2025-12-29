import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FormikInput, FormikSelect } from 'components/formElements'
import { showToast } from 'components/toast'
import { useCarFetch } from '../hooks'
import { CarModel } from '../models/CarModel'

interface ModalAddEventProps {
  car: CarModel
  onClose: () => void
  t: (key: string) => string
}

interface FormValues {
  title: string
  detail: string
  type_id: string
}

const ModalAddEvent: React.FC<ModalAddEventProps> = ({ car, onClose, t }) => {
  const [eventImages, setEventImages] = useState<FileList | null>(null)
  const { createCarEvent, isOperating } = useCarFetch()

  const validateFunction = (values: FormValues) => {
    const errors: Partial<Record<keyof FormValues, string>> = {}

    if (!values.title) errors.title = t('Enter the event title')
    if (!values.type_id) errors.type_id = t('Select the type of event')

    return errors
  }

  const submitFunction = async (values: FormValues) => {
    const formData = new FormData()

    if (eventImages) {
      for (let x = 0; x < eventImages.length; x++) {
        formData.append('images[]', eventImages[x])
      }
    }

    formData.append('id', car.id.toString())
    formData.append('title', values.title)
    formData.append('detail', values.detail)
    formData.append('type_id', values.type_id)

    const result = await createCarEvent(formData)

    if (result.success) {
      showToast({
        type: 'success',
        title: 'Éxito',
        message: 'El evento ha sido registrado',
      })
      onClose()
    } else {
      showToast({
        type: 'warning',
        title: t('Error'),
        message: 'El evento no pudo ser registrado',
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
        <div className="mb-3">
          <p className="text-muted">
            Vehículo: <strong>{car.placa}</strong> - {car.mark} {car.model}
          </p>
        </div>
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
            <Form id="car_AddEvent">
              <FormikInput
                label={t('Title')}
                inputName="title"
                type="text"
                required={true}
                groupId="car_AddEvent_"
              />
              <div className="row mb-2">
                <label htmlFor="car_AddEvent_detail" className="col-3 col-form-label">
                  {t('Details')}
                </label>
                <div className="col-9">
                  <Field
                    className="form-control"
                    id="car_AddEvent_detail"
                    name="detail"
                    as="textarea"
                    rows={3}
                  />
                </div>
              </div>
              <FormikSelect
                label={t('Event type')}
                inputName="type_id"
                groupId="car_AddEvent_"
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
                <label htmlFor="car_AddEvent_images" className="col-3 col-form-label">
                  Añadir imágenes
                </label>
                <div className="col-9">
                  <Field
                    className="form-control"
                    id="car_AddEvent_images"
                    multiple
                    name="images"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setEventImages(e.target.files)
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
            className="btn btn-success btn-label"
            disabled={isOperating}
            form="car_AddEvent"
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
