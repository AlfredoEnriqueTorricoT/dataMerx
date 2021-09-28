import {
  GET_PLATFORMS,
  GET_PLATFORMS_FAIL,
  GET_PLATFORMS_SUCCESS,
} from "./actionTypes"

export const getPlatforms = () => ({
  type: GET_PLATFORMS,
  payload: {
    controller: "platform",
    operacion: "selectAll",
  },
})

export const getPlatformsSuccess = platform => ({
  type: GET_PLATFORMS_SUCCESS,
  payload: platform,
})

export const getPlatformsFail = error => ({
  type: GET_PLATFORMS_FAIL,
  payload: error,
})
