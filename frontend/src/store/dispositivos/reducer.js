import {
  GET_DISPOSITIVOS_SUCCESS,
  GET_DISPOSITIVOS_FAIL,
  WAIT_DISPOSITIVOS,
} from "./actionTypes"

const INIT_STATE = {
  data: [],
  error: null,
  waitingResponse: true,
}

const dispositivos = (state = INIT_STATE, action) => {
  switch (action.type) {
    case WAIT_DISPOSITIVOS:
      return {
        ...state,
        waitingResponse: true,
      }

    case GET_DISPOSITIVOS_SUCCESS:
      return {
        data: action.payload.data,
        error: null,
        waitingResponse: false,
      }

    case GET_DISPOSITIVOS_FAIL:
      return {
        ...state,
        error: action.payload,
        waitingResponse: false,
      }

    default:
      return state
  }
}

export default dispositivos
