import {
    GET_MODEM,
    POST_MODEM,
    PUT_MODEM,
    DELETE_MODEM,
    POST_AND_UPDATE_PENDING_MODEM,
    UPDATE_PENDING_MODEM,
    POST_AND_GET_MODEM,
    PUT_AND_GET_MODEM,
    DELETE_AND_GET_MODEM,
    UPDATE_MODEM_STORAGE,
} from "./actionTypes"

export const getModem = data => ({
    type: GET_MODEM,
    ...data
})

export const postModem = data => ({
    type: POST_MODEM,
    ...data
})

export const putModem = data => ({
    type: PUT_MODEM,
    ...data
})

export const deleteModem = data => ({
    type: DELETE_MODEM,
    ...data
})

export const postAndUpdatePendingModem = data => ({
    type: POST_AND_UPDATE_PENDING_MODEM,
    ...data
})
export const updatePendingModem = data => ({
    type: UPDATE_PENDING_MODEM,
    ...data
})

export const postAndGetModem = data => ({
    type: POST_AND_GET_MODEM,
    ...data
})

export const putAndGetModem = data => ({
    type: PUT_AND_GET_MODEM,
    ...data
})

export const deleteAndGetModem = data => ({
    type: DELETE_AND_GET_MODEM,
    ...data
})

export const updateModemStorage = data => ({
    type: UPDATE_MODEM_STORAGE,
    ...data
})