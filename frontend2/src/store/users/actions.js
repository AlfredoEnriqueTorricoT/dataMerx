import {
    GET_USER,
    POST_USER,
    PUT_USER,
    DELETE_USER,
    POST_AND_GET_USER,
    PUT_AND_GET_USER,
    DELETE_AND_GET_USER,
    UPDATE_USER_STORAGE,
} from "./actionTypes"

export const getUser = data => ({
    type: GET_USER,
    ...data
})

export const postUser = data => ({
    type: POST_USER,
    ...data
})

export const putUser = data => ({
    type: PUT_USER,
    ...data
})

export const deleteUser = data => ({
    type: DELETE_USER,
    ...data
})

export const postAndGetUser = data => ({
    type: POST_AND_GET_USER,
    ...data
})

export const putAndGetUser = data => ({
    type: PUT_AND_GET_USER,
    ...data
})

export const deleteAndGetUser = data => ({
    type: DELETE_AND_GET_USER,
    ...data
})

export const updateUserStorage = data => ({
    type: UPDATE_USER_STORAGE,
    ...data
})