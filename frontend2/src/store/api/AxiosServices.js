import axios from "axios";

const URL = process.env.REACT_APP_DATABASEURL;
//const URL = "http://localhost:8000/api/";
// const config = {
//   headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
// };

class AxiosServices {
  async GET(data) {
    let response = axios
      .get(URL + data, {
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

    return response;
  }

  async POST(data) {
    let response = axios
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

    return response;
  }

  async PUT(data) {
    let response = axios
      .put(URL + data.url, data.payload, {
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

    return response;
  }

  async DELETE(data) {
    let response = axios
      .delete(URL + data.url, {
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

    return response;
  }

  async fetchPOST(data) {
    let response = await fetch(URL + data.url, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data.payload),
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(resp => {
        return resp;
      })
      .catch(error => {
        return error;
      });

    return response;
  }

  async axLogin(data) {
    let response = await axios
      .post(URL + "login", data)
      .then(resp => {
        return resp;
      })
      .catch(error => {
        return error;
      });

    return response;
  }

  async axLogout() {
    let response = await axios
      .post(
        URL + "logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then(resp => {
        return resp;
      })
      .catch(error => {
        return error;
      });

    console.log(response);

    return response;
  }
}

export default new AxiosServices();