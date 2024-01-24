import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { showToast } from 'components/toast'
import {FormikInput, FormikSelect, isEmail, isUrl} from "components/formElements"


const ModalTransfer = ({
  CancelModalButton,
  CloseModalButton,
  localStore,
  setState,
  state,
  postAndUpdate,
  t,
  userStore
}) => { 
  const [toastWaiting, setToastW] = useState(false)

  useEffect(()=>{
    if (toastWaiting && localStore.status != "waiting response") {
      if (localStore.status == 200) {
        setState({modalOpen: false})
        showToast({
          type: "success",
          message: "La solicitud de trasferencia ha sido realizada"
        })
      }
      else {
        showToast({
          type: "warning",
          message: "No se ha podido transferir ("+ localStore.status +")"
        })
      }
    }
  }, [localStore.status])

    const validateFunction = values => {
        let errors = {}

        if (!values.user_successor_id) errors.user_successor_id = ("Select a user")

        return errors
    }

    const submitFunction = values => {
      console.log(values);
      postAndUpdate({
        saveAs: "UNUSED-DATA",
        payload: values,
        url: "modem/transfer_request",
      })
      setToastW(true)
      }

    return(
        <React.Fragment>
          <div className="modal-header">
            <h4>Transferir</h4>
            <CloseModalButton />
          </div>

          <div className="modal-body">
            <Formik
                onSubmit={submitFunction}
                initialValues={{
                  id: state.elementSelected.id,
                  user_successor_id: 0,
                  observation: ""
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id="modalAddModem">
                        <FormikSelect
                          label="Usuario"
                          inputName="user_successor_id"
                          required={true}
                          groupId="modemFilter"
                        >
                            <option hidden value={0}>{t("Select a user")}</option>
                            {
                                userStore.userList.length == 0 ?
                                <option disabled className='text-secondary' value="">{t("No ") + t("users")}</option>
                                :
                                userStore.userList.map((user, idx) => (
                                    <option key={"mBO-" + idx} value={user.id}>{user.name}</option>
                                ))
                            }
                        </FormikSelect>

                        <div className="row mb-2">
                          <label
                            htmlFor="modalTransferObservation"
                            className="col-3 col-form-label"
                            >
                            Detalles
                          </label>
                          <div className="col-9">
                            <Field
                              as="textArea"
                              className="form-control"
                              id="modalTransferObservation"
                              name="observation"
                            >
                            </Field>
                          </div>
                        </div>
                    </Form>
                )}
              </Formik>
            </div>

            <div className="modal-footer">
              <CancelModalButton />
              <div className="ms-auto">
                <button className="btn dm-button btn-label text-light" disabled={toastWaiting} form="modalAddModem" type="submit">
                  Transferir
                  <i className="fas fa-filter label-icon"></i>
                </button>
              </div>
            </div>
        </React.Fragment>
    )
}

ModalTransfer.propTypes = {
    _crudName: PropTypes.object,
    CancelModalButton: PropTypes.any,
    CloseModalButton: PropTypes.any,
    formName: PropTypes.string,
    localStore: PropTypes.object,
    setState: PropTypes.func,
    state: PropTypes.object,
    postAndUpdate: PropTypes.func,
    userStore: PropTypes.object,
    setToastW: PropTypes.func,
    t: PropTypes.func,
    toastWaiting: PropTypes.bool
}

export default ModalTransfer