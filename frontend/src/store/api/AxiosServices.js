//import axios from "axios";
import { Axios } from "./services"

class AxiosServices {
  async POST(payload) {
    return Axios("", payload).then(resp => {
      return resp
    })
  }
}

export default new AxiosServices()
