import React, { useState } from 'react'
import { showToast } from 'components/toast'
import { useSimFetch } from '../hooks'
import { SimModel } from '../models/SimModel'

interface ModalAddImagesProps {
  sim: SimModel
  onClose: () => void
  t: (key: string) => string
}

const ModalAddImages: React.FC<ModalAddImagesProps> = ({ sim, onClose, t }) => {
  const [images, setImages] = useState<FileList | null>(null)
  const { uploadImages, isOperating } = useSimFetch()

  const handleSubmit = async () => {
    if (!images || images.length === 0) {
      showToast({
        type: 'warning',
        title: 'Advertencia',
        message: 'Seleccione al menos una imagen',
      })
      return
    }

    const formData = new FormData()
    for (let i = 0; i < images.length; i++) {
      formData.append('images[]', images[i])
    }

    const result = await uploadImages(sim.id, formData)

    if (result.success) {
      showToast({
        type: 'success',
        title: 'Éxito',
        message: 'Las imágenes han sido añadidas',
      })
      onClose()
    } else {
      showToast({
        type: 'warning',
        title: t('Error'),
        message: 'No se pudieron añadir las imágenes',
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
        <div className="mb-3">
          <p className="text-muted">
            Sim: <strong>{sim.number}</strong> - IMEI: {sim.imei}
          </p>
        </div>
        <div className="mb-3">
          <label htmlFor="sim_images" className="form-label">
            Seleccionar imágenes
          </label>
          <input
            type="file"
            className="form-control"
            id="sim_images"
            multiple
            accept="image/*"
            onChange={(e) => setImages(e.target.files)}
          />
        </div>
        {images && images.length > 0 && (
          <p className="text-success">
            <i className="fas fa-check me-2"></i>
            {images.length} imagen(es) seleccionada(s)
          </p>
        )}
      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>
          {t('Cancel')}
        </button>
        <div className="ms-auto">
          <button
            className="btn dm-button btn-label text-light"
            disabled={isOperating || !images}
            onClick={handleSubmit}
          >
            {isOperating && <i className="fas fa-spinner fa-spin me-2"></i>}
            Subir imágenes
            <i className="fas fa-upload label-icon"></i>
          </button>
        </div>
      </div>
    </>
  )
}

export default ModalAddImages
