import { platform } from "chart.js"
import React, { useState, useEffect } from "react"
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap"

function Filter(props) {
  const [platSelect, setPlatSelecct] = useState("Todo")
  const [platCount, setPlatCount] = useState({
    uno: 0,
  })

  let { dispositivos, platforms, setPlatformTF } = props

  const setPlatform = data => {
    setPlatSelecct(data)
    setPlatformTF(data)
  }

  let count = new Array()

  useEffect(() => {
    if (count !== platCount) {
      console.log(count, "!=", platCount)
      console.log(platforms)
      for (let x = 0; x < platforms.length; x++) {
        console.log("x: ".x)
        let count2 = 0
        for (let y = 0; y < dispositivos.length; y++) {
          if (dispositivos[y].platformId === platforms[x].id) count2++
          console.log("y: ", y)
        }
        console.log(count, ".push(", count2, ")")
        count[x] = count2
      }
      setPlatCount(count)
      console.log("count: ", count)
    }
  }, [])
  //asjdnasodn
  return (
    <Card>
      <CardBody>
        <CardTitle>Filtrar por plataforma</CardTitle>
        <Col lg="4" className="align-self-center">
          <div className="text-lg-center mt-4 mt-lg-0">
            <Row>
              <Col xl={6}>
                <div
                  className="btn-group btn-group-md"
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
                        setPlatform(platform.id)
                      }}
                    >
                      {platform.id}
                      <br />
                      <span
                        className={`badge bg-${
                          platSelect === platform.id ? "light" : "secondary"
                        } sm-1`}
                      >
                        {platCount[idx]}
                      </span>
                    </button>
                  ))}
                  <button
                    className={`btn btn-${
                      platSelect == "Todo" ? "secondary" : "outline-secondary"
                    }`}
                    style={{ width: "120px" }}
                    onClick={() => {
                      setPlatform("Todo")
                    }}
                  >
                    Ver todo <br />{" "}
                    <span
                      className={`badge bg-${
                        platSelect === "Todo" ? "light" : "secondary"
                      } sm-1`}
                    >
                      {Array.isArray(platCount)
                        ? platCount.reduce((ac, num) => ac + num, 0)
                        : "0"}
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
