import {
    GET_CLIENT,
    POST_CLIENT,
    PUT_CLIENT,
    DELETE_CLIENT,
    POST_AND_GET_CLIENT,
    PUT_AND_GET_CLIENT,
    DELETE_AND_GET_CLIENT,
    UPDATE_CLIENT_STORAGE,
} from "./actionTypes"

export const getClient = data => ({
    type: GET_CLIENT,
    ...data
})

export const postClient = data => ({
    type: POST_CLIENT,
    ...data
})

export const putClient = data => ({
    type: PUT_CLIENT,
    ...data
})

export const deleteClient = data => ({
    type: DELETE_CLIENT,
    ...data
})

export const postAndGetClient = data => ({
    type: POST_AND_GET_CLIENT,
    ...data
})

export const putAndGetClient = data => ({
    type: PUT_AND_GET_CLIENT,
    ...data
})

export const deleteAndGetClient = data => ({
    type: DELETE_AND_GET_CLIENT,
    ...data
})

export const updateClientStorage = data => ({
    type: UPDATE_CLIENT_STORAGE,
    ...data
})