import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput, FormikSelect} from "components/formElements"


const ModalAddEvent = ({_crudName, localStore, onPost, setToastW, state, t}) => {
  
    const formName = "Add event to"
    const genericId = _crudName.cod + "_" + formName + "_"

    const validateFunction = values => {
        let errors = {}

        if (!values.title) errors.title = t("Enter the event title")
        if (!values.type_id) errors.type_id = t("Select the type of event")

        return errors
    }
    
    const submitFunc = ({car_id, modem_id, ...rest}) => {
      setToastW(true)

      let formData = rest

      if (car_id) formData = {...formData, car_id: car_id}
      if (modem_id) formData = {...formData, modem_id: modem_id}

      onPost({
        saveAs: "UNUSED_DATA",
        payload: formData,
        url: "event"})
    }

    return(
        <React.Fragment>
            <Formik
                onSubmit={submitFunc}
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
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    )
}

ModalAddEvent.propTypes = {
    _crudName: PropTypes.object,
    localStore: PropTypes.object,
    onPost: PropTypes.func,
    setToastW: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func,
}

export default ModalAddEvent