import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FormikInput } from 'components/formElements'
import { showToast } from 'components/toast'
import { useSimFetch } from '../hooks'

interface ModalAddProps {
  onClose: () => void
  t: (key: string) => string
}

interface FormValues {
  number: string
  imei: string
}

const ModalAdd: React.FC<ModalAddProps> = ({ onClose, t }) => {
  const [simImages, setSimImages] = useState<FileList | null>(null)
  const { createSim, isOperating } = useSimFetch()

  const validateFunction = (values: FormValues) => {
    const errors: Partial<Record<keyof FormValues, string>> = {}

    if (!values.number) errors.number = t('Enter the sim number')
    if (values.number && values.number.toString().length !== 8)
      errors.number = 'El número de teléfono debe ser de 8 dígitos'
    if (!values.imei) errors.imei = t('Enter the sim imei')

    return errors
  }

  const submitFunction = async (values: FormValues) => {
    const formData = new FormData()

    if (simImages) {
      for (let x = 0; x < simImages.length; x++) {
        formData.append('images[]', simImages[x])
      }
    }

    formData.append('number', values.number)
    formData.append('imei', values.imei)

    const result = await createSim(formData)

    if (result.success) {
      showToast({ type: 'success', title: 'Éxito', message: 'El sim ha sido añadido' })
      onClose()
    } else {
      showToast({
        type: 'warning',
        title: t('Error'),
        message: 'El sim no pudo ser añadido',
      })
    }
  }

  return (
    <>
      <div className="modal-header">
        <h4>Añadir sim</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        <Formik
          onSubmit={submitFunction}
          initialValues={{
            number: '',
            imei: '',
          }}
          validate={validateFunction}
        >
          {() => (
            <Form id="sim_Add">
              <FormikInput
                label={t('Number')}
                inputName="number"
                type="number"
                required={true}
                groupId="sim_Add_"
              />
              <FormikInput
                label="Imei"
                inputName="imei"
                type="text"
                required={true}
                groupId="sim_Add_"
              />
              <div className="row mb-1">
                <label htmlFor="sim_Add_images" className="col-3 col-form-label">
                  Añadir imagenes
                </label>
                <div className="col-9">
                  <Field
                    className="form-control"
                    id="sim_Add_images"
                    multiple
                    name="images"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSimImages(e.target.files)
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
            form="sim_Add"
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
