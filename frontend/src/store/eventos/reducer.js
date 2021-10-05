import {
  GET_EVENTOS_SUCCESS,
  GET_EVENTOS_FAIL,
  WAIT_EVENTOS,
} from "./actionTypes"

const INIT_STATE = {
  data: [],
  error: null,
  waitingResponse: true,
}

const eventos = (state = INIT_STATE, action) => {
  switch (action.type) {
    case WAIT_EVENTOS:
      return {
        ...state,
        waitingResponse: true,
      }

    case GET_EVENTOS_SUCCESS:
      return {
        data: action.payload.data,
        error: null,
        waitingResponse: false,
      }

    case GET_EVENTOS_FAIL:
      return {
        ...state,
        error: action.payload,
        waitingResponse: false,
      }

    default:
      return state
  }
}

export default eventos
