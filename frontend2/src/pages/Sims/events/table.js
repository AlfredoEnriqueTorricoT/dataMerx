import React from 'react'
import PropTypes from 'prop-types'

const _getTime = date => {
  let fecha = new Date(date)

  const addZero = data => {
    const num = Number(data)
    if (num > 9) 
      return num
    else
      return "0" + num
  }

  const _year = fecha.getFullYear()
  const _month = fecha.getMonth() + 1
  const _day = fecha.getDate()
  const _hour = fecha.getHours()
  const _minute = fecha.getMinutes()

  const DMY = (addZero(_day) + "/" + addZero(_month) + "/" + _year)
  const HM = (_hour + ":" + _minute)

  return (HM + "     " + DMY)
}

const EventDataShow = ({title, desc}) => {
  return(
    <div className="row mb-1">
      <div className="col-6"><b>{title}</b></div>
      <div className="col-6">{desc}</div>
    </div>
  )
}

const eventIcons = ["info-circle", "exclamation-circle", "exclamation-triangle"]
const eventBg = ["info", "warning", "danger"]

const Table = ({_crudName, listToShow, setState, t}) => {
    return(
      <React.Fragment>
        {listToShow.length == 0 ?
          <div className="card">
            <div className="card-body py-5">
              <center>
                <h4 className="text-secondary">
                  {t("No " + _crudName.multiple + " found")}
                </h4>
              </center>
            </div>
          </div>
          :
        listToShow.map((listItem, idx)=>(
            <div className="card" key={"gEventCard-"+idx}>
              <div className="card-body">
                <div className={`card-title bg-${eventBg[listItem.type_id - 1]} bg-soft d-flex p-2`}>
                    <i className={`fas fa-${eventIcons[listItem.type_id - 1]} me-5 pt-1`}></i>
                    {listItem.title}
                  <div className="ms-auto">
                    {_getTime(listItem.created_at)}
                  </div>
                </div>

                <div className="row">
                  <div className="col-5 col-sm-6 col-md-7 col-lg-7 col-xl-7">
                    {listItem.detail} <br />
                    <button className='btn btn-primary btn-sm btn-label mt-2'>
                      <i className="fas fa-camera label-icon"></i>
                      Agregar foto
                    </button>
                  </div>
                  <div className="col-7 col-sm-6 col-md-5 col-lg-5 col-xl-5">
                    {listItem.car_id ?
                      <EventDataShow
                        title={t("Car")}
                        desc={listItem.car.name}
                      />
                    : ""}
                    {listItem.modem_id ? 
                        <EventDataShow
                          title={t("Modem")}
                          desc={listItem.modem.code}
                        />
                    : ""
                    }
                    {listItem.sim_id ? 
                          <EventDataShow
                          title={t("Sim")}
                          desc={listItem.sim.number}
                        />
                    : ""
                    }
                    {listItem.platform_id ? 
                          <EventDataShow
                          title={t("Platform")}
                          desc={listItem.platform.name}
                        />
                    : ""
                    }
                  </div>
                </div>
              </div>
            </div>
        ))}
      </React.Fragment>
    )
}

Table.propTypes = {
    _crudName: PropTypes.object,
    listToShow: PropTypes.array,
    setState: PropTypes.func,
    t: PropTypes.func
}

export default Table