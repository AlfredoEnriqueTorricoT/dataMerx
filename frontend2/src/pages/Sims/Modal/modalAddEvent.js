import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput, FormikSelect} from "components/formElements"

const ModalAddEvent = ({_crudName, CloseModalButton, CancelModalButton, localStore, onPost, setToastW, state, t}) => {
    const [eventImages, setEventImages] = useState([])
  
    const formName = "Add event to"
    const genericId = _crudName.cod + "_" + formName + "_"

    const validateFunction = values => {
        let errors = {}

        if (!values.title) errors.title = t("Enter the event title")
        if (!values.type_id) errors.type_id = t("Select the type of event")
        if (!eventImages) errors.images = "Seleccione una o varias imagenes"

        return errors
    }
    
    // const submitFunc = ({car_id, modem_id, ...rest}) => {
    //   setToastW(true)

    //   let formData = rest

    //   if (car_id) formData = {...formData, car_id: car_id}
    //   if (modem_id) formData = {...formData, modem_id: modem_id}

    //   onPost({
    //     saveAs: "UNUSED_DATA",
    //     payload: formData,
    //     url: "event"})
    // }

    const submitFunction = values => {
      setToastW(true)
      let fData = new FormData()

      for (let x = 0; x < eventImages.length; x++) {
        fData.append("images[]", eventImages[x]);
      }

      fData.append("id", values.sim_id);
      fData.append("title", values.title);
      fData.append("detail", values.detail);
      fData.append("type_id", values.type_id);

      onPost({
        saveAs: "UNUSED_DATA",
        payload: fData,
        url: "sim/event",
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
                    title: "",
                    detail: "",
                    type_id: "",
                    car_id: "",
                    modem_id: "",
                    sim_id: state.elementSelected.id
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={_crudName.cod + "_" + formName}>
                        <FormikInput
                          label={t("Title")}
                          inputName="title"
                          type="text"
                          required={true}
                          groupId ={genericId}
                        />
                        <div className="row mb-2">
                          <label
                            htmlFor={genericId + "detail"}
                            className="col-3 col-form-label"
                            >
                            {t("Details")}
                          </label>
                          <div className="col-9">
                            <Field
                              className="form-control"
                              id={genericId + "detail"}
                              name={"detail"}
                              as="textArea"
                            />
                            <ErrorMessage name={"detail"}>
                              {msg => <h6 className="text-danger">{msg}</h6>}
                            </ErrorMessage>
                          </div>
                        </div>
                        <FormikSelect
                          label={t("Event type")}
                          inputName="type_id"
                          groupId ={genericId}
                          required={true}
                        >
                          <option className="text-secondary" hidden value="">{t("Select a event type")}</option>
                          <option value={1}>{t("Informative")}</option>
                          <option value={2}>{t("Warning")}</option>
                          <option value={3}>{t("Danger")}</option>
                        </FormikSelect>
                        <div className="row mb-1">
                          <label
                            htmlFor="sim_event_Add_images"
                            className="col-3 col-form-label"
                            >
                            Añadir imagenes
                            <p className="text-danger d-inline-block">(*)</p>
                          </label>
                          <div className="col-9">
                            <Field
                              className="form-control"
                              id="sim_event_Add_images"
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
              <button className='btn btn-success btn-label' disabled={localStore.status == "waiting response"} form={_crudName.cod + "_" + formName} type="submit">
                Añadir
                <i className='fas fa-plus label-icon'/>
              </button>
            </div>
          </div>
        </React.Fragment>
    )
}

ModalAddEvent.propTypes = {
    _crudName: PropTypes.object,
    CloseModalButton: PropTypes.any,
    CancelModalButton: PropTypes.any,
    localStore: PropTypes.object,
    onPost: PropTypes.func,
    setToastW: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func,
}

export default ModalAddEvent