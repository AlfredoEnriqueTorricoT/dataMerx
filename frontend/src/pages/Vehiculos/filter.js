import React, { useState, useEffect } from "react"
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap"

function Filter(props) {
  const [clientCount, setClientCount] = useState([])

  let { clientes, clientSelect, setClienteData, tabs, vehiculos } = props

  let count = new Array()

  useEffect(() => {
    if (count !== clientCount) {
      for (let x = 0; x < clientes.length; x++) {
        let count2 = 0
        for (let y = 0; y < vehiculos.length; y++) {
          if (vehiculos[y].clientName === clientes[x].empresa) count2++
        }
        count[x] = count2
      }
      setClientCount(count)
    }
  }, [])

  const searchFunc = data => {
    let obj = data.target.value
    setClienteData("clienteTS", obj)
  }

  return (
    <React.Fragment>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={`${tabs == 1 && "active"} nav-link`}
            onClick={() => {
              setClienteData("clienteTab", 1)
            }}
            style={{ cursor: "pointer" }}
          >
            Filtrar por empresa
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`${tabs == 2 && "active"} nav-link`}
            onClick={() => {
              setClienteData("clienteTab", 2)
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
                    {clientes.map((cliente, idx) => (
                      <button
                        key={idx}
                        className={`btn btn-${
                          clientSelect == cliente.empresa
                            ? "secondary"
                            : "outline-secondary"
                        }`}
                        style={{ width: "120px" }}
                        onClick={() => {
                          setClienteData("clienteTF", cliente.empresa)
                        }}
                      >
                        {cliente.empresa} <br />{" "}
                        <span
                          className={`badge bg-${
                            clientSelect === "Todo" ? "light" : "secondary"
                          } sm-1`}
                        >
                          {clientCount[idx]}
                        </span>
                      </button>
                    ))}
                    <button
                      className={`btn btn-${
                        clientSelect == "Todo"
                          ? "secondary"
                          : "outline-secondary"
                      }`}
                      style={{ width: "120px" }}
                      onClick={() => {
                        setClienteData("clienteTF", "Todo")
                      }}
                    >
                      Ver todo <br />{" "}
                      <span
                        className={`badge bg-${
                          clientSelect === "Todo" ? "light" : "secondary"
                        } sm-1`}
                      >
                        {clientCount.reduce((ac, num) => ac + num, 0)}
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
