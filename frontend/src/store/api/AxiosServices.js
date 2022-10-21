//import axios from "axios";
import axios from "axios";
const DEFAULT_URL = "http://localhost:8000/api/"

class AxiosServices {
  
  
  async POST(data) {
    return axios
      .post(URL + data.url, data.payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then(resp => {
        return resp;
      })
      .catch(error => {
        return error;
      });

    
  }

  async axLogin(data) {
    return await axios
      .post(DEFAULT_URL + "login", data)
      .then(resp => {
        
        return resp.data;
      })
      .catch(error => {
        console.error(error);
        return error;
      });
  }
  
}

export default new AxiosServices()
