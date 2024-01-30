import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { showToast } from 'components/toast'
import { SpinnerL } from 'components/components'

const ModalPermissions = ({ModalCancelButton, ModalCloseButton, getUser, localStore, onPost, state, t}) => {
  const [activePermissions, setActivePermissions] = useState([])
  const [modalStatus, setModalStatus] = useState(0) // 0: waiting, 1: success, 2: error

  const getPermissions = () => {
    getUser({saveAs: "permissionsList", url: "user-permission/" + state.elementSelected.id})
    setModalStatus(0)
  }

  useEffect(()=>{
    if (modalStatus == 0 && localStore.status != "waiting response") {
      if (localStore.status == 200) {
        setActivePermissions(localStore.permissionsList.map(item => item.name))
        setModalStatus(1)
      }
      else
        setModalStatus(0)
    }
  }, [localStore.status])

  const permissions = [
    {name: "Platforms", code: "platforms"},
    {name: "Users", code: "users"},
    {name: "Watches", code: "watchs"},
    {name: "Modems", code: "modems"},
    {name: "Sims", code: "sims"},
    {name: "Cars", code: "cars"},
  ]

  const settingsPermissions = [
    {name: "Admin", code: "responsability_admin"}
  ]

    const checkFunction = e => {
      if (activePermissions.includes(e)) {
        setActivePermissions(activePermissions.filter(item => item !== e))
      } else {
        setActivePermissions([...activePermissions, e])
      }
      let payload = {user_id: state.elementSelected.id, permission: e}

      onPost({url: "user-permission", payload: payload, saveAs: "UNUSED_DATA"})
    }

    const DisplayPermissions = () => {
      switch (modalStatus) {
        case 0:
          return <SpinnerL />
        case 1:
          return(
            <React.Fragment>
              <h4 className='mb-0'>Vistas</h4>
              {permissions.map((permission, idx)=>(
                  <div className='col-6' key={idx}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        checked={activePermissions.includes(permission.code)}
                        id={"permission-" + idx}
                        onChange={()=>checkFunction(permission.code)}
                        name={permission.name}
                        type="checkbox"
                      />
                      <label className="form-check-label" htmlFor={"permission-" + idx}>
                        {t(permission.name)}
                      </label>
                    </div>
                  </div>
                ))
              }
              <h4 className='mt-4 mb-0'>Configuraciones</h4>
              {settingsPermissions.map((permission, idx)=>(
                  <div className='col-6' key={idx}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        checked={activePermissions.includes(permission.code)}
                        id={"permission-" + idx}
                        onChange={()=>checkFunction(permission.code)}
                        name={permission.name}
                        type="checkbox"
                      />
                      <label className="form-check-label" htmlFor={"permission-" + idx}>
                        {t(permission.name)}
                      </label>
                    </div>
                  </div>
                ))
              }
            </React.Fragment>
          )
        case 2:
          return(
            <center>
              <h4>Error ({localStore.status})</h4>
              <br />
              <button
                className='btn dm-button text-light btn-label'
                onClick={getPermissions}
              >
                {t("Retry")}
              </button>
            </center>
          )
      }
    }

    return(
        <React.Fragment>
          <div className="modal-header">
            <h4>Permisos de usuario</h4>
            <ModalCloseButton />
          </div>

          <div className="modal-body row">
            <DisplayPermissions />
          </div>

          <div className="modal-footer">
            <ModalCancelButton />
            <div className="ms-auto"></div>
          </div>
        </React.Fragment>
    )
}

ModalPermissions.propTypes = {
    ModalCancelButton: PropTypes.any,
    ModalCloseButton: PropTypes.any,
    getUser: PropTypes.func,
    localStore: PropTypes.any,
    setState: PropTypes.func,
    onPost: PropTypes.func,
    state: PropTypes.object,
    t: PropTypes.func,
}

export default ModalPermissions