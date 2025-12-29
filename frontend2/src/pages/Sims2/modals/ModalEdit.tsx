import React from 'react'
import { Formik, Form } from 'formik'
import { FormikInput } from 'components/formElements'
import { showToast } from 'components/toast'
import { useSimFetch } from '../hooks'
import { SimModel, UpdateSimPayload } from '../models/SimModel'

interface ModalEditProps {
  sim: SimModel
  onClose: () => void
  t: (key: string) => string
}

interface FormValues {
  number: string
  imei: string
}

const ModalEdit: React.FC<ModalEditProps> = ({ sim, onClose, t }) => {
  const { updateSim, isOperating } = useSimFetch()

  const validateFunction = (values: FormValues) => {
    const errors: Partial<Record<keyof FormValues, string>> = {}

    if (!values.number) errors.number = t('Enter the sim number')
    if (values.number && values.number.toString().length !== 8)
      errors.number = 'El número de teléfono debe ser de 8 dígitos'
    if (!values.imei) errors.imei = t('Enter the sim imei')

    return errors
  }

  const submitFunc = async (values: FormValues) => {
    const payload: UpdateSimPayload = {
      id: sim.id,
      number: values.number,
      imei: values.imei,
    }
    const result = await updateSim(payload)

    if (result.success) {
      showToast({ type: 'success', title: 'Éxito', message: 'El sim ha sido editado' })
      onClose()
    } else {
      showToast({
        type: 'warning',
        title: t('Error'),
        message: 'El sim no pudo ser editado',
      })
    }
  }

  return (
    <>
      <div className="modal-header">
        <h4>Editar sim</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        <Formik
          onSubmit={submitFunc}
          initialValues={{
            number: sim.number,
            imei: sim.imei,
          }}
          validate={validateFunction}
        >
          {() => (
            <Form id="sim_Edit">
              <FormikInput
                label={t('Number')}
                inputName="number"
                type="number"
                required={true}
                groupId="sim_Edit_"
              />
              <FormikInput
                label="Imei"
                inputName="imei"
                type="text"
                required={true}
                groupId="sim_Edit_"
              />
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
            form="sim_Edit"
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
