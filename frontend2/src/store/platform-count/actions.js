import {
    GET_PLATFORM_COUNT,
    POST_PLATFORM_COUNT,
    PUT_PLATFORM_COUNT,
    DELETE_PLATFORM_COUNT,
    POST_AND_GET_PLATFORM_COUNT,
    PUT_AND_GET_PLATFORM_COUNT,
    DELETE_AND_GET_PLATFORM_COUNT,
    UPDATE_PLATFORM_COUNT_STORAGE,
} from "./actionTypes"

export const getPlatformCount = data => ({
    type: GET_PLATFORM_COUNT,
    ...data
})

export const postPlatformCount = data => ({
    type: POST_PLATFORM_COUNT,
    ...data
})

export const putPlatformCount = data => ({
    type: PUT_PLATFORM_COUNT,
    ...data
})

export const deletePlatformCount = data => ({
    type: DELETE_PLATFORM_COUNT,
    ...data
})

export const postAndGetPlatformCount = data => ({
    type: POST_AND_GET_PLATFORM_COUNT,
    ...data
})

export const putAndGetPlatformCount = data => ({
    type: PUT_AND_GET_PLATFORM_COUNT,
    ...data
})

export const deleteAndGetPlatformCount = data => ({
    type: DELETE_AND_GET_PLATFORM_COUNT,
    ...data
})

export const updatePlatformCountStorage = data => ({
    type: UPDATE_PLATFORM_COUNT_STORAGE,
    ...data
})