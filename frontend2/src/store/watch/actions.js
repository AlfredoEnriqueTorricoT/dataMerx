import {
    GET_WATCH,
    POST_WATCH,
    PUT_WATCH,
    DELETE_WATCH,
    POST_AND_GET_WATCH,
    PUT_AND_GET_WATCH,
    DELETE_AND_GET_WATCH,
    UPDATE_WATCH_STORAGE,
} from "./actionTypes"

export const getWatch = data => ({
    type: GET_WATCH,
    ...data
})

export const postWatch = data => ({
    type: POST_WATCH,
    ...data
})

export const putWatch = data => ({
    type: PUT_WATCH,
    ...data
})

export const deleteWatch = data => ({
    type: DELETE_WATCH,
    ...data
})

export const postAndGetWatch = data => ({
    type: POST_AND_GET_WATCH,
    ...data
})

export const putAndGetWatch = data => ({
    type: PUT_AND_GET_WATCH,
    ...data
})

export const deleteAndGetWatch = data => ({
    type: DELETE_AND_GET_WATCH,
    ...data
})

export const updateWatchStorage = data => ({
    type: UPDATE_WATCH_STORAGE,
    ...data
})