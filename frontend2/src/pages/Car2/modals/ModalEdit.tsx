import React from 'react'
import { Formik, Form } from 'formik'
import { FormikInput, FormikSelect } from 'components/formElements'
import { showToast } from 'components/toast'
import { useCarFetch, useCar } from '../hooks'
import { CarModel, UpdateCarPayload } from '../models/CarModel'

interface ModalEditProps {
  car: CarModel
  onClose: () => void
  t: (key: string) => string
}

interface FormValues {
  mark: string
  model: string
  placa: string
  platform_id: string
}

const ModalEdit: React.FC<ModalEditProps> = ({ car, onClose, t }) => {
  const { updateCar, isOperating } = useCarFetch()
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

  const submitFunc = async (values: FormValues) => {
    const payload: UpdateCarPayload = {
      id: car.id,
      mark: values.mark,
      model: values.model,
      placa: values.placa,
      platform_id: values.platform_id ? Number(values.platform_id) : undefined,
    }

    const result = await updateCar(payload)

    if (result.success) {
      showToast({ type: 'success', title: 'Éxito', message: 'El vehículo ha sido editado' })
      onClose()
    } else {
      showToast({
        type: 'warning',
        title: t('Error'),
        message: 'El vehículo no pudo ser editado',
      })
    }
  }

  return (
    <>
      <div className="modal-header">
        <h4>Editar vehículo</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        <Formik
          onSubmit={submitFunc}
          initialValues={{
            mark: car.mark,
            model: car.model,
            placa: car.placa,
            platform_id: car.platformId?.toString() || '',
          }}
          validate={validateFunction}
        >
          {() => (
            <Form id="car_Edit">
              <FormikInput
                label={t('Mark')}
                inputName="mark"
                type="text"
                required={true}
                groupId="car_Edit_"
              />
              <FormikInput
                label={t('Model')}
                inputName="model"
                type="text"
                required={true}
                groupId="car_Edit_"
              />
              <FormikInput
                label={t('License plate')}
                inputName="placa"
                type="text"
                required={true}
                groupId="car_Edit_"
              />
              <FormikSelect label={t('Platform')} inputName="platform_id" groupId="car_Edit_">
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
            form="car_Edit"
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
