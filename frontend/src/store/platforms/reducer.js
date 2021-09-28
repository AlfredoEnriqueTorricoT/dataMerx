import { GET_PLATFORMS_SUCCESS, GET_PLATFORMS_FAIL } from "./actionTypes"

const INIT_STATE = {
  data: [],
  error: null,
}

const platforms = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PLATFORMS_SUCCESS:
      return {
        data: action.payload.data,
        error: null,
      }

    case GET_PLATFORMS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default platforms
