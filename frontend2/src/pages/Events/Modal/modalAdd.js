import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {FormikInput, FormikSelect} from "components/formElements"


const ModalAdd = ({_crudName, formName, localStore, onPostAndGet, setToastW, t}) => {
  
    const genericId = _crudName.cod + "_" + formName + "_"

    const validateFunction = values => {
        let errors = {}

        if (!values.title) errors.title = t("Enter the event title")
        if (!values.type_id) errors.type_id = t("Select the type of event")
        if (!values.car_id && !values.modem_id && !values.sim_id) {
          errors.qwerty = "QWERTY"
        }

        return errors
    }
    
    const submitFunc = ({car_id, modem_id, sim_id, ...rest}) => {
      setToastW(true)

      let formData = rest

      if (car_id) formData = {...formData, car_id: car_id}
      if (modem_id) formData = {...formData, modem_id: modem_id}
      if (sim_id) formData = {...formData, sim_id: sim_id}

      onPostAndGet({
        saveAs: _crudName.cod + "List",
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
                    sim_id: ""
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
                        <FormikInput
                          label={t("Details")}
                          inputName="detail"
                          type="textArea"
                          groupId ={genericId}
                        />
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
                        <FormikSelect
                          label={t("Sim")}
                          inputName="sim_id"
                          groupId ={genericId}
                        >
                          <option className="text-secondary" hidden value="">{t("Select a sim")}</option>
                          {localStore.simList.length ?
                            localStore.simList.map((sim, idx)=>(
                              <option key={"eAS-"+idx} value={sim.id}>{sim.number}</option>
                            ))
                            :
                            <option className="text-secondary" disabled value="NOVALUE">{t("No ") + t("sims")}</option>
                          }
                        </FormikSelect>
                        <FormikSelect
                          label={t("Modem")}
                          inputName="modem_id"
                          groupId ={genericId}
                        >
                          <option className="text-secondary" hidden value="">{t("Select a modem")}</option>
                          {localStore.modemList.length ?
                            localStore.modemList.map((modem, idx)=>(
                              <option key={"eAM-"+idx} value={modem.id}>{modem.code}</option>
                            ))
                            :
                            <option className="text-secondary" disabled value="NOVALUE">{t("No ") + t("modems")}</option>
                          }
                        </FormikSelect>
                        <FormikSelect
                          label={t("Car")}
                          inputName="car_id"
                          groupId ={genericId}
                        >
                          <option className="text-secondary" hidden value="">{t("Select a car")}</option>
                          {localStore.carList.length ?
                            localStore.carList.map((car, idx)=>(
                              <option key={"eAC-"+idx} value={car.id}>{car.name}</option>
                            ))
                            :
                            <option className="text-secondary" disabled value="NOVALUE">{t("No ") + t("cars")}</option>
                          }
                        </FormikSelect>
                        {errors.qwerty ?
                          <div className="row">
                            <div className="col-3"></div>
                            <div className="col-9">
                              <h6 className="text-danger">Seleccione al menos un sim, módem o vehículo</h6>
                            </div>
                          </div>
                          : ""
                        }
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    )
}

ModalAdd.propTypes = {
    _crudName: PropTypes.object,
    formName: PropTypes.string,
    localStore: PropTypes.object,
    onPostAndGet: PropTypes.func,
    setToastW: PropTypes.func,
    t: PropTypes.func,
}

export default ModalAdd