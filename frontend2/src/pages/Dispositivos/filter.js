import { platform } from "chart.js"
import React, { useState, useEffect } from "react"
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  TabContent,
  TabPane,
} from "reactstrap"

function Filter(props) {
  const [tabs, setTabs] = useState(1)

  let { dispositivos, platforms, platSelect, setPlatformData } = props

  const searchFunc = data => {
    let obj = data.target.value
    setPlatformData("platformTS", obj)
  }

  const setSetTabs = data => {
    setTabs(data)
    setPlatformData("platformTab", data)
  }

  return (
    <React.Fragment>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={`${tabs == 1 && "active"} nav-link`}
            onClick={() => {
              setSetTabs(1)
            }}
            style={{ cursor: "pointer" }}
          >
            Filtrar por plataforma
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`${tabs == 2 && "active"} nav-link`}
            onClick={() => {
              setSetTabs(2)
            }}
            style={{ cursor: "pointer" }}
          >
            Buscar
          </a>
        </li>
      </ul>
      <Col lg="4" className="align-self-center">
        <div className="text-lg-center mt-4 mt-lg-0">
          <TabContent activeTab={tabs}>
            <TabPane tabId={1}>
              <Row>
                <Col xl={6}>
                  <div
                    className="btn-group btn-group-md mt-3"
                    role="group"
                    aria-label="Basic example"
                  >
                    {platforms.map((platform, idx) => (
                      <button
                        key={idx}
                        className={`btn btn-${
                          platSelect == platform.id
                            ? "secondary"
                            : "outline-secondary"
                        }`}
                        style={{ width: "120px" }}
                        onClick={() => {
                          setPlatformData("platformTF", platform.id)
                        }}
                      >
                        {platform.id}
                        <br />
                        <span
                          className={`badge bg-${
                            platSelect === platform.id ? "light" : "secondary"
                          } sm-1`}
                        >
                          {
                            dispositivos.filter(
                              disp => disp.platformId === platforms[idx].id
                            ).length
                          }
                        </span>
                      </button>
                    ))}
                    <button
                      className={`btn btn-${
                        platSelect == "Todo" ? "secondary" : "outline-secondary"
                      }`}
                      style={{ width: "120px" }}
                      onClick={() => {
                        setPlatformData("platformTF", "Todo")
                      }}
                    >
                      Ver todo <br />{" "}
                      <span
                        className={`badge bg-${
                          platSelect === "Todo" ? "light" : "secondary"
                        } sm-1`}
                      >
                        {dispositivos.length}
                      </span>
                    </button>{" "}
                  </div>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId={2}>
              <Row>
                <Col>
                  <form
                    id="formSearchClient"
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
        </div>
      </Col>
    </React.Fragment>
  )
}

export default Filter
