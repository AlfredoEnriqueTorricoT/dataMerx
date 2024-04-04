import {
    GET_TAG,
    POST_TAG,
    PUT_TAG,
    DELETE_TAG,
    POST_AND_GET_TAG,
    PUT_AND_GET_TAG,
    DELETE_AND_GET_TAG,
    UPDATE_TAG_STORAGE,
} from "./actionTypes"

export const getTag = data => ({
    type: GET_TAG,
    ...data
})

export const postTag = data => ({
    type: POST_TAG,
    ...data
})

export const putTag = data => ({
    type: PUT_TAG,
    ...data
})

export const deleteTag = data => ({
    type: DELETE_TAG,
    ...data
})

export const postAndGetTag = data => ({
    type: POST_AND_GET_TAG,
    ...data
})

export const putAndGetTag = data => ({
    type: PUT_AND_GET_TAG,
    ...data
})

export const deleteAndGetTag = data => ({
    type: DELETE_AND_GET_TAG,
    ...data
})

export const updateTagStorage = data => ({
    type: UPDATE_TAG_STORAGE,
    ...data
})