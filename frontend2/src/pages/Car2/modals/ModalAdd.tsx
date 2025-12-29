import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { FormikInput, FormikSelect } from 'components/formElements'
import { showToast } from 'components/toast'
import { useCarFetch, useCar } from '../hooks'

interface ModalAddProps {
  onClose: () => void
  t: (key: string) => string
}

interface FormValues {
  mark: string
  model: string
  placa: string
  platform_id: string
}

const ModalAdd: React.FC<ModalAddProps> = ({ onClose, t }) => {
  const [carImages, setCarImages] = useState<FileList | null>(null)
  const { createCar, isOperating } = useCarFetch()
  const { platformList } = useCar()

  const validateFunction = (values: FormValues) => {
    const errors: Partial<Record<keyof FormValues, string>> = {}

    if (!values.mark) errors.mark = t('Enter the car mark')
    if (!values.model) errors.model = t('Enter the car model')
    if (!values.placa) errors.placa = t('Enter the car license plate')
    if (!/^[0-9]{3,4}-[A-Z]{3}$/.test(values.placa))
      errors.placa = 'La placa ingresada no es válida (000-AAA)'

    return errors
  }

  const submitFunction = async (values: FormValues) => {
    const formData = new FormData()

    if (carImages) {
      for (let x = 0; x < carImages.length; x++) {
        formData.append('images[]', carImages[x])
      }
    }

    formData.append('mark', values.mark)
    formData.append('model', values.model)
    formData.append('placa', values.placa)
    if (values.platform_id) {
      formData.append('platform_id', values.platform_id)
    }

    const result = await createCar(formData)

    if (result.success) {
      showToast({ type: 'success', title: 'Éxito', message: 'El vehículo ha sido añadido' })
      onClose()
    } else {
      showToast({
        type: 'warning',
        title: t('Error'),
        message: 'El vehículo no pudo ser añadido',
      })
    }
  }

  return (
    <>
      <div className="modal-header">
        <h4>Añadir vehículo</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        <Formik
          onSubmit={submitFunction}
          initialValues={{
            mark: '',
            model: '',
            placa: '',
            platform_id: '',
          }}
          validate={validateFunction}
        >
          {() => (
            <Form id="car_Add">
              <FormikInput
                label={t('Mark')}
                inputName="mark"
                type="text"
                required={true}
                groupId="car_Add_"
              />
              <FormikInput
                label={t('Model')}
                inputName="model"
                type="text"
                required={true}
                groupId="car_Add_"
              />
              <FormikInput
                label={t('License plate')}
                inputName="placa"
                type="text"
                required={true}
                groupId="car_Add_"
              />
              <FormikSelect label={t('Platform')} inputName="platform_id" groupId="car_Add_">
                <option hidden value="">
                  {t('Select a platform')}
                </option>
                {platformList.length ? (
                  platformList.map((platform, idx) => (
                    <option key={'pO-' + idx} value={platform.id}>
                      {platform.name}
                    </option>
                  ))
                ) : (
                  <option className="text-secondary" disabled value="">
                    {t('No platforms')}
                  </option>
                )}
              </FormikSelect>
              <div className="row mb-1">
                <label htmlFor="car_Add_images" className="col-3 col-form-label">
                  Añadir imágenes
                </label>
                <div className="col-9">
                  <Field
                    className="form-control"
                    id="car_Add_images"
                    multiple
                    name="images"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setCarImages(e.target.files)
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
            className="btn dm-button text-light btn-label"
            disabled={isOperating}
            form="car_Add"
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
