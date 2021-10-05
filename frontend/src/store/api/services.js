import axios from "axios"
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
