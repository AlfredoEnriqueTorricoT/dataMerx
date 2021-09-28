import axios from "axios"
//http://localhost:8080/dataMerx/?controller=user&operacion=selectAll
const DEFAULT_URL = "http://localhost:80/dataMerx/backend/"

const defaultHeaders = new Headers()

export const Axios = async (URL, data) => {
  const requestInit = {}
  if (data) {
    requestInit.body = JSON.stringify(data)
  }
  return await axios.post(DEFAULT_URL, data).then(res => {
    return res ? res.data : {}
  })
}
