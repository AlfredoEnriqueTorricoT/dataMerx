import { GET_SIMS_SUCCESS, GET_SIMS_FAIL, WAIT_SIMS } from "./actionTypes"

const INIT_STATE = {
  data: [],
  error: null,
  waitingResponse: true,
}

const sims = (state = INIT_STATE, action) => {
  switch (action.type) {
    case WAIT_SIMS:
      return {
        ...state,
        waitingResponse: true,
      }

    case GET_SIMS_SUCCESS:
      return {
        data: action.payload.data,
        error: null,
        waitingResponse: false,
      }

    case GET_SIMS_FAIL:
      return {
        ...state,
        error: action.payload,
        waitingResponse: false,
      }

    default:
      return state
  }
}

export default sims
