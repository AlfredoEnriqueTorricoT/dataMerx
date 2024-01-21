import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput, isEmail, isUrl} from "components/formElements"

const ModalEdit = ({
    _crudName,
    FooterButtonClose,
    HeaderButtonClose,
    onPutAndGet,
    setToastW,
    toastWaiting,
    state,
    t
  }) => {

    const _formName = "Edit"
    const genericId = _crudName.cod + "_" + _formName + "_"

    const validateFunction = values => {
        let errors = {}

        if (!values.name) errors.name = t("Enter the platform name")
        if (!values.url) errors.url = t("Enter the platform page web")
          else if (!isUrl(values.url)) errors.url = t("Enter a page web")

        return errors
    }

    const submitFunc = values => {
      setToastW(true)

      const {password, ...rest} = values
      
      let formData = {...rest, id: state.elementSelected.id}
      
      if (password) {formData = {...formData, password: password}}

      onPutAndGet({
        saveAs: _crudName.cod + "List",
        payload: formData,
        url: "platform"})
    }

    return(
        <React.Fragment>
          <div className='modal-header'>
            <h4>{t("Edit")} {t("platform")}</h4>
            <HeaderButtonClose />
          </div>

          <div className='modal-body'>
            <Formik
                onSubmit={submitFunc}
                initialValues={{
                    name: state.elementSelected.name,
                    detail: state.elementSelected.detail,
                    email: state.elementSelected.email,
                    url: state.elementSelected.url,
                    password: ""
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={_crudName.cod + "_" + _formName}>
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
                  className={`btn dm-button text-light btn-label`}
                  disabled={state.toastWaiting}
                  form={_crudName.cod + "_" + _formName}
                  type="submit"
              >
                  {t("Edit")}
                  {
                      toastWaiting ?
                        <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                        :
                        <i className='fas fa-edit label-icon' />  
                  }
              </button>
            </div>
          </div>
        </React.Fragment>
    )
}

ModalEdit.propTypes = {
    _crudName: PropTypes.func,
    FooterButtonClose: PropTypes.func,
    HeaderButtonClose: PropTypes.func,
    onPutAndGet: PropTypes.func,
    setToastW: PropTypes.func,
    toastWaiting: PropTypes.bool,
    state: PropTypes.func,
    t: PropTypes.func,
}

export default ModalEdit