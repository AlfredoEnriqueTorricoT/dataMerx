import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput} from "components/formElements"
import { showToast } from 'components/toast'


const ModalAdd = ({_crudName, CancelModalButton, CloseModalButton, formName, localStore, onPost}) => {
    const [toastW, setToastW] = useState(false)

    useEffect(()=>{
      if (toastW && localStore.status != "waiting response") {
        if (localStore.status == 200)
          showToast({
            type: "success", message: "El usuario ha sido añadido"
          })
        else
          showToast({
            type: "warning", title: "Error (" + localStore.status + ")",
            message: "El usuario no pudo ser añadido"
          })

        setToastW(false)
      }
    }, [localStore.status])
  
    const genericId = _crudName.cod + "_" + formName + "_"

    const validateFunction = values => {
        let errors = {}

        if (!values.ci) errors.ci = "Ingrese el ci del cliente"
        if (!values.name) errors.name = "Ingrese el nombre del cliente"

        return errors
    }

    const submitFunction = values => {
        setToastW(true)
        onPost({
          saveAs: "UNUSED_DATA",
          payload: values,
          url: "client",
        })
      }

    return(
        <React.Fragment>
          <div className="modal-header">
            <h4>Añadir cliente</h4>
            <CloseModalButton />
          </div>

          <div className="modal-body">
            <Formik
                onSubmit={submitFunction}
                initialValues={{
                    ci: "",
                    name: "",
                    last_name: "",
                    last_mother_name: "",
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={_crudName.cod + "_" + formName}>
                        <FormikInput
                          label="C. I."
                          inputName="ci"
                          type="text"
                          required={true}
                          groupId ={genericId}
                        />
                        <FormikInput
                          label="Nombre"
                          inputName="name"
                          type="text"
                          required={true}
                          groupId ={genericId}
                        />
                        <FormikInput
                          label="Apellido paterno"
                          inputName="last_name"
                          type="text"
                          groupId ={genericId}
                        />
                        <FormikInput
                          label="Apellido materno"
                          inputName="last_mother_name"
                          type="text"
                          groupId ={genericId}
                        />
                    </Form>
                )}
            </Formik>
          </div>

          <div className="modal-footer">
            <CancelModalButton />
            <div className="ms-auto">
              <button
                className='btn dm-button text-light btn-label'
                form={_crudName.cod + "_" + formName}
                type='submit'
                >
                Añadir
                <i className='fas fa-plus label-icon'/>
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
}

export default ModalAdd