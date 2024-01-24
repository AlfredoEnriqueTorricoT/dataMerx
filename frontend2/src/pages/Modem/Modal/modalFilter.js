import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { showToast } from 'components/toast'
import {FormikInput, FormikSelect, isEmail, isUrl} from "components/formElements"


const ModalFilter = ({
  CancelModalButton,
  CloseModalButton,
  localStore,
  setState,
  onPost,
  t,
  userStore
}) => { 
  const [toastWaiting, setToastW] = useState(false)
  const [filtersSelected, setFiltersSelected] = useState([])

  useEffect(()=>{
    if (toastWaiting && localStore.status != "waiting response") {
      if (localStore.status == 200) setState({modalOpen: false, lastSearch: "filter", filters: filtersSelected})
      else {
        showToast({
          type: "warning",
          message: "No se ha podido filtrar ("+ localStore.status +")"
        })
      }
    }
  }, [localStore.status])

    const validateFunction = values => {
        let errors = {}

        if (!values.user_responsability_id && !values.platform_id) {
          errors.user_responsability_id = "Select a user or a platform"
          errors.platform_id = "Select a user or a platform"
        }

        return errors
    }

    const submitFunction = values => {
      onPost({
        saveAs: "modemList",
        payload: values,
        url: "modem/filter",
      })
      setToastW(true)

      let newFilterSelected = []
      if (values.user_responsability_id) {
        let element = userStore.userList.filter(user => user.id == values.user_responsability_id)[0]
        newFilterSelected = [{id: element.id, name: element.name, type: "user"}]
      }
      if (values.platform_id) {
        let element = localStore.platformList.filter(plat => plat.id == values.platform_id)[0]
        newFilterSelected.push({id: element.id, name: element.name, type: "platform"})
      }
      setFiltersSelected(newFilterSelected)
      }

    return(
        <React.Fragment>
          <div className="modal-header">
            <h4>Filtrar</h4>
            <CloseModalButton />
          </div>

          <div className="modal-body">
            <Formik
                onSubmit={submitFunction}
                initialValues={{
                  platform_id: 0,
                  user_responsability_id: 0,
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id="modalAddModem">
                        <FormikSelect
                          label="Plataforma"
                          inputName="platform_id"
                          required={false}
                          groupId="modemFilter"
                        >
                            <option hidden value={0}>{t("Select a platform")}</option>
                            {
                                localStore.platformList.length == 0 ?
                                <option disabled className='text-secondary' value="">{t("No ") + t("platforms")}</option>
                                :
                                localStore.platformList.map((platform, idx) => (
                                    <option key={"mBO-" + idx} value={platform.id}>{platform.name}</option>
                                ))
                            }
                        </FormikSelect>
                        {/* <button type='button' onClick={()=>userStore.userList.map(q => console.log(q))}>asdasd</button> */}
                        <FormikSelect
                          label="Usuario"
                          inputName="user_responsability_id"
                          required={false}
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
                    </Form>
                )}
              </Formik>
            </div>

            <div className="modal-footer">
              <CancelModalButton />
              <div className="ms-auto">
                <button className="btn dm-button btn-label text-light" disabled={toastWaiting} form="modalAddModem" type="submit">
                  Filtrar
                  <i className="fas fa-filter label-icon"></i>
                </button>
              </div>
            </div>
        </React.Fragment>
    )
}

ModalFilter.propTypes = {
    _crudName: PropTypes.object,
    CancelModalButton: PropTypes.any,
    CloseModalButton: PropTypes.any,
    formName: PropTypes.string,
    localStore: PropTypes.object,
    setState: PropTypes.func,
    onPost: PropTypes.func,
    userStore: PropTypes.object,
    setToastW: PropTypes.func,
    t: PropTypes.func,
    toastWaiting: PropTypes.bool
}

export default ModalFilter