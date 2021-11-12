import React from "react"
import { Col, Row, TabContent, TabPane } from "reactstrap"

function Filter(props) {
  let { setSearchData } = props

  const searchFunc = data => {
    let obj = data.target.value
    setSearchData(obj)
  }

  return (
    <React.Fragment>
      <ul className="nav nav-tabs">
        <li className="nav item">
          <a className="active nav-link">Buscar</a>
        </li>
      </ul>
      <Col>
        <TabContent activeTab={1}>
          <TabPane tabId={1}>
            <Row>
              <Col>
                <form
                  id="formSearchSim"
                  onChange={searchFunc}
                  className="app-search"
                >
                  <div className="position-relative">
                    <input
                      type="text"
                      name="searchInput"
                      className="form-control"
                      placeholder="Buscar..."
                    />
                    <span className="bx bx-search-alt" />
                  </div>
                </form>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Col>
    </React.Fragment>
  )
}

export default Filter
