import React, { useState } from 'react'
import { Modal, Carousel, CarouselItem, CarouselControl } from 'reactstrap'

interface ImageItem {
  id: number
  url: string
}

interface ImageGalleryProps {
  images: ImageItem[]
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [carouselOpen, setCarouselOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  if (images.length === 0) return null

  const openCarousel = (index: number) => {
    setActiveIndex(index)
    setCarouselOpen(true)
  }

  const next = () => {
    if (animating) return
    const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1
    setActiveIndex(nextIndex)
  }

  const previous = () => {
    if (animating) return
    const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1
    setActiveIndex(nextIndex)
  }

  const renderGalleryPreview = () => {
    if (images.length === 1) {
      return (
        <div
          className="rounded overflow-hidden cursor-pointer"
          onClick={() => openCarousel(0)}
          style={{ cursor: 'pointer' }}
        >
          <img
            src={images[0].url}
            alt="Imagen del evento"
            className="img-fluid w-100"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        </div>
      )
    }

    if (images.length === 2) {
      return (
        <div className="row g-1">
          {images.map((img, idx) => (
            <div key={img.id} className="col-6">
              <div
                className="rounded overflow-hidden"
                onClick={() => openCarousel(idx)}
                style={{ cursor: 'pointer', height: '200px' }}
              >
                <img
                  src={img.url}
                  alt={`Imagen ${idx + 1}`}
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          ))}
        </div>
      )
    }

    // 3 o más imágenes: primera grande, resto pequeñas
    const mainImage = images[0]
    const thumbnails = images.slice(1, 4)
    const remaining = images.length - 4

    return (
      <div>
        {/* Imagen principal */}
        <div
          className="rounded overflow-hidden mb-1"
          onClick={() => openCarousel(0)}
          style={{ cursor: 'pointer' }}
        >
          <img
            src={mainImage.url}
            alt="Imagen principal"
            className="img-fluid w-100"
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
        </div>

        {/* Thumbnails */}
        <div className="row g-1">
          {thumbnails.map((img, idx) => (
            <div key={img.id} className="col-4">
              <div
                className="rounded overflow-hidden position-relative"
                onClick={() => openCarousel(idx + 1)}
                style={{ cursor: 'pointer', height: '80px' }}
              >
                <img
                  src={img.url}
                  alt={`Imagen ${idx + 2}`}
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                />
                {/* Overlay para mostrar imágenes restantes */}
                {idx === 2 && remaining > 0 && (
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                  >
                    <span className="text-white font-size-16 fw-bold">+{remaining}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      {renderGalleryPreview()}

      {/* Modal con carrusel */}
      <Modal isOpen={carouselOpen} toggle={() => setCarouselOpen(false)} size="lg" centered>
        <div className="modal-header border-0 pb-0">
          <button
            type="button"
            className="btn-close"
            onClick={() => setCarouselOpen(false)}
            aria-label="Cerrar"
          ></button>
        </div>
        <div className="modal-body p-0">
          <Carousel activeIndex={activeIndex} next={next} previous={previous} interval={false}>
            {images.map((img) => (
              <CarouselItem
                key={img.id}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
              >
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                  <img
                    src={img.url}
                    alt="Imagen"
                    className="img-fluid"
                    style={{ maxHeight: '70vh', maxWidth: '100%' }}
                  />
                </div>
              </CarouselItem>
            ))}
            {images.length > 1 && (
              <>
                <CarouselControl direction="prev" directionText="Anterior" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Siguiente" onClickHandler={next} />
              </>
            )}
          </Carousel>
          <div className="text-center text-muted py-2">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ImageGallery
