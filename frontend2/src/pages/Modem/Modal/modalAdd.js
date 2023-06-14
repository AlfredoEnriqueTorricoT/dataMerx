import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput, FormikSelect, isEmail, isUrl} from "components/formElements"


const ModalAdd = ({_crudName, CancelModalButton, CloseModalButton, formName, localStore, onPost, setToastW, t, toastWaiting}) => {
    const [modemImages, setModemImages] = useState(false)
  
    const genericId = _crudName.cod + "_" + formName + "_"

    const validateFunction = values => {
        let errors = {}

        if (!values.imei) errors.imei = t("Enter the modem imei")
        if (!values.code) errors.code = t("Enter the modem code")
        if (!values.mark_id) errors.mark_id = t("Select a modem brand")
        if (!modemImages) errors.images = "Seleccione una o varias imagenes"

        return errors
    }

    const submitFunction = values => {
        setToastW(true)
        let fData = new FormData()
  
        for (let x = 0; x < modemImages.length; x++) {
            fData.append("images[]", modemImages[x]);
        }
  
        fData.append("mark_id", values.mark_id);
        fData.append("code", values.code);
        fData.append("imei", values.imei);
  
        onPost({
          saveAs: "UNUSED_DATA",
          payload: fData,
          url: "modem-upload",
        })
      }

    return(
        <React.Fragment>
          <div className="modal-header">
            <h4>Añadir módem</h4>
            <CloseModalButton />
          </div>

          <div className="modal-body">
            <Formik
                onSubmit={submitFunction}
                initialValues={{
                    imei: "",
                    code: "",
                    mark_id: "",
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={_crudName.cod + "_" + formName}>
                      <FormikInput
                        label={t("Code")}
                        inputName="code"
                        type="number"
                        required={true}
                        groupId ={genericId}
                      />
                      <FormikInput
                          label="Imei"
                          inputName="imei"
                          type="number"
                          required={true}
                          groupId ={genericId}
                        />
                        <FormikSelect
                          label={t("Modem brand")}
                          inputName="mark_id"
                          required={true}
                          groupId ={genericId}
                        >
                            <option hidden value="">{t("Select a modem brand")}</option>
                            {
                                localStore.modemBrandList.length == 0 ?
                                <option disabled className='text-secondary' value="">{t("No ") + t("modem brands")}</option>
                                :
                                localStore.modemBrandList.map((mBrand, idx) => (
                                    <option key={"mBO-" + idx} value={mBrand.id}>{mBrand.name}</option>
                                ))
                            }
                        </FormikSelect>
                        <div className="row mb-1">
                          <label
                            htmlFor="modem_Add_images"
                            className="col-3 col-form-label"
                            >
                            Añadir imagenes
                            <p className="text-danger d-inline-block">(*)</p>
                          </label>
                          <div className="col-9">
                            <Field
                              className="form-control"
                              id="modem_Add_images"
                              multiple
                              name="images"
                              onChange={i => {
                                setModemImages(i.target.files);
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
                <button className="btn dm-button btn-label text-light" disabled={toastWaiting} form={_crudName.cod + "_" + formName} type="submit">
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
    CancelModalButton: PropTypes.any,
    CloseModalButton: PropTypes.any,
    formName: PropTypes.string,
    localStore: PropTypes.object,
    onPost: PropTypes.func,
    setToastW: PropTypes.func,
    t: PropTypes.func,
    toastWaiting: PropTypes.bool
}

export default ModalAdd