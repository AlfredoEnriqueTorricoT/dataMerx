import {
  GET_CLIENTES_SUCCESS,
  GET_CLIENTES_FAIL,
  WAIT_CLIENTES,
} from "./actionTypes"

const INIT_STATE = {
  data: [],
  error: null,
  waitingResponse: true,
}

const clientes = (state = INIT_STATE, action) => {
  switch (action.type) {
    case WAIT_CLIENTES:
      return {
        ...state,
        waitingResponse: true,
      }

    case GET_CLIENTES_SUCCESS:
      return {
        data: action.payload.data,
        error: null,
        waitingResponse: false,
      }

    case GET_CLIENTES_FAIL:
      return {
        ...state,
        error: action.payload,
        waitingResponse: false,
      }

    default:
      return state
  }
}

export default clientes
