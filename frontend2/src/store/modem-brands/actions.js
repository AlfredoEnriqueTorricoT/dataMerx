import {
    GET_M_BRAND,
    POST_M_BRAND,
    PUT_M_BRAND,
    DELETE_M_BRAND,
    POST_AND_GET_M_BRAND,
    PUT_AND_GET_M_BRAND,
    DELETE_AND_GET_M_BRAND,
    UPDATE_STORAGE,
} from "./actionTypes"

export const getMBrand = data => ({
    type: GET_M_BRAND,
    ...data
})

export const postMBrand = data => ({
    type: POST_M_BRAND,
    ...data
})

export const putMBrand = data => ({
    type: PUT_M_BRAND,
    ...data
})

export const deleteMBrand = data => ({
    type: DELETE_M_BRAND,
    ...data
})

export const postAndGetMBrand = data => ({
    type: POST_AND_GET_M_BRAND,
    ...data
})

export const putAndGetMBrand = data => ({
    type: PUT_AND_GET_M_BRAND,
    ...data
})

export const deleteAndGetMBrand = data => ({
    type: DELETE_AND_GET_M_BRAND,
    ...data
})

export const updateStorage = data => ({
    type: UPDATE_STORAGE,
    ...data
})