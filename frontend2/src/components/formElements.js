import React from "react"
import { Field, ErrorMessage } from "formik"

const FormikInput = ({label, inputName, type, required, groupId}) => {
    return(
      <div className="row mb-2">
        <label
          htmlFor={groupId + inputName}
          className="col-3 col-form-label"
          >
          {label}
          {
            required ?
              <p className="text-danger d-inline-block mb-0">(*)</p> :
              ""
          }
        </label>
        <div className="col-9">
          <Field
            className="form-control"
            id={groupId + inputName}
            name={inputName}
            type={type}
          />
          <ErrorMessage name={inputName}>
            {msg => <h6 className="text-danger">{msg}</h6>}
          </ErrorMessage>
        </div>
      </div>
    )
  }

const FormikSelect = ({children, label, inputName, required, groupId}) => {
    return(
      <div className="row mb-2">
        <label
          htmlFor={groupId + inputName}
          className="col-3 col-form-label"
          >
          {label}
          {
            required ?
              <p className="text-danger d-inline-block mb-0">(*)</p> :
              ""
          }
        </label>
        <div className="col-9">
          <Field
            as="select"
            className="form-select"
            id={groupId + inputName}
            name={inputName}
          >
            {children}
          </Field>
          <ErrorMessage name={inputName}>
            {msg => <h6 className="text-danger">{msg}</h6>}
          </ErrorMessage>
        </div>
      </div>
    )
  }

  const isEmail = data => {
    return /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(data)
  }

  const isUrl = data => {
    return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(data)
  }

  export {FormikInput, FormikSelect, isEmail, isUrl}