import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput, isEmail, isUrl} from "components/formElements"


const ModalAdd = ({
    _crudName,
    formName,
    FooterButtonClose,
    HeaderButtonClose,
    onPostAndGet,
    setToastW,
    state,
    toastWaiting,
    t
  }) => {
  
    const genericId = _crudName.cod + "_" + formName + "_"

    const validateFunction = values => {
        let errors = {}

        if (!values.name) errors.name = t("Enter the platform name")
        if (!values.url) errors.url = t("Enter the platform page web")
          else if (!isUrl(values.url)) errors.url = t("Enter a page web")
        if (!values.email) errors.email = t("Enter the platform email")
          else if (!isEmail(values.email)) errors.email = t("Enter a email")

        return errors
    }
    
    const submitFunc = values => {
      setToastW(true)

      const {password, ...rest} = values
      
      let formData = {...rest}
      
      if (password) {formData = {...formData, password: password}}

      onPostAndGet({
        saveAs: _crudName.cod + "List",
        payload: formData,
        url: "platform"})
    }

    return(
        <React.Fragment>
          <div className='modal-header'>
            <h4>{t("Add")} {t("platform")}</h4>
            <HeaderButtonClose />
          </div>

          <div className='modal-body'>
            <Formik
                onSubmit={submitFunc}
                initialValues={{
                    name: "",
                    detail: "",
                    url: "",
                    email: "",
                    password: ""
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={_crudName.cod + "_" + formName}>
                        <FormikInput
                          label={t("Name")}
                          inputName="name"
                          type="text"
                          required={true}
                          groupId ={genericId}
                        />
                        <FormikInput
                          label={t("Details")}
                          inputName="detail"
                          type="text"
                          groupId ={genericId}
                        />
                        <FormikInput
                          label={t("Page web")}
                          inputName="url"
                          type="text"
                          required={true}
                          groupId ={genericId}
                        />
                        <FormikInput
                          label="Email"
                          inputName="email"
                          type="text"
                          required={true}
                          groupId ={genericId}
                        />
                        <FormikInput
                          label={t("Password")}
                          inputName="password"
                          type="text"
                          groupId ={genericId}
                        />
                    </Form>
                )}
            </Formik>
          </div>

          <div className='modal-footer'>
            <FooterButtonClose />
            <div className='ms-auto'>
                  <button
                    className='btn dm-button text-light btn-label'
                    disabled={toastWaiting}
                    form={_crudName.cod + "_" + state.modalType}
                    type='submit'
                  >
                    {t("Add")}
                    {
                      toastWaiting ?
                        <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                        :
                        <i className='fas fa-plus label-icon' />  
                    }
                  </button>
            </div>
          </div>
        </React.Fragment>
    )
}

ModalAdd.propTypes = {
    _crudName: PropTypes.object,
    formName: PropTypes.string,
    FooterButtonClose: PropTypes.func,
    HeaderButtonClose: PropTypes.func,
    onPostAndGet: PropTypes.func,
    setToastW: PropTypes.func,
    state: PropTypes.object,
    toastWaiting: PropTypes.func,
    t: PropTypes.func,
}

export default ModalAdd