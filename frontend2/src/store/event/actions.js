import {
    GET_EVENT,
    POST_EVENT,
    PUT_EVENT,
    DELETE_EVENT,
    POST_AND_GET_EVENT,
    PUT_AND_GET_EVENT,
    DELETE_AND_GET_EVENT,
    UPDATE_EVENT_STORAGE,
} from "./actionTypes"

export const getEvent = data => ({
    type: GET_EVENT,
    ...data
})

export const postEvent = data => ({
    type: POST_EVENT,
    ...data
})

export const putEvent = data => ({
    type: PUT_EVENT,
    ...data
})

export const deleteEvent = data => ({
    type: DELETE_EVENT,
    ...data
})

export const postAndGetEvent = data => ({
    type: POST_AND_GET_EVENT,
    ...data
})

export const putAndGetEvent = data => ({
    type: PUT_AND_GET_EVENT,
    ...data
})

export const deleteAndGetEvent = data => ({
    type: DELETE_AND_GET_EVENT,
    ...data
})

export const updateEventStorage = data => ({
    type: UPDATE_EVENT_STORAGE,
    ...data
})