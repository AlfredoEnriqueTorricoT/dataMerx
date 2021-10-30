import React, { useState, useEffect } from "react"
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap"

function Filter(props) {
  const [platSelect, setPlatSelecct] = useState("Todo")
  const [clientCount, setClientCount] = useState([])

  let { clientes, setClienteTF, vehiculos } = props

  const setCliente = data => {
    setPlatSelecct(data)
    setClienteTF(data)
  }

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

  return (
    <Card>
      <CardBody>
        <CardTitle>Filtrar por empresa</CardTitle>
        <Col lg="4" className="align-self-center">
          <div className="text-lg-center mt-4 mt-lg-0">
            <Row>
              <Col xl={6}>
                <div
                  className="btn-group btn-group-md"
                  role="group"
                  aria-label="Basic example"
                >
                  {clientes.map((cliente, idx) => (
                    <button
                      key={idx}
                      className={`btn btn-${
                        platSelect ==
                        cliente.name +
                          cliente.last_name +
                          cliente.mother_last_name
                          ? "secondary"
                          : "outline-secondary"
                      }`}
                      style={{ width: "120px" }}
                      onClick={() => {
                        setCliente(
                          cliente.name +
                            cliente.last_name +
                            cliente.mother_last_name
                        )
                      }}
                    >
                      {cliente.empresa} <br />{" "}
                      <span
                        className={`badge bg-${
                          platSelect === "Todo" ? "light" : "secondary"
                        } sm-1`}
                      >
                        {clientCount[idx]}
                      </span>
                    </button>
                  ))}
                  <button
                    className={`btn btn-${
                      platSelect == "Todo" ? "secondary" : "outline-secondary"
                    }`}
                    style={{ width: "120px" }}
                    onClick={() => {
                      setCliente("Todo")
                    }}
                  >
                    Ver todo <br />{" "}
                    <span
                      className={`badge bg-${
                        platSelect === "Todo" ? "light" : "secondary"
                      } sm-1`}
                    >
                      {clientCount.reduce((ac, num) => ac + num, 0)}
                    </span>
                  </button>{" "}
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </CardBody>
    </Card>
  )
}

export default Filter
