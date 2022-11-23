import {
    GET_PLATFORM,
    POST_PLATFORM,
    PUT_PLATFORM,
    DELETE_PLATFORM,
    POST_AND_GET_PLATFORM,
    PUT_AND_GET_PLATFORM,
    DELETE_AND_GET_PLATFORM,
    UPDATE_PLATFORM_STORAGE,
} from "./actionTypes"

export const getPlatform = data => ({
    type: GET_PLATFORM,
    ...data
})

export const postPlatform = data => ({
    type: POST_PLATFORM,
    ...data
})

export const putPlatform = data => ({
    type: PUT_PLATFORM,
    ...data
})

export const deletePlatform = data => ({
    type: DELETE_PLATFORM,
    ...data
})

export const postAndGetPlatform = data => ({
    type: POST_AND_GET_PLATFORM,
    ...data
})

export const putAndGetPlatform = data => ({
    type: PUT_AND_GET_PLATFORM,
    ...data
})

export const deleteAndGetPlatform = data => ({
    type: DELETE_AND_GET_PLATFORM,
    ...data
})

export const updatePlatformStorage = data => ({
    type: UPDATE_PLATFORM_STORAGE,
    ...data
})