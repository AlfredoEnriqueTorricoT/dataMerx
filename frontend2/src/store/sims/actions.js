import {
    GET_SIM,
    POST_SIM,
    PUT_SIM,
    DELETE_SIM,
    POST_AND_GET_SIM,
    PUT_AND_GET_SIM,
    DELETE_AND_GET_SIM,
    UPDATE_SIM_STORAGE,
} from "./actionTypes"

export const getSim = data => ({
    type: GET_SIM,
    ...data
})

export const postSim = data => ({
    type: POST_SIM,
    ...data
})

export const putSim = data => ({
    type: PUT_SIM,
    ...data
})

export const deleteSim = data => ({
    type: DELETE_SIM,
    ...data
})

export const postAndGetSim = data => ({
    type: POST_AND_GET_SIM,
    ...data
})

export const putAndGetSim = data => ({
    type: PUT_AND_GET_SIM,
    ...data
})

export const deleteAndGetSim = data => ({
    type: DELETE_AND_GET_SIM,
    ...data
})

export const updateSimStorage = data => ({
    type: UPDATE_SIM_STORAGE,
    ...data
})