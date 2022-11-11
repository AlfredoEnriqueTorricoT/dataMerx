import React, { Component } from "react"
import MetaTags from "react-meta-tags"
import { Container, Row, Col, Button } from "reactstrap"

//Import Images
import error from "../../assets/images/error-img.png"

class Pages404 extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="account-pages my-5 pt-5">
          <MetaTags>
            <title>
              404 Error Page | Skote - Responsive Bootstrap 5 Admin Dashboard
            </title>
          </MetaTags>
          <Container>
            <Row>
              <Col lg="12">
                <div className="text-center mb-5">
                  <h1 className="display-2 fw-medium">
                    4
                    <i className="bx bx-buoy bx-spin text-primary display-3" />4
                  </h1>
                  <h4 className="text-uppercase">
                    No se ha encontrado la página
                  </h4>
                  <div className="mt-5 text-center">
                    <Button
                      className="btn btn-primary waves-effect waves-light"
                      onClick={() => {
                        window.history.back()
                      }}
                    >
                      Volver
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col md="8" xl="6">
                <div>
                  <img src={error} alt="" className="img-fluid" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default Pages404
