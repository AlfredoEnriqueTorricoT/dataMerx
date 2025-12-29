import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { showToast } from 'components/toast'
import { useModemFetch } from '../hooks'
import { ModemModel } from '../models/ModemModel'

interface ModalAddImagesProps {
  modem: ModemModel
  onClose: () => void
  t: (key: string) => string
}

const ModalAddImages: React.FC<ModalAddImagesProps> = ({ modem, onClose, t }) => {
  const [images, setImages] = useState<FileList | null>(null)
  const { uploadImages, isOperating } = useModemFetch()

  const validateFunction = () => {
    const errors: { images?: string } = {}
    if (!images || images.length === 0) {
      errors.images = 'Seleccione una o más imágenes'
    }
    return errors
  }

  const submitFunction = async () => {
    if (!images || images.length === 0) return

    const formData = new FormData()
    for (let i = 0; i < images.length; i++) {
      formData.append('images[]', images[i])
    }
    formData.append('id', String(modem.id))

    const result = await uploadImages(modem.id, formData)

    if (result.success) {
      showToast({ type: 'success', message: 'La imagen ha sido añadida' })
      onClose()
    } else {
      showToast({
        type: 'warning',
        title: 'Error',
        message: 'La imagen no pudo ser añadida',
      })
    }
  }

  return (
    <>
      <div className="modal-header">
        <h4>Añadir imágenes</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        <Formik onSubmit={submitFunction} initialValues={{}} validate={validateFunction}>
          {() => (
            <Form id="modem-add-image-form">
              <div className="row mb-1">
                <label htmlFor="modem_Add_images" className="col-3 col-form-label">
                  Añadir imagenes
                  <p className="text-danger d-inline-block">(*)</p>
                </label>
                <div className="col-9">
                  <Field
                    className="form-control"
                    id="modem_Add_images"
                    multiple
                    name="images"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setImages(e.target.files)
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
            form="modem-add-image-form"
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

export default ModalAddImages
