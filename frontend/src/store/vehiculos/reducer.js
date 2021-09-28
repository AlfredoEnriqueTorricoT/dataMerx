import {
  GET_VEHICULOS_SUCCESS,
  GET_VEHICULOS_FAIL,
  WAIT_VEHICULOS,
} from "./actionTypes"

const INIT_STATE = {
  data: [],
  error: null,
  waitingResponse: true,
}

const vehiculos = (state = INIT_STATE, action) => {
  switch (action.type) {
    case WAIT_VEHICULOS:
      return {
        ...state,
        waitingResponse: true,
      }

    case GET_VEHICULOS_SUCCESS:
      return {
        data: action.payload.data,
        error: null,
        waitingResponse: false,
      }

    case GET_VEHICULOS_FAIL:
      return {
        ...state,
        error: action.payload,
        waitingResponse: false,
      }

    default:
      return state
  }
}

export default vehiculos
