import React, { Component } from "react";
import PropTypes from "prop-types";

import { Alert, Card, CardBody, Col, Container, Row, Label } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// actions
import { apiError, loginUser } from "../../store/actions";

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";
import lightlogo from "../../assets/images/logo-light.svg";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.onApiError("");
  }

  render() {
    return (
      <React.Fragment>
        {/* <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="bx bx-home h2" />
          </Link>
        </div> */}
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <div className="bg-primary bg-soft">
                    <Row>
                      <Col className="col-7">
                        <div className="text-primary p-4">
                          <h5 className="text-primary">Welcome Back !</h5>
                          <p>Sign in to continue to Skote.</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profile} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div className="auth-logo">
                      <Link to="/" className="auth-logo-light">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={lightlogo}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                      <Link to="/" className="auth-logo-dark">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logo}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                    {this.props.error && this.props.error ? (
                      <Alert color="danger">{this.props.error}</Alert>
                    ) : null}
                      <Formik
                        enableReinitialize={true}
                        initialValues={{
                          email:
                            (this.state && this.state.email) ||
                            "admin@themesbrand.com",
                          password:
                            (this.state && this.state.password) || "123456",
                        }}
                        validationSchema={Yup.object().shape({
                          email: Yup.string().required(
                            "Please Enter Your Email"
                          ),
                          password: Yup.string().required(
                            "Please Enter Valid Password"
                          ),
                        })}
                        onSubmit={values => {
                          this.props.onLogin(values, this.props.history);
                        }}
                      >
                        {({ errors, status, touched }) => (
                          
                          <Form className="form-horizontal">
                            <div className="mb-3">
                              <Label for="email" className="form-label">
                                Email
                              </Label>
                              <Field
                                name="email"
                                type="text"
                                className={
                                  "form-control" +
                                  (errors.email && touched.email
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="mb-3">
                              <Label for="password" className="form-label">
                                Password
                              </Label>
                              <div className="input-group auth-pass-inputgroup">
                                <Field
                                  name="password"
                                  type="password"
                                  autoComplete="true"
                                  className={
                                    "form-control" +
                                    (errors.password && touched.password
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <button
                                  className="btn btn-light "
                                  type="button"
                                  id="password-addon"
                                >
                                  <i className="mdi mdi-eye-outline"></i>
                                </button>
                              </div>
                              <ErrorMessage
                              name="password"
                              component="div"
                              className="invalid-feedback"
                            />
                            </div>
                            
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="customControlInline"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="customControlInline"
                              >
                                Remember me
                              </label>
                            </div>

                            <div className="mt-3 d-grid">
                              <button
                                className="btn btn-primary btn-block"
                                type="submit"
                              >
                                Log In
                              </button>
                            </div>

                          </Form>
                        )}
                      </Formik>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    Don&apos;t have an account ?
                    <Link to="register" className="fw-medium text-primary">
                      Register Now
                    </Link>
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  onApiError: PropTypes.any,
  error: PropTypes.any,
  history: PropTypes.object,
  onLogin: PropTypes.func,
};

const mapStateToProps = state => {
  const { error } = state.Login;
  return { error };
};

const mapDispatchToProps = dispatch => ({
  onLogin: (user, history) => dispatch(loginUser(user, history)),
  onApiError: data => dispatch(apiError(data))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Login)
);
