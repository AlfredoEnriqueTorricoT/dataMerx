import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={6}>02-10-2021</Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
