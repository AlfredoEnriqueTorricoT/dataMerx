import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { showToast } from 'components/toast'

const ModalAddImages = ({CloseModalButton, CancelModalButton, localStore, onPost, setState, state}) => {
    const [eventImages, setEventImages] = useState([])
    const [toastW, setToastW] = useState(false)

    useEffect(()=>{
        if (toastW && localStore.status != "waiting response") {
            if (localStore.status == 200) {
                showToast({
                    type: "success",
                    message: "La imágen ha sido añadida"
                })
                setState({modalOpen: false})
            } else {
                showToast({
                    title: "Error (" + localStore.status + ")",
                    type: "warning",
                    message: "La imágen no pudo ser añadida"
                })
            }

            setToastW(false)
        }
    }, [localStore.status])

    const validateFunction = values => {
        let errors = {}

        if (!eventImages) errors.images = "Seleccione una o más imagenes"

        return errors
    }

    const submitFunction = values => {
        setToastW(true)
        let fData = new FormData()
  
        for (let x = 0; x < eventImages.length; x++) {
          fData.append("images[]", eventImages[x]);
        }
  
        fData.append("id", values.id);
  
        onPost({
          saveAs: "UNUSED_DATA",
          payload: fData,
          url: "modem-upload-add",
        })
      }

    return(
        <React.Fragment>
        <div className="modal-header">
          <h4>Añadir evento</h4>
          <CloseModalButton />
        </div>

        <div className="modal-body">
          <Formik
              onSubmit={submitFunction}
              initialValues={{
                  id: state.elementSelected.id
              }}
              validate={validateFunction}
          >
              {()=>(
                  <Form id="car-add-image-form">
                      <div className="row mb-1">
                        <label
                          htmlFor="car_event_Add_images"
                          className="col-3 col-form-label"
                          >
                          Añadir imagenes
                          <p className="text-danger d-inline-block">(*)</p>
                        </label>
                        <div className="col-9">
                          <Field
                            className="form-control"
                            id="car_event_Add_images"
                            multiple
                            name="images"
                            onChange={i => {
                              setEventImages(i.target.files);
                            }}
                            type="file"
                          />
                          <ErrorMessage name="images">
                            {msg => <h6 className="text-danger">{t(msg)}</h6>}
                          </ErrorMessage>
                        </div>
                      </div>                        
                  </Form>
              )}
          </Formik>
        </div>

        <div className="modal-footer">
          <CancelModalButton />
          <div className="ms-auto">
            <button className="btn dm-button text-light btn-label" disabled={toastW} form={"car-add-image-form"} type="submit">
              Añadir
              <i className="fas fa-plus label-icon"></i>
            </button>
          </div>
        </div>
      </React.Fragment>
    )
}

ModalAddImages.propTypes = {
    CloseModalButton: PropTypes.any,
    CancelModalButton: PropTypes.any,
    localStore: PropTypes.object,
    onPost: PropTypes.func,
    setState: PropTypes.func,
    state: PropTypes.object
}

export default ModalAddImages