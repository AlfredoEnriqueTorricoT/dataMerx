import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput, FormikSelect, isEmail, isUrl} from "components/formElements"


const ModalAdd = ({_crudName, CloseModalButton, CancelModalButton, formName, localStore, onPost, setToastW, t, toastWaiting}) => {
    const [carImages, setCarImages] = useState({})
  
    const genericId = _crudName.cod + "_" + formName + "_"

    const validateFunction = values => {
        let errors = {}

        // if (!values.name) errors.name = t("Enter the car name")
        if (!values.mark) errors.mark = t("Enter the car mark")
        if (!values.model) errors.model = t("Enter the car model")
        if (!values.placa) errors.placa = t("Enter the car license plate")
        if (!carImages) errors.images = "Seleccione una o varias imagenes"

        return errors
    }

    const submitFunction = values => {
        setToastW(true)
        let fData = new FormData()
  
        for (let x = 0; x < carImages.length; x++) {
          fData.append("images[]", carImages[x]);
        }
  
        fData.append("mark", values.mark);
        fData.append("model", values.model);
        fData.append("placa", values.placa);
        fData.append("platform_id", values.platform_id);
  
        onPost({
          saveAs: "UNUSED_DATA",
          payload: fData,
          url: "car-upload",
        })
      }

    return(
        <React.Fragment>
            <div className="modal-header">
              <h4>Añadir vehículo</h4>
              <CloseModalButton />
            </div>

            <div className="modal-body">
              <Formik
                  onSubmit={submitFunction}
                  initialValues={{
                      mark: "",
                      model: "",
                      placa: "",
                      platform_id: "",
                  }}
                  validate={validateFunction}
              >
                  {({errors})=>(
                      <Form id={_crudName.cod + "_" + formName}>
                          {/* <FormikInput
                            label={t("Name")}
                            inputName="name"
                            type="text"
                            required={true}
                            groupId ={genericId}
                          /> */}
                          <FormikInput
                            label={t("Mark")}
                            inputName="mark"
                            type="text"
                            required={true}
                            groupId ={genericId}
                          />
                          <FormikInput
                            label={t("Model")}
                            inputName="model"
                            type="text"
                            required={true}
                            groupId ={genericId}
                          />
                          <FormikInput
                            label={t("License plate")}
                            inputName="placa"
                            type="text"
                            required={true}
                            groupId ={genericId}
                          />
                          <FormikSelect
                              label={t("Platform")}
                              inputName="platform_id"
                              groupId ={genericId}
                          >
                              <option hidden value="">{t("Select a platform")}</option>
                              {localStore.platformList.length ? 
                                  localStore.platformList.map((platform, idx) => (
                                      <option key={"mO-"+idx} value={platform.id}>{platform.name}</option>
                                  )) :
                                  <option className='text-secondary' disabled value="">{t("No platforms")}</option>
                              }
                          </FormikSelect>
                          <div className="row mb-1">
                            <label
                              htmlFor="car_Add_images"
                              className="col-3 col-form-label"
                              >
                              Añadir imagenes
                              <p className="text-danger d-inline-block">(*)</p>
                            </label>
                            <div className="col-9">
                              <Field
                                className="form-control"
                                id="car_Add_images"
                                multiple
                                name="images"
                                onChange={i => {
                                  setCarImages(i.target.files);
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
                  <button className="btn dm-button text-light btn-label" disabled={toastWaiting} form={_crudName.cod + "_" + formName}>
                    Añadir
                    <i className="fas fa-plus label-icon"></i>
                  </button>
                </div>
              </div>
        </React.Fragment>
    )
}

ModalAdd.propTypes = {
    _crudName: PropTypes.object,
    CloseModalButton: PropTypes.any,
    CancelModalButton: PropTypes.any,
    formName: PropTypes.string,
    localStore: PropTypes.object,
    onPost: PropTypes.func,
    setToastW: PropTypes.func,
    t: PropTypes.func,
    toastWaiting: PropTypes.bool,
}

export default ModalAdd