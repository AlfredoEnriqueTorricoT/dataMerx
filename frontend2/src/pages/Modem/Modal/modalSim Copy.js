import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput, FormikSelect, isEmail, isUrl} from "components/formElements"

const ModalEdit = ({_crudName, localStore, onPutAndGet, secondModal, setToastW, state, t}) => {

    const _formName = "Sim"
    const genericId = _crudName.cod + "_" + _formName + "_"

    const validateFunction = values => {
        let errors = {}

        if (!values.sim_id) errors.sim_id = t("Select a sim")

        return errors
    }

    const submitFunc = ({active, ...values}) => {
      setToastW(true)

      let act = active == t("active") ? 1 : 0

      onPutAndGet({
        saveAs: "modemList",
        payload: {
            ...values,
            active: act,
            confirm: secondModal.open
        },
        url: "modem/update-sim",
        urlToGet: "modem"
    
    })
    }

    return(
        <React.Fragment>
            <Formik
                onSubmit={submitFunc}
                initialValues={{
                  id: state.elementSelected.id,
                  sim_id: state.elementSelected.sim_id,
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={_crudName.cod + "_" + _formName}>
                        <FormikSelect
                          label={t("Sim")}
                          inputName="sim_id"
                          required={true}
                          groupId ={genericId}
                        >
                            <option hidden value="">{t("Select a sim")}</option>
                            {
                                localStore.simList.length == 0 ?
                                <option disabled className='text-secondary' value="">{t("No ") + t("sims")}</option>
                                :
                                localStore.simList.map((sim, idx) => (
                                    <option key={"mSim-" + idx} value={sim.id}>{sim.number}</option>
                                ))
                            }
                        </FormikSelect>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    )
}

ModalEdit.propTypes = {
    _crudName: PropTypes.object,
    localStore: PropTypes.object,
    onPutAndGet: PropTypes.func,
    secondModal: PropTypes.object,
    setToastW: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func,
}

export default ModalEdit