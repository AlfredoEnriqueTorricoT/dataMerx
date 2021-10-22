import React, { Component } from "react"
import PropTypes from "prop-types"

import { Alert, Card, CardBody, Col, Container, Label, Row } from "reactstrap"

// Redux
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"

//Social Media Imports
import { GoogleLogin } from "react-google-login"
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"

//Import config
import { facebook, google } from "../../config"

// availity-reactstrap-validation
import {
  AvInput,
  AvFeedback,
  AvForm,
  AvGroup,
} from "availity-reactstrap-validation"

// actions
import { apiError, loginUser, socialLogin } from "../../store/actions"

// import images
import profile from "../../assets/images/profile-img.png"
import logo from "../../assets/images/favicon.png"
import lightlogo from "../../assets/images/favicon-light.png"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this)
  }

  // handleValidSubmit
  handleValidSubmit(event, values) {
    this.props.loginUser(values, this.props.history)
    console.log("LOGIN DATA")
    console.log(values, this.props.history)
  }

  componentDidMount() {
    this.props.apiError("")
  }

  /*signIn = (res, type) => {
    const { socialLogin } = this.props
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      }
      socialLogin(postData, this.props.history, type)
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      }
      socialLogin(postData, this.props.history, type)
    }
  }

  //handleGoogleLoginResponse
  googleResponse = response => {
    this.signIn(response, "google")
  }

  //handleTwitterLoginResponse
  twitterResponse = () => {}

  //handleFacebookLoginResponse
  facebookResponse = response => {
    this.signIn(response, "facebook")
  }*/

  render() {
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block"></div>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <div className="bg-primary bg-soft">
                    <Row>
                      <Col className="col-7">
                        <div className="text-primary p-4">
                          <h5 className="text-primary">¡Bienvenido!</h5>
                          <p>Inicia sesión para continuar</p>
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
                      <AvForm
                        className="form-horizontal"
                        onValidSubmit={this.handleValidSubmit}
                      >
                        {this.props.error && this.props.error ? (
                          <Alert color="danger">{this.props.error}</Alert>
                        ) : null}

                        <div className="mb-3">
                          <AvGroup>
                            <Label for="login-email">Correo electrónico</Label>
                            <AvInput
                              name="email"
                              id="login-email"
                              label="Email"
                              className="form-control"
                              placeholder="Ingrese su correo"
                              type="email"
                              required
                            />
                            <AvFeedback>Correo no válido</AvFeedback>
                          </AvGroup>
                        </div>

                        <div className="mb-3">
                          <AvGroup>
                            <Label for="login-password">Contraseña</Label>
                            <AvInput
                              name="password"
                              id="login-password"
                              label="Contraseña"
                              type="password"
                              required
                              placeholder="Ingrese su contraseña"
                            />
                            <AvFeedback>Contraseña no válida</AvFeedback>
                          </AvGroup>
                        </div>

                        <div className="mt-3 d-grid">
                          <button
                            className="btn btn-success btn-block waves-effect waves-light"
                            type="submit"
                          >
                            Iniciar sesión
                          </button>
                        </div>

                        <div className="mt-4 text-center">
                          <Link to="/forgot-password" className="text-muted">
                            <i className="mdi mdi-lock me-1" /> ¿Olvidaste tu
                            contraseña?
                          </Link>
                        </div>
                      </AvForm>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center"></div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

Login.propTypes = {
  apiError: PropTypes.any,
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func,
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError, socialLogin })(Login)
)
