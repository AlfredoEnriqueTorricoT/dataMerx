import {
  GET_USUARIOS_SUCCESS,
  GET_USUARIOS_FAIL,
  WAIT_USUARIOS,
} from "./actionTypes"

const INIT_STATE = {
  data: [],
  error: null,
  waitingResponse: true,
}

const usuarios = (state = INIT_STATE, action) => {
  switch (action.type) {
    case WAIT_USUARIOS:
      return {
        ...state,
        waitingResponse: true,
      }

    case GET_USUARIOS_SUCCESS:
      return {
        data: action.payload.data,
        error: null,
        waitingResponse: false,
      }

    case GET_USUARIOS_FAIL:
      return {
        ...state,
        error: action.payload,
        waitingResponse: false,
      }

    default:
      return state
  }
}

export default usuarios
