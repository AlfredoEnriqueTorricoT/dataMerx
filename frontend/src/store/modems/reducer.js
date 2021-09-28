import { GET_MODEMS_SUCCESS, GET_MODEMS_FAIL } from "./actionTypes"

const INIT_STATE = {
  data: [],
  error: null,
}

const modems = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MODEMS_SUCCESS:
      return {
        data: action.payload.data,
        error: null,
      }

    case GET_MODEMS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default modems
