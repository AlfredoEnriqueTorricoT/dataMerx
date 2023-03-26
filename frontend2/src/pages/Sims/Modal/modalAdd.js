import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const ModalAdd = ({_crudName, onPostAndGet, t}) => {
  const [simImages, setSimImages] = useState([]) 
  
    const validateFunction = values => {
        let errors = {}

        if (!values.number) errors.number = "Enter the sim number"
        if (!values.code) errors.code = "Enter the sim code"
        if (!values.imei) errors.imei = "Enter the sim imei"

        return errors
    }

    const saveImages = (imgFiles) => {
      // const IM = new FormData();

      // for (let x = 0; x < imgFiles.length; x++) {
      //   console.log(imgFiles[x]);
      //   IM.append("images[]", imgFiles[x]);
      // }
      setSimImages(imgFiles)
    };
    
    const submitFunction = values => {
      let fData = new FormData()

      for (let x = 0; x < simImages.length; x++) {
        fData.append("images[]", simImages[x]);
      }

      fData.append("number", values.number);
      fData.append("code", values.code);
      fData.append("imei", values.imei);

      onPostAndGet({
        saveAs: "simList",
        payload: fData,
        url: "sim-upload",
        urlToGet: "sim"
      })
    }

    return(
        <React.Fragment>          
            <Formik
                onSubmit={values =>{
                  // onPostAndGet({
                  //   saveAs: "simList",
                  //   payload: values,
                  //   url: "sim"})
                  submitFunction(values)
                  } }
                initialValues={{
                    number: "",
                    code: "",
                    imei: ""
                }}
                validate={validateFunction}
            >
                {({errors})=>(
                    <Form id={_crudName.cod + "_Add"}>
                        <div className="row mb-1">
                          <label
                            htmlFor="sim_Add_number"
                            className="col-3 col-form-label"
                            >
                            {t("Number")}
                            <p className="text-danger d-inline-block">(*)</p>
                          </label>
                          <div className="col-9">
                            <Field
                              className="form-control"
                              id="sim_Add_number"
                              name="number"
                              type="number"
                            />
                            <ErrorMessage name="number">
                              {msg => <h6 className="text-danger">{t(msg)}</h6>}
                            </ErrorMessage>
                          </div>
                        </div>

                        <div className="row mb-1">
                          <label
                            htmlFor="sim_Add_code"
                            className="col-3 col-form-label"
                            >
                            {t("Code")}
                            <p className="text-danger d-inline-block">(*)</p>
                          </label>
                          <div className="col-9">
                            <Field
                              className="form-control"
                              id="sim_Add_code"
                              name="code"
                              type="number"
                            />
                            <ErrorMessage name="code">
                              {msg => <h6 className="text-danger">{t(msg)}</h6>}
                            </ErrorMessage>
                          </div>
                        </div>

                        <div className="row mb-1">
                          <label
                            htmlFor="sim_Add_imei"
                            className="col-3 col-form-label"
                            >
                            Imei
                            <p className="text-danger d-inline-block">(*)</p>
                          </label>
                          <div className="col-9">
                            <Field
                              className="form-control"
                              id="sim_Add_imei"
                              name="imei"
                              type="number"
                            />
                            <ErrorMessage name="imei">
                              {msg => <h6 className="text-danger">{t(msg)}</h6>}
                            </ErrorMessage>
                          </div>
                        </div>
                        
                        <div className="row mb-1">
                          <label
                            htmlFor="sim_Add_imei"
                            className="col-3 col-form-label"
                            >
                            Añadir imagen
                            <p className="text-danger d-inline-block">(*)</p>
                          </label>
                          <div className="col-9">
                            <Field
                              className="form-control"
                              id="sim_Add_imei"
                              multiple
                              name="images"
                              onChange={i => {
                                saveImages(i.target.files);
                              }}
                              type="file"
                            />
                          </div>
                        </div>
                    </Form>
                )}
            </Formik>

            {/* <button
              className="btn btn-sm btn-info"
              onClick={() => {
                document
                  .getElementById("inputUploadSimImages"+idx)
                  .click();
              }}
              title='Añadir imagen'
            >
              <i className="fas fa-camera"></i>
            </button> */}

            {/* <input
              accept="image/*"
              type="file"
              id={"inputUploadSimImages"}
              multiple
              onChange={i => {
                uploadAvatar(
                  i.target.files,
                  {number: mBrand.number, code: mBrand.code, imei: mBrand.imei}
                );
              }}
              style={{ display: "none" }}
            /> */}
        </React.Fragment>
    )
}

ModalAdd.propTypes = {
    _crudName: PropTypes.object,
    onPostAndGet: PropTypes.func,
    t: PropTypes.func,
}

export default ModalAdd